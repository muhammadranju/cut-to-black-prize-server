import { z } from 'zod';

export const createSubmissionZodSchema = z.object({
  body: z.object({
    inviteCode: z.string(),
    scriptTitle: z.string(),
    logline: z.string(),
    genre: z.enum([
      'Drama',
      'Comedy',
      'Thriller',
      'Horror',
      'Sci-Fi',
      'Fantasy',
      'Other',
    ]),
    lengthCategory: z.enum(['Short', 'Pilot', 'Feature']),
    confirmation: z.boolean(),
    pdf: z.string(),
  }),
});

const SubmissionValidation = {
  createSubmissionZodSchema,
};

export default SubmissionValidation;
