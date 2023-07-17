import { z } from 'zod';
import moment from 'moment';

export const ElectionValidator = z
  .object({
    name: z.string().min(1, 'El campo es requerido'),
    description: z.string().optional().or(z.literal('')),
    startTime: z.string().refine((value) => isValidDateTime(value), {
      message: 'Fecha de inicio inválida',
    }),
    endTime: z.string().refine((value) => isValidDateTime(value), {
      message: 'Fecha de finalización inválida',
    }),
  })
  .refine((data) => isEndAfterStart(data.startTime, data.endTime), {
    message: 'La fecha de finalización debe ser posterior a la de inicio',
    path: ['endTime'],
  });

export type ElectionRequest = z.infer<typeof ElectionValidator>;

function isValidDateTime(value: string): boolean {
  return moment(value, 'YYYY-MM-DDTHH:mm', true).isValid();
}

function isEndAfterStart(start: string, end: string): boolean {
  return moment(start, 'YYYY-MM-DDTHH:mm').isBefore(
    moment(end, 'YYYY-MM-DDTHH:mm'),
  );
}
