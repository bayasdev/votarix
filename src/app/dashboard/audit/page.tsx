import { getAuditLogs } from '@/lib/data/audit-logs';
import AuditLogsClient from '@/app/dashboard/audit/_components/client';
import Heading from '@/components/shared/heading';
import EmptyState from '@/components/shared/empty-state';

const AuditLogsPage = async () => {
  const logs = await getAuditLogs();

  return (
    <div className="space-y-8">
      <Heading
        title="Auditoría"
        subtitle="Consulte la actividad de los usuarios en el sistema"
      />
      {logs && logs.length > 0 ? (
        <AuditLogsClient logs={logs} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default AuditLogsPage;
