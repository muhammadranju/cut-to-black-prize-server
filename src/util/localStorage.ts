/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const UPLOAD_DIR = path.join(__dirname, '../../uploads/submissions');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

type FileResult = {
  url: string;
  key: string;
};

export const uploadToLocal = async (
  fileBuffer: Buffer,
  originalName: string,
  type: 'pdf' | 'doc'
): Promise<FileResult> => {
  // Use Node's built-in randomUUID to avoid importing the ESM-only `uuid` package
  const anonymizedName = `CTB25_${randomUUID().slice(0, 8)}.${
    type === 'pdf' ? 'pdf' : 'doc'
  }`;
  const filePath = path.join(UPLOAD_DIR, anonymizedName);

  fs.writeFileSync(filePath, fileBuffer);

  return { url: `/api/files/${anonymizedName}`, key: anonymizedName };
};

export const deleteFromLocal = (key: string): void => {
  const filePath = path.join(UPLOAD_DIR, key);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

export const getFileStream = (key: string): fs.ReadStream | null => {
  const filePath = path.join(UPLOAD_DIR, key);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return fs.createReadStream(filePath);
};
