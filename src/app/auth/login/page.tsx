import LoginForm from '@/src/components/auth/LoginForm';
import getCurrentUser from '../../actions/getCurrentUser';

const LoginPage = async () => {
  const currentUser = await getCurrentUser();
  return <LoginForm currentUser={currentUser} />;
};

export default LoginPage;
