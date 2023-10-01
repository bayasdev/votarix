'use client';

import { useRouter } from 'next/navigation';
import { MdArrowBack } from 'react-icons/md';
import Button from '../../common/Button';

const GoBack = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Button
      label="Volver"
      icon={MdArrowBack}
      color="neutral"
      small
      onClick={handleGoBack}
      className="self-start"
    />
  );
};

export default GoBack;
