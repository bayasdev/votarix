import { z } from 'zod';
import dayjs from 'dayjs';

export const ElectionValidator = z
  .object({
    name: z.string().min(1, 'El campo es requerido'),
    description: z.string().optional().or(z.literal('')),
    startTime: z.date(),
    endTime: z.date(),
  })
  .refine((data) => dayjs(data.startTime).isBefore(dayjs(data.endTime)), {
    message: 'La fecha de inicio debe ser antes de la fecha de finalización',
    path: ['startTime'],
  })
  .refine((data) => dayjs(data.endTime).isAfter(dayjs(data.startTime)), {
    message: 'La fecha de finalización debe ser después de la fecha de inicio',
    path: ['endTime'],
  });

export type ElectionRequest = z.infer<typeof ElectionValidator>;
