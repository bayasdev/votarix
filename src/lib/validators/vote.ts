import { z } from 'zod';

export const VoteValidator = z.object({
  ballots: z.array(
    z.object({
      positionId: z.string(),
      candidateId: z.string({
        required_error: 'Debe seleccionar un candidato',
      }),
    }),
  ),
});

export type VoteRequest = z.infer<typeof VoteValidator>;
