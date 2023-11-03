import { notFound } from 'next/navigation';

import { getCandidateById } from '@/lib/data/candidate';
import { getParties } from '@/lib/data/party';
import { getPositions } from '@/lib/data/position';
import GoBack from '@/components/shared/go-back';
import Heading from '@/components/shared/heading';
import CandidateForm from '@/components/dashboard/candidates/form';

interface UpdateCandidatePageProps {
  params: {
    candidateId?: string;
  };
}

const UpdateCandidatePage = async ({ params }: UpdateCandidatePageProps) => {
  const candidate = await getCandidateById(params);
  const parties = await getParties();
  const positions = await getPositions();
  if (!candidate) return notFound();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading
          title="Editar candidato"
          subtitle="Actualice un candidato existente"
        />
        <GoBack />
      </div>
      <CandidateForm
        initialData={candidate}
        parties={parties}
        positions={positions}
      />
    </div>
  );
};

export default UpdateCandidatePage;
