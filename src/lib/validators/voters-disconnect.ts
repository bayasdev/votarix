import { z } from 'zod';

export const VotersDisconnectValidator = z.array(
  z.object({
    id: z.string().min(1, 'El campo es requerido'),
  }),
);

export type VotersDisconnectRequest = z.infer<typeof VotersDisconnectValidator>;
