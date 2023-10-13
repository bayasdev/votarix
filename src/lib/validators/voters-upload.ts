import { z } from 'zod';

export const VotersUploadValidator = z.object({
  file: z.any().refine((file) => file?.type === 'text/csv', {
    message: 'El archivo debe ser de tipo CSV',
  }),
});

export type VotersUploadRequest = z.infer<typeof VotersUploadValidator>;
