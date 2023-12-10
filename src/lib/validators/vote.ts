import { z } from 'zod';

export const VoteValidator = z.object({
  ballots: z.array(
    z.object({
      positionId: z.string(),
      candidateId: z.string().optional(),
      isNull: z.boolean().optional(),
    }),
  ),
});

export type VoteRequest = z.infer<typeof VoteValidator>;
