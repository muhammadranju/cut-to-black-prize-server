import { z } from 'zod';

export const createInviteZodSchema = z.object({
  body: z.object({
    fullName: z.string(),
    email: z.string(),
    brief: z.string(),
    interested: z.string(),
  }),
});

const InviteValidation = {
  createInviteZodSchema,
};

export default InviteValidation;
