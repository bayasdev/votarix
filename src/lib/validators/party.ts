import { z } from 'zod';

export const PartyValidator = z.object({
  name: z.string().min(1, 'El campo es requerido'),
});

export type PartyRequest = z.infer<typeof PartyValidator>;
