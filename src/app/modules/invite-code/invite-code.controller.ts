/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { InviteCodeService } from './invite-code.service';

const getInviteCode: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { code } = req.params;
    const inviteCode = await InviteCodeService.getInviteCodeDB(code);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Invite code found',
      data: inviteCode,
    });
  }
);

const getInviteCodes: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { email, code } = req.query;

    const inviteCodes = await InviteCodeService.getInviteCodesDB(
      email as string,
      code as string
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Invite codes found',
      data: inviteCodes,
    });
  }
);

const createInviteCode: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { fullName, email, brief, interested } = req.body;

    const newInviteCode = await InviteCodeService.createInviteCodeDB(
      fullName,
      email,
      brief,
      interested
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Invite code created',
      data: newInviteCode,
    });
  }
);

const verifyInviteCode: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { code } = req.body;

    const inviteCode = await InviteCodeService.verifyInviteCodeDB(code);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Invite code verified',
      data: inviteCode,
    });
  }
);

const forgetInviteCode = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  const inviteCode = await InviteCodeService.forgetInviteCodeDB(email);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Invite code forgotten',
    data: inviteCode,
  });
});

export const InviteCodeController = {
  getInviteCode,
  getInviteCodes,
  createInviteCode,
  verifyInviteCode,
  forgetInviteCode,
};
