import { z } from 'zod';
// import validateDocument from '@/lib/helpers/validateDocument';

export const CandidateValidator = z.object({
  name: z.string().min(1, 'El campo es requerido'),
  email: z
    .string()
    .email('El correo electrónico ingresado no es válido')
    .optional()
    .or(z.literal('')),
  document: z
    .string()
    // .refine((value) => validateDocument(value || ''), {
    //   message: 'El número de cédula ingresado no es válido',
    // })
    .optional()
    .or(z.literal('')),
  partyId: z.string().min(1, 'El campo es requerido'),
  positionId: z.string().min(1, 'El campo es requerido'),
  alternateCandidateName: z.string().min(1, 'El campo es requerido'),
  proposals: z.array(
    z.object({
      name: z.string().min(1, 'El campo es requerido').optional(),
      description: z.string().min(1, 'El campo es requerido').optional(),
    }),
  ),
  image: z.object({
    key: z.string().optional(),
    url: z.string().optional(),
  }),
});

export type CandidateRequest = z.infer<typeof CandidateValidator>;
