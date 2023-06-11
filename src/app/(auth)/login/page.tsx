import { redirect } from 'next/navigation';

import LoginForm from '@/src/components/auth/LoginForm';
import getCurrentUser from '../../actions/getCurrentUser';

const LoginPage = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser) return redirect('/');
  return <LoginForm />;
};

export default LoginPage;
