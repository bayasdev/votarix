import { authOptions } from '@/src/lib/auth';
import NextAuth from 'next-auth/next';

export default NextAuth(authOptions);
