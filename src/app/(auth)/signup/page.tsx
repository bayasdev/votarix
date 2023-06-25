import Link from 'next/link';

import Heading from '@/src/components/common/Heading';
import SignupClient from '@/src/components/auth/SignupClient';

const SignupPage = () => {
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

  return <SignupClient />;
};

export default SignupPage;
