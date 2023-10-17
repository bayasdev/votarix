import { columns } from '@/components/landing/certificates/columns';
import { DataTable } from '@/components/ui/data-table';
import { CertificateResponse } from '@/types';

interface CertificatesClientProps {
  certificates: CertificateResponse[] | null;
}

const CertificatesClient: React.FC<CertificatesClientProps> = ({
  certificates,
}) => {
  return (
    <DataTable
      columns={columns}
      data={certificates}
      searchKey="electionName"
      showViewOptions={false}
    />
  );
};

export default CertificatesClient;
