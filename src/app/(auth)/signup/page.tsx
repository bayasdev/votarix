import { redirect } from 'next/navigation';

import SignupForm from '@/src/components/auth/SignupForm';
import getCurrentUser from '../../actions/getCurrentUser';
import EmptyState from '@/src/components/EmptyState';
import Heading from '@/src/components/Heading';
import Link from 'next/link';

const SignupPage = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser) redirect('/');

  if (process.env.SIGNUP_ALLOWED !== 'true') {
    return (
      <div className="flex flex-col gap-6">
        <Heading
          title="Opción deshabilitada"
          subtitle="Contacte con un administrador"
        />
        <Link href="/login" className="btn-primary btn w-full">
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  return <SignupForm />;
};

export default SignupPage;
