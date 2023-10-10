import { z } from 'zod';
import validateDni from '@/lib/helpers/validateDni';

export const UserValidator = z.object({
  name: z.string().min(1, 'Ingrese su nombre'),
  document: z.string().refine((value) => validateDni(value || ''), {
    message: 'El número de cédula ingresado no es válido',
  }),
  email: z
    .string()
    .email('El correo electrónico ingresado no es válido')
    .min(1, 'Ingrese su correo electrónico'),
  role: z.string().min(1, 'El campo es requerido'),
});

export type UserRequest = z.infer<typeof UserValidator>;
