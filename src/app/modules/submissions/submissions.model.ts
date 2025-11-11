/* eslint-disable @typescript-eslint/consistent-type-definitions */
import mongoose, { Model, Schema } from 'mongoose';
import { SubmissionDoc } from '../../../types';

interface ExtendedSubmissionDoc extends SubmissionDoc {
  inviteCode: string;
  codeUsed: boolean;
  day: string;
}

const submissionSchema: Schema<ExtendedSubmissionDoc> = new Schema(
  {
    entryId: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    scriptTitle: { type: String, required: true },
    logline: { type: String, required: true },
    genre: {
      type: String,
      enum: [
        'drama',
        'comedy',
        'thriller',
        'horror',
        'sci-fi',
        'fantasy',
        'other',
      ],
      required: true,
    },
    lengthCategory: {
      type: String,
      enum: ['short', 'medium', 'feature', 'long'],
      required: true,
    },

    inviteCode: { type: String, required: true }, // New: Store the code used
    pdfPath: { type: String, required: true },

    day: {
      type: String,
    },

    status: {
      type: String,
      enum: ['Received', 'In Review', 'Judged'],
      default: 'Received',
    },
  },
  { timestamps: true }
);

const Submission: Model<ExtendedSubmissionDoc> =
  mongoose.model<ExtendedSubmissionDoc>('Submission', submissionSchema);
export default Submission;
