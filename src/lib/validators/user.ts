import { z } from 'zod';
import validateDocument from '@/lib/helpers/validate-document';

export const UserValidator = z.object({
  name: z.string().min(1, 'Ingrese su nombre'),
  document: z.string().refine((value) => validateDocument(value || ''), {
    message: 'El número de cédula ingresado no es válido',
  }),
  email: z
    .string()
    .email('El correo electrónico ingresado no es válido')
    .min(1, 'Ingrese su correo electrónico'),
  role: z.string().min(1, 'El campo es requerido'),
});

export type UserRequest = z.infer<typeof UserValidator>;

export const UserPasswordValidator = z.object({
  password: z
    .string()
    .min(1, 'Ingrese una contraseña')
    .min(8, 'La contraseña debe contener al menos 8 caracteres'),
});

export type UserPasswordRequest = z.infer<typeof UserPasswordValidator>;
