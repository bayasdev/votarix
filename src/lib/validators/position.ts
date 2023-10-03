import { z } from 'zod';

export const PositionValidator = z.object({
  name: z.string().min(1, 'El campo es requerido'),
  electionId: z.string().min(1, 'El campo es requerido'),
});

export type PositionRequest = z.infer<typeof PositionValidator>;
