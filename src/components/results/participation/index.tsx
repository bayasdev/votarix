import { Users } from 'lucide-react';

import { ElectionResultsResponse } from '@/types';
import { ParticipationTable } from './table';
import { ParticipationChart } from './chart';

interface ParticipationProps {
  data: ElectionResultsResponse | null;
}

export const Participation: React.FC<ParticipationProps> = ({ data }) => {
  return (
    <>
      <div className="font-medium tracking-tight">
        <Users className="mr-2 inline-block h-5 w-5" />
        Participación electoral
      </div>
      <div className="flex flex-wrap justify-between gap-6 lg:flex-nowrap">
        <div className="flex-grow overflow-auto">
          <ParticipationTable data={data} />
        </div>
        <div>
          <ParticipationChart data={data} />
        </div>
      </div>
    </>
  );
};
