import { z } from 'zod';
import dayjs from 'dayjs';

export const ElectionValidator = z
  .object({
    name: z.string().min(1, 'El campo es requerido'),
    description: z.string().min(1, 'El campo es requerido'),
    startsAt: z.coerce.date(),
    endsAt: z.coerce.date(),
  })
  .refine((data) => dayjs(data.startsAt).isBefore(dayjs(data.endsAt)), {
    message: 'La fecha de inicio debe ser antes de la fecha de finalización',
    path: ['startsAt'],
  })
  .refine((data) => dayjs(data.endsAt).isAfter(dayjs(data.startsAt)), {
    message: 'La fecha de finalización debe ser después de la fecha de inicio',
    path: ['endsAt'],
  });

export type ElectionRequest = z.infer<typeof ElectionValidator>;
