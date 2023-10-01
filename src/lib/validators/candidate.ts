import { z } from 'zod';
import validateDni from '../helpers/validateDni';

export const CandidateValidator = z.object({
  name: z.string().min(1, 'El campo es requerido'),
  email: z
    .string()
    .email('El correo electrónico ingresado no es válido')
    .optional()
    .or(z.literal('')),
  document: z
    .string()
    .refine((value) => validateDni(value || ''), {
      message: 'El número de cédula ingresado no es válido',
    })
    .optional()
    .or(z.literal('')),
  partyId: z.string().min(1, 'El campo es requerido'),
  positionId: z.string().min(1, 'El campo es requerido'),
  proposals: z.string().optional(),
});

export type CandidateRequest = z.infer<typeof CandidateValidator>;
