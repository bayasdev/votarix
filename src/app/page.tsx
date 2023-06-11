'use client';

import { signOut } from 'next-auth/react';

const HomePage = () => {
  return (
    <div>
      <div>HomePage</div>
      <button onClick={() => signOut()}>Signout</button>
    </div>
  );
};

export default HomePage;
