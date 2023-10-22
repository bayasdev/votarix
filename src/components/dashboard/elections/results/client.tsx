'use client';

import { ElectionResults } from '@/types';
import CandidatesBarChart from '@/components/dashboard/elections/results/candidates-bar-chart';

interface ElectionResultsClientProps {
  electionResults: ElectionResults | null;
}

const ElectionResultsClient: React.FC<ElectionResultsClientProps> = ({
  electionResults,
}) => {
  return (
    <div>
      {electionResults?.positions.map((position) => (
        <CandidatesBarChart
          key={position.id}
          positionName={position.name}
          electionResultsCandidates={position.candidates}
        />
      ))}
    </div>
  );
};

export default ElectionResultsClient;
