import { notFound } from 'next/navigation';

import { getCertificateById } from '@/app/actions/certificates';
import EmptyState from '@/components/empty-state';

interface ValidateCertificatePageProps {
  params: {
    certificateId: string;
  };
}

const ValidateCertificatePage = async ({
  params,
}: ValidateCertificatePageProps) => {
  if (!params) {
    return notFound();
  }

  const certificate = await getCertificateById(params);
  return (
    <div className="container flex flex-col gap-6">
      {certificate ? (
        <>
          <EmptyState
            title="Certificado válido"
            subtitle={`${certificate.voterName} (${certificate.voterDocument}) consta como sufragante en el proceso electoral denominado "${certificate.electionName}"`}
            icon="check"
          />
        </>
      ) : (
        <EmptyState
          title="Certificado no válido"
          subtitle="El certificado no existe o ha sido revocado"
          icon="warning"
        />
      )}
    </div>
  );
};

export default ValidateCertificatePage;
