import { z } from 'zod';
import { isCedula } from 'validator-ec';

export const LoginValidator = z.object({
  email: z
    .string()
    .email('El correo electrónico ingresado no es válido')
    .min(1, 'Ingrese su correo electrónico'),
  password: z.string().min(1, 'Ingrese una contraseña'),
});

export type LoginRequest = z.infer<typeof LoginValidator>;

export const SignupValidator = z.object({
  name: z.string().min(1, 'Ingrese su nombre'),
  document: z.string().refine((value) => isCedula(value || ''), {
    message: 'El número de cédula ingresado no es válido',
  }),
  email: z
    .string()
    .email('El correo electrónico ingresado no es válido')
    .min(1, 'Ingrese su correo electrónico'),
  password: z
    .string()
    .min(1, 'Ingrese una contraseña')
    .min(8, 'La contraseña debe contener al menos 8 caracteres'),
});

export type SignupRequest = z.infer<typeof SignupValidator>;
