import { Metadata } from 'next';

import Heading from '@/components/heading';
import EmptyState from '@/components/empty-state';

export const metadata: Metadata = {
  title: 'Candidatos',
};

const CandidatesPage = () => {
  return (
    <div className="container flex flex-col gap-6">
      <Heading
        title="Candidatos"
        subtitle="Conoce a los candidatos y sus propuestas"
      />
    </div>
  );
};

export default CandidatesPage;
