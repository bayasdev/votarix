import SignupForm from '@/src/components/auth/SignupForm';
import getCurrentUser from '../../actions/getCurrentUser';

const SignupPage = async () => {
  const currentUser = await getCurrentUser();
  return <SignupForm currentUser={currentUser} />;
};

export default SignupPage;
