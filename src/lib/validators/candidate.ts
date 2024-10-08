import { z } from 'zod';
// import { isCedula } from 'validator-ec';

export const CandidateValidator = z.object({
  name: z.string().min(1, 'El campo es requerido'),
  email: z
    .string()
    .email('El correo electrónico ingresado no es válido')
    .min(1, 'El campo es requerido'),
  document: z
    .string()
    // .refine((value) => isCedula(value || ''), {
    //   message: 'El número de cédula ingresado no es válido',
    // }),
    .min(1, 'El campo es requerido'),
  partyId: z.string().min(1, 'El campo es requerido'),
  type: z.string().min(1, 'El campo es requerido'),
  image: z.object({
    key: z.string().optional(),
    url: z.string().optional(),
  }),
});

export type CandidateRequest = z.infer<typeof CandidateValidator>;
