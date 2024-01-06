import { z } from 'zod';

export const PartyValidator = z.object({
  name: z.string().min(1, 'El campo es requerido'),
  image: z.object({
    key: z.string().optional(),
    url: z.string().optional(),
  }),
  electionId: z.string().min(1, 'El campo es requerido'),
  proposals: z.array(
    z.object({
      name: z.string().min(1, 'El campo es requerido').optional(),
      description: z.string().min(1, 'El campo es requerido').optional(),
    }),
  ),
});

export type PartyRequest = z.infer<typeof PartyValidator>;
