import { z } from 'zod';

export const VoteValidator = z.object({
  votes: z.array(
    z.object({
      positionId: z.string(),
      partyId: z.array(z.string().optional()).optional(),
      isNull: z.boolean().optional(),
    }),
  ),
});

export type VoteRequest = z.infer<typeof VoteValidator>;
