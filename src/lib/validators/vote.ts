import { z } from 'zod';

export const VoteValidator = z.object({
  ballot: z.object({
    partyId: z.string().optional(),
    isNull: z.boolean().optional(),
  }),
});

export type VoteRequest = z.infer<typeof VoteValidator>;
