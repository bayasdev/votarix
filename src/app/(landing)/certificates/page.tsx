import { Metadata } from 'next';

import { getVoterCertificates } from '@/lib/data/voters';
import EmptyState from '@/components/empty-state';
import Heading from '@/components/heading';
import CertificatesClient from '@/components/landing/certificates/client';

export const metadata: Metadata = {
  title: 'Mis certificados',
};

const CertificatesPage = async () => {
  const certificates = await getVoterCertificates();

  return (
    <div className="container flex flex-col gap-6">
      <Heading
        title="Mis certificados"
        subtitle="Procesos electorales en los que ha participado"
      />
      {certificates && certificates.length > 0 ? (
        <CertificatesClient certificates={certificates} />
      ) : (
        <EmptyState subtitle="No has participado en ningún proceso electoral" />
      )}
    </div>
  );
};

export default CertificatesPage;
