import { z } from 'zod';

export const PartyValidator = z.object({
  name: z.string().min(1, 'El campo es requerido'),
  image: z.object({
    key: z.string().optional(),
    url: z.string().optional(),
  }),
});

export type PartyRequest = z.infer<typeof PartyValidator>;
