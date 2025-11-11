/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import random from 'randomstring';
import ApiError from '../../../errors/ApiError';
import { emailHelper } from '../../../helpers/emailHelper';
import { emailTemplate } from '../../../shared/emailTemplate';
import InviteCode from './invite-code.model';

const getInviteCodeDB = async (code: string) => {
  const inviteCode = await InviteCode.findOne({ code });
  if (!inviteCode) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Code not found');
  }
  return inviteCode;
};

const getInviteCodesDB = async (email?: string, code?: string) => {
  // Force string conversion (to prevent $regex error)
  email = typeof email === 'string' ? email : '';
  code = typeof code === 'string' ? code : '';

  const filter: any = {};

  if (email || code) {
    filter.$or = [];
    if (code) filter.$or.push({ code: { $regex: code, $options: 'i' } });
    if (email) filter.$or.push({ email: { $regex: email, $options: 'i' } });
  }

  const inviteCodes = await InviteCode.find(filter).sort({ createdAt: -1 });
  return inviteCodes;
};

const createInviteCodeDB = async (
  fullName: string,
  email: string,
  brief: string,
  interested: string
) => {
  const code = `CTB${random.generate({
    charset: ['numeric'],
    length: 4,
  })}`;

  const emailAlreadyExists = await InviteCode.exists({ email });
  if (emailAlreadyExists) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'You have already requested an invitation code using this email'
    );
  }

  if (!fullName || !email || !brief || !interested) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'All fields are required');
  }

  const newInviteCode = await InviteCode.create({
    code,
    fullName,
    email,
    brief,
    interested,
  });

  const value = {
    email: newInviteCode.email,
    code: newInviteCode.code,
    subject: 'Cut to Black Prize: Invitation Code',
    fullName: newInviteCode.fullName,
  };

  const sendInviteCodeEmail = emailTemplate.sendInvitationCode(value);
  emailHelper.sendEmail(sendInviteCodeEmail);

  return newInviteCode;
};

const verifyInviteCodeDB = async (code: string) => {
  if (!code) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Code not provided');
  }

  const inviteCode = await InviteCode.findOne({ code });
  if (!inviteCode) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Code not found');
  }

  if (inviteCode.paymentVerified) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Payment has already been verified'
    );
  }

  const value = {
    email: inviteCode.email,
    entryId: inviteCode.code,
    subject: 'Cut to Black Prize: Payment Verified',
    fullName: inviteCode.fullName,
  };

  const paymentVerifiedConfirm =
    emailTemplate.sendPaymentVerifiedConfirm(value);
  emailHelper.sendEmail(paymentVerifiedConfirm);

  inviteCode.paymentVerified = true;
  await inviteCode.save();
  return inviteCode;
};

const forgetInviteCodeDB = async (email: string) => {
  const findEmail = await InviteCode.findOne({ email });

  if (!findEmail) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Email not found');
  }

  const value = {
    email: findEmail.email,
    subject: 'Cut to Black Prize: Invitation Code',
    fullName: findEmail.fullName,
    code: findEmail.code,
  };

  const sendForgetInviteCodeEmail =
    emailTemplate.sendForgetInviteCodeEmail(value);
  emailHelper.sendEmail(sendForgetInviteCodeEmail);

  return findEmail;
};

export const InviteCodeService = {
  getInviteCodeDB,
  getInviteCodesDB,
  createInviteCodeDB,
  verifyInviteCodeDB,
  forgetInviteCodeDB,
};
