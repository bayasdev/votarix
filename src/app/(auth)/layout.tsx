import { redirect } from 'next/navigation';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const currentUser = await getCurrentUser();
  if (currentUser) return redirect('/');

  return <div className="min-h-screen">{children}</div>;
}
