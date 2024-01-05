'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { FileDown, Loader2, Pause } from 'lucide-react';
import axios from 'axios';
import { saveAs } from 'file-saver';

import { ElectionResults } from '@/types';
import Heading from '@/components/shared/heading';
import { Button } from '@/components/ui/button';

import { toast } from '@/components/ui/use-toast';
import ElectionResultsViewer from '@/components/results/viewer';
import GoBack from '@/components/shared/go-back';

interface ElectionResultsClientProps {
  data: ElectionResults | null;
}

const ElectionResultsClient: React.FC<ElectionResultsClientProps> = ({
  data,
}) => {
  const isFinished = useMemo(
    () => dayjs().isAfter(dayjs(data?.endsAt)),
    [data],
  );
  const [autoRefresh, setAutoRefresh] = useState<boolean>(
    isFinished ? false : true,
  );
  const refreshInterval = 60;
  const router = useRouter();

  const handleRefresh = useCallback(() => {
    router.refresh();
    toast({
      title: 'Resultados actualizados',
    });
  }, [router]);

  const handleReportDownload = () => {
    axios
      .get(`/api/elections/reports/${data?.electionId}`, {
        responseType: 'blob',
      })
      .then((response) => {
        saveAs(response.data, `acta_${data?.electionId}.pdf`);
      })
      .catch((error) => {
        toast({
          title: 'Ocurrió un error',
          description: error?.response?.data,
        });
      });
  };

  useEffect(() => {
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
        <div className="flex flex-wrap gap-4 lg:flex-col lg:items-end">
          <GoBack />
          {isFinished ? (
            <Button variant="destructive" onClick={handleReportDownload}>
              <FileDown className="mr-2 h-4 w-4" />
              Descargar acta de escrutinios
            </Button>
          ) : (
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
                  <Pause className="mr-2 h-4 w-4" />
                  Actualización automática pausada
                </>
              )}
            </Button>
          )}
        </div>
      </div>
      <ElectionResultsViewer data={data} />
    </div>
  );
};

export default ElectionResultsClient;
