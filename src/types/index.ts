import { User } from '@prisma/client';
import { ValidationRule } from 'react-hook-form';

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  emailVerified: string | null;
  createdAt: string;
  updatedAt: string;
};

export type FormValidationSchema = {
  required?: string;
  minLength?: {
    value: number;
    message?: string;
  };
  maxLength?: {
    value: number;
    message?: string;
  };
  pattern?: ValidationRule<RegExp>;
};
