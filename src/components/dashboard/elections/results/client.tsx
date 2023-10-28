'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Loader2, PauseIcon } from 'lucide-react';

import { ElectionResults } from '@/types';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';

import { toast } from '@/components/ui/use-toast';
import ElectionResultsViewer from '@/components/results/viewer';

interface ElectionResultsClientProps {
  data: ElectionResults | null;
}

const ElectionResultsClient: React.FC<ElectionResultsClientProps> = ({
  data,
}) => {
  const [autoRefresh, setAutoRefresh] = React.useState<boolean>(true);
  const refreshInterval = 180;
  const router = useRouter();

  const handleRefresh = React.useCallback(() => {
    router.refresh();
    toast({
      title: 'Resultados actualizados',
    });
  }, [router]);

  React.useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(handleRefresh, refreshInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, handleRefresh]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading
          title={data?.electionName || ''}
          subtitle={`Corte actualizado el ${dayjs(data?.updatedAt)
            .locale('es')
            .format('DD [de] MMMM [del] YYYY [a las] HH:mm')}`}
        />
        <Button
          variant={autoRefresh ? 'default' : 'secondary'}
          onClick={() => setAutoRefresh(!autoRefresh)}
        >
          {autoRefresh ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Actualizando cada {refreshInterval} segundos
            </>
          ) : (
            <>
              <PauseIcon className="mr-2 h-4 w-4" />
              Actualización automática pausada
            </>
          )}
        </Button>
      </div>
      <ElectionResultsViewer data={data} />
    </div>
  );
};

export default ElectionResultsClient;
