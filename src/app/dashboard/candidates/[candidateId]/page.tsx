import { notFound } from 'next/navigation';

import { getCandidateById } from '@/lib/data/candidates';
import { getParties } from '@/lib/data/parties';
import GoBack from '@/components/shared/go-back';
import Heading from '@/components/shared/heading';
import CandidateForm from '@/app/dashboard/candidates/_components/form';

interface UpdateCandidatePageProps {
  params: {
    candidateId?: string;
  };
}

const UpdateCandidatePage = async ({ params }: UpdateCandidatePageProps) => {
  const candidate = await getCandidateById(params);
  const parties = await getParties();

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
      <CandidateForm initialData={candidate} parties={parties} />
    </div>
  );
};

export default UpdateCandidatePage;
