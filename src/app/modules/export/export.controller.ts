/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { exportService } from './export.service';
import Submission from '../submissions/submissions.model';
import InviteCode from '../invite-code/invite-code.model';
import sendResponse from '../../../shared/sendResponse';

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

// export const exportRecentSubmissions: RequestHandler = catchAsync(
//   async (req, res) => {
//     const totalSubmissions = await Submission.find().sort({ createdAt: -1 });

//     const totalRequests = await InviteCode.find().sort({ createdAt: -1 });

//     const totalPayments = await InviteCode.find({
//       paymentVerified: true,
//     }).sort({ createdAt: -1 });

//     sendResponse(res, {
//       success: true,
//       message: 'Recent submissions exported successfully',
//       data: {
//         totalSubmissions: totalSubmissions.length,
//         totalRequests: totalRequests.length,
//         totalPayments: totalPayments.length,
//         submissions: totalSubmissions,
//       },
//       statusCode: 200,
//     });
//   }
// );

export const exportRecentSubmissions: RequestHandler = catchAsync(
  async (req, res) => {
    const submissionsPipeline = [{ $sort: { createdAt: -1 } }];
    const totalSubmissionsDocs = await Submission.aggregate(
      submissionsPipeline as any
    );
    const totalSubmissionsCount = totalSubmissionsDocs.length;

    // Aggregation pipeline for recent requests (count only, using $count after sort/limit)
    const requestsPipeline = [
      { $sort: { createdAt: -1 } },

      { $count: 'totalRequests' },
    ];
    const requestsResult = await InviteCode.aggregate(requestsPipeline as any);
    const totalRequestsCount = requestsResult[0]?.totalRequests || 0;

    // Aggregation pipeline for total verified payments (match + count)
    const paymentsPipeline = [
      { $match: { paymentVerified: true } },
      { $count: 'totalPayments' },
    ];
    const paymentsResult = await InviteCode.aggregate(paymentsPipeline);
    const totalPaymentsCount = paymentsResult[0]?.totalPayments || 0;

    sendResponse(res, {
      success: true,
      message: 'Recent submissions exported successfully',
      data: {
        totalSubmissions: totalSubmissionsCount,
        totalRequests: totalRequestsCount,
        totalPayments: totalPaymentsCount,
        submissions: totalSubmissionsDocs,
      },
      statusCode: 200,
    });
  }
);
