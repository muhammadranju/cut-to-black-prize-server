/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface SubmissionData {
  fullName: string;
  email: string;
  scriptTitle: string;
  logline: string;
  genre: string;
  lengthCategory: string;
  confirmation: boolean;
  inviteCode: string; // New
}

export interface PaginatedQuery {
  sort?: string;
  order?: 'asc' | 'desc';
  page?: string;
  limit?: string;
  status?: string;
}

export interface TypedRequest<T = any> extends Request {
  body: T;
  files?: { [fieldname: string]: Express.Multer.File[] };
  user?: { id: string };
}

export interface SubmissionDoc extends SubmissionData {
  toObject(): unknown;
  _id: string;
  entryId: string;
  pdfPath: string;
  synopsisPath?: string;
  timestamp: Date;
  status: 'Received' | 'In Review' | 'Judged';
  createdAt: Date;
  updatedAt: Date;
  inviteCode: string; // New
  codeUsed: boolean;
}

export interface AdminDoc {
  _id: string;
  email: string;
  password: string;
}

// Global type declaration for Express Request
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
