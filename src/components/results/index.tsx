import { ElectionResultsResponse } from '@/types';
import { ResultsByPosition } from './positions';
import { Participation } from './participation';

interface ResultsProps {
  data: ElectionResultsResponse | null;
}

export const Results: React.FC<ResultsProps> = ({ data }) => {
  return (
    <>
      {data?.positions && data?.positions?.length > 0 && (
        <ResultsByPosition data={data} />
      )}
      <Participation data={data} />
    </>
  );
};
