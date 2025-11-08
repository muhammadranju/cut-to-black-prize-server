/* eslint-disable no-undef */
import { Request } from 'express';

/**
 * Interface for Multer file fields in submission requests
 */
export type SubmissionFiles = {
  pdf: Express.Multer.File[];
  synopsis?: Express.Multer.File[];
};

/**
 * Typed request for submission with files
 */
export type SubmissionRequest = Request & {
  files: SubmissionFiles;
};
