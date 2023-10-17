import { getVoterCertificates } from '@/app/actions/voters';
import Heading from '@/components/heading';
import CertificatesClient from '@/components/landing/certificates/client';

const CertificatesPage = async () => {
  const certificates = await getVoterCertificates();

  return (
    <div className="container flex flex-col gap-6">
      <Heading
        title="Mis certificados"
        subtitle="Procesos electorales en los que ha participado"
      />
      <CertificatesClient certificates={certificates} />
    </div>
  );
};

export default CertificatesPage;
