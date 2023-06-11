'use client';

import { signOut } from 'next-auth/react';

import { SafeUser } from '@/src/types';
import { useRouter } from 'next/navigation';

interface HomeProps {
  currentUser: SafeUser | null;
}

const Home: React.FC<HomeProps> = ({ currentUser }) => {
  const router = useRouter();
  return (
    <>
      {currentUser && <pre>{JSON.stringify(currentUser, null, 2)}</pre>}
      {currentUser ? (
        <button className="btn" onClick={() => signOut()}>
          Signout
        </button>
      ) : (
        <button className="btn" onClick={() => router.push('/login')}>
          Login
        </button>
      )}
    </>
  );
};

export default Home;
