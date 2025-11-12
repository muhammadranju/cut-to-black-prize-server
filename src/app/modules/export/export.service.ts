/* eslint-disable @typescript-eslint/no-explicit-any */
import { Parser } from 'json2csv';
import XLSX from 'xlsx';
import Submission from '../submissions/submissions.model';
const exportCSVServiceDB = async (
  status?: 'Received' | 'In Review' | 'Judged'
) => {
  const query: any = {};
  if (status) query.status = status;

  const submissions = await Submission.find(query).lean();

  const fields = [
    'entryId',
    'scriptTitle',
    'genre',
    'lengthCategory',
    'day',
    'status',
    'email',
  ];
  const csv = new Parser({ fields }).parse(submissions);

  return csv;
};

const exportExcelServiceDB = async (
  status?: 'Received' | 'In Review' | 'Judged'
) => {
  const query: any = {};
  if (status) query.status = status;

  // Select only required fields
  const submissions = await Submission.find(query)
    .select(
      'entryId fullName email scriptTitle logline genre lengthCategory inviteCode pdfPath status timestamp createdAt updatedAt'
    )
    .lean();

  // Transform data: Format dates to readable string (e.g., 'YYYY-MM-DD HH:mm:ss')
  const formattedSubmissions = submissions.map((sub: any) => ({
    'Full Name': sub.fullName,
    Email: sub.email,
    'Script Title': sub.scriptTitle,
    Logline: sub.logline,
    Genre: sub.genre,
    Day: sub.day,
    'Length Category': sub.lengthCategory,
    'Invite Code': sub.inviteCode,
    'PDF Path': sub.pdfPath,
    Status: sub.status,
    Timestamp: sub.timestamp
      ? new Date(sub.timestamp).toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      : '',
    'Created At': sub.createdAt
      ? new Date(sub.createdAt).toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      : '',
    'Updated At': sub.updatedAt
      ? new Date(sub.updatedAt).toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      : '',
  }));

  // Create worksheet from formatted data
  const ws = XLSX.utils.json_to_sheet(formattedSubmissions);

  // Optional: Auto-fit columns (basic implementation)
  const colWidths = [
    { wch: 10 }, // _id
    { wch: 15 }, // entryId
    { wch: 20 }, // fullName
    { wch: 25 }, // email
    { wch: 20 }, // scriptTitle
    { wch: 50 }, // logline
    { wch: 12 }, // genre
    { wch: 12 }, // lengthCategory
    { wch: 15 }, // inviteCode
    { wch: 30 }, // pdfPath
    { wch: 12 }, // status
    { wch: 20 }, // timestamp
    { wch: 20 }, // createdAt
    { wch: 20 }, // updatedAt
    { wch: 5 }, // __v
  ];
  ws['!cols'] = colWidths;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Submissions');

  const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

  return buffer;
};

export const exportService = {
  exportCSVServiceDB,
  exportExcelServiceDB,
};
