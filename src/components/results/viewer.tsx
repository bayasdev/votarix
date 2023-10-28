import { ElectionResults } from '@/types';
import ElectionResultsByPosition from '@/components/results/positions';
import ElectionParticipation from '@/components/results/participation';

interface ElectionResultsViewerProps {
  data: ElectionResults | null;
}

const ElectionResultsViewer: React.FC<ElectionResultsViewerProps> = ({
  data,
}) => {
  return (
    <>
      {data?.positions && data?.positions?.length > 0 && (
        <ElectionResultsByPosition data={data} />
      )}
      <ElectionParticipation data={data} />
    </>
  );
};

export default ElectionResultsViewer;
