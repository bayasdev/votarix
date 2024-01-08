import { z } from 'zod';

export const VoteValidator = z.object({
  votes: z.array(
    z.object({
      positionId: z.string(),
      selection: z.array(
        z.object({
          partyId: z.string(),
          isChecked: z.boolean(),
        }),
      ),
    }),
  ),
});

export type VoteRequest = z.infer<typeof VoteValidator>;
