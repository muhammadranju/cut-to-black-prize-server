/* eslint-disable @typescript-eslint/consistent-type-definitions */
import mongoose, { Model, Schema } from 'mongoose';
import { SubmissionDoc } from '../../../types';

interface ExtendedSubmissionDoc extends SubmissionDoc {
  inviteCode: string;
  codeUsed: boolean;
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
        'Drama',
        'Comedy',
        'Thriller',
        'Horror',
        'Sci-Fi',
        'Fantasy',
        'Other',
      ],
      required: true,
    },
    lengthCategory: {
      type: String,
      enum: ['Short', 'Pilot', 'Feature'],
      required: true,
    },
    // confirmation: { type: Boolean, required: true, default: false },
    inviteCode: { type: String, required: true }, // New: Store the code used
    // codeUsed: { type: Boolean, default: true }, // Mark as consumed
    pdfPath: { type: String, required: true },

    timestamp: { type: Date, default: Date.now },
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
