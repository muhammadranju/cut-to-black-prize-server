/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { emailHelper } from '../../../helpers/emailHelper';
import { emailTemplate } from '../../../shared/emailTemplate';
import { SubmissionDoc } from '../../../types';
import {
  deleteFromLocal,
  getFileStream,
  uploadToLocal,
} from '../../../util/localStorage';
import InviteCode from '../invite-code/invite-code.model';
import { SubmissionRequest } from './submissions.interface';
import Submission from './submissions.model';

const createSubmissionDB = async (
  scriptTitle: string,
  logline: string,
  genre: string,
  lengthCategory: string,
  confirmation: boolean,
  inviteCode: string,
  submissionReq: SubmissionRequest
) => {
  // Validate confirmation
  if (!confirmation) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Must confirm originality');
  }

  // Validate invite code existence and usage
  const invite = await InviteCode.findOne({ code: inviteCode });
  if (!invite) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid invite code');
  }

  if (!invite.paymentVerified) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Payment not verified yet');
  }

  if (invite.used) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Invite code can only be used once'
    );
  }

  // Extract files with type safety
  const pdfFile = submissionReq.files?.pdf?.[0];
  if (!pdfFile) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'PDF file is required');
  }

  // Check submission limit (scalable to 500)
  const submissionCount = await Submission.countDocuments();
  if (submissionCount >= 500) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Submission limit reached. Contact support.'
    );
  }

  // Upload PDF (mandatory)
  const pdfResult = await uploadToLocal(
    pdfFile.buffer,
    pdfFile.originalname,
    'pdf'
  );

  // Upload synopsis (optional)
  let synopsisPath: string | undefined;
  if (submissionReq.files?.synopsis?.[0]) {
    const synopsisFile = submissionReq.files.synopsis[0];
    const synopsisResult = await uploadToLocal(
      synopsisFile.buffer,
      synopsisFile.originalname,
      'doc' // Assuming DOC/DOCX; adjust if needed
    );
    synopsisPath = synopsisResult.key;
  }

  // Create and save submission
  const submission = new Submission({
    entryId: inviteCode, // Assuming inviteCode serves as unique entryId
    fullName: invite.fullName,
    email: invite.email,
    scriptTitle,
    logline,
    genre,
    lengthCategory,
    confirmation: true,
    inviteCode,
    pdfPath: pdfResult.key,
    synopsisPath,
  });
  await submission.save();
  invite.used = true;
  await invite.save();

  const value = {
    email: invite.email,
    code: inviteCode,
    subject: 'Cut to Black Prize: Submission Received',
    fullName: invite.fullName,
  };

  const sendConfirmationEmail = emailTemplate.sendConfirmationEmail(value);
  emailHelper.sendEmail(sendConfirmationEmail);
};

const getAllSubmissionsDB = async (
  page: string,
  limit: string,
  sort: string,
  order: string,
  status?: 'Received' | 'In Review' | 'Judged'
) => {
  const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
  const query: Partial<SubmissionDoc> = {};
  if (status) query.status = status as 'Received' | 'In Review' | 'Judged';

  const submissions = await Submission.find(query)
    .sort({ [sort]: order === 'asc' ? 1 : -1 } as any) // Type assertion for dynamic sort
    .skip(skip)
    .limit(parseInt(limit, 10));

  const total = await Submission.countDocuments(query);
  const baseUrl = process.env.URL || 'http://localhost:5000';

  const submissionsWithLinks = submissions.map(sub => {
    const subObj = sub.toObject() as SubmissionDoc;
    return {
      ...subObj,
      pdfDownload: `${baseUrl}/submission/${sub._id}/download?type=pdf`,
      synopsisDownload: subObj.synopsisPath
        ? `${baseUrl}/submission/${sub._id}/download?type=synopsis`
        : null,
    };
  });

  return {
    submissions: submissionsWithLinks,
    meta: {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      total,
      pages: Math.ceil(total / parseInt(limit, 10)),
    },
  };
};

const getOneSubmissionDB = async (id: string) => {
  const submission = await Submission.findById(id);

  if (!submission) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Submission not found');
  }

  return submission;
};

const getDownloadSubmissionDB = async (
  id: string,
  type: 'pdf' | 'synopsis'
) => {
  const submission = await Submission.findById(id);
  if (!submission) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Submission not found');
  }

  const fileKey =
    (type === 'synopsis' && submission.synopsisPath) || submission.pdfPath;

  const readStream = getFileStream(fileKey);
  if (!readStream) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'File not found');
  }

  const isPdf = fileKey.endsWith('.pdf');

  return {
    readStream,
    isPdf,
    fileKey,
  };
};

const updateStatusSubmissionDB = async (id: string, status: string) => {
  if (!['Received', 'In Review', 'Judged'].includes(status)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid status value');
  }

  const submission = await Submission.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );

  if (!submission) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Submission not found');
  }

  return submission;
};

const deleteOneSubmissionDB = async (id: string) => {
  const submission = await Submission.findById(id);
  if (!submission) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Submission not found');
  }
  const findInvite = await InviteCode.findOne({ code: submission.entryId });

  // Delete files
  deleteFromLocal(submission.pdfPath);
  if (submission.synopsisPath) {
    deleteFromLocal(submission.synopsisPath);
  }

  await Submission.findByIdAndDelete(id);
  await InviteCode.findByIdAndDelete(findInvite?._id);
  return submission;
};

const submissionsService = {
  createSubmissionDB,
  getAllSubmissionsDB,
  getOneSubmissionDB,
  getDownloadSubmissionDB,
  updateStatusSubmissionDB,
  deleteOneSubmissionDB,
};

export default submissionsService;
