import { redirect } from 'next/navigation';

import SignupForm from '@/src/components/auth/SignupForm';
import getCurrentUser from '../../actions/getCurrentUser';

const SignupPage = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser) redirect('/');
  return <SignupForm />;
};

export default SignupPage;
