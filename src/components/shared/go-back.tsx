'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const GoBack = () => {
  const router = useRouter();

  const onClick = () => {
    router.back();
  };

  return (
    <Button variant="outline" size="sm" onClick={onClick}>
      <ArrowLeftIcon className="mr-2 h-4 w-4" />
      Volver
    </Button>
  );
};

export default GoBack;
