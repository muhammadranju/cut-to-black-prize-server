/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PaginatedQuery } from '../../../types';
import { SubmissionRequest } from './submissions.interface';
import submissionsService from './submissions.service';

export const submit: RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const submissionReq = req as unknown as SubmissionRequest;
    const {
      scriptTitle,
      logline,
      genre,
      lengthCategory,
      confirmation,
      inviteCode,
    } = submissionReq.body;

    await submissionsService.createSubmissionDB(
      scriptTitle,
      logline,
      genre,
      lengthCategory,
      confirmation,
      inviteCode,
      submissionReq
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Submission created successfully',
      data: { entryId: inviteCode },
    });
  }
);

export const getAll: RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const {
      sort = 'timestamp',
      order = 'desc',
      page = '1',
      limit = '50',
      status,
    } = req.query as PaginatedQuery;

    const { submissions, meta } = await submissionsService.getAllSubmissionsDB(
      page,
      limit,
      sort,
      order,
      status as 'Received' | 'In Review' | 'Judged' | undefined
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: `${meta.total} submissions retrieved`,
      data: {
        submissions: submissions,
        meta: {
          page: parseInt(page, 10),
          limit: parseInt(limit, 10),
          total: meta.total,
          pages: Math.ceil(meta.total / parseInt(limit, 10)),
        },
      },
    });
  }
);

export const getOne: RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const submission = await submissionsService.getOneSubmissionDB(id);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Submission retrieved successfully',
      data: submission,
    });
  }
);

export const getDownload: RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { type } = req.query;

    const { readStream, isPdf, fileKey } =
      await submissionsService.getDownloadSubmissionDB(
        id,
        type as 'pdf' | 'synopsis'
      );

    res.setHeader(
      'Content-Type',
      isPdf ? 'application/pdf' : 'application/msword'
    );
    res.setHeader('Content-Disposition', `attachment; filename="${fileKey}"`);

    readStream.pipe(res);
  }
);

export const updateStatus: RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { status } = req.body;
    const submission = await submissionsService.updateStatusSubmissionDB(
      id,
      status
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Submission status updated successfully',
      data: submission,
    });
  }
);

export const deleteOne: RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const submission = await submissionsService.deleteOneSubmissionDB(id);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Submission deleted successfully',
      data: { entryId: submission?.entryId },
    });
  }
);

export const analyticsData = catchAsync(async (req: Request, res: Response) => {
  const submission = await submissionsService.getAnalyticsDataSubmissionDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Submission retrieved successfully',
    data: submission,
  });
});
