/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { exportService } from './export.service';

export const exportCSV: RequestHandler = catchAsync(async (req, res) => {
  const { status } = req.query;

  const csv = await exportService.exportCSVServiceDB(
    status as 'Received' | 'In Review' | 'Judged'
  );

  res.header('Content-Type', 'text/csv');
  res.attachment('submissions.csv');
  res.send(csv);
});

export const exportExcel: RequestHandler = catchAsync(async (req, res) => {
  const { status } = req.query;
  const buffer = await exportService.exportExcelServiceDB(
    status as 'Received' | 'In Review' | 'Judged'
  );

  res.header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.attachment(`submissions-${new Date().toISOString().split('T')[0]}.xlsx`);
  res.send(buffer);
});
