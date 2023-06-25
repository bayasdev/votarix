'use client';

import { useState } from 'react';

import { SafeCandidate } from '@/src/types';
import Card from '../../common/Card';

interface EditCandidateProps {
  candidate: SafeCandidate | null;
}

const EditCandidate: React.FC<EditCandidateProps> = ({ candidate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const bodyContent = <div className="flex flex-col gap-6"></div>;

  const actionsContent = <div>actions</div>;

  return <Card bodyContent={bodyContent} actionsContent={actionsContent} />;
};

export default EditCandidate;
