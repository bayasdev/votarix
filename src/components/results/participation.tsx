import { Users } from 'lucide-react';
import dayjs from 'dayjs';

import { ElectionResults } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ElectionStatus } from '@/constants';
import VotersChart from '@/components/results/voters-chart';

interface ElectionParticipationProps {
  data: ElectionResults | null;
}

const ElectionParticipation: React.FC<ElectionParticipationProps> = ({
  data,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="font-medium tracking-tight">
        <Users className="-mt-1 mr-2 inline-block h-5 w-5" />
        Participación electoral
      </div>
      <div className="flex flex-wrap justify-between gap-6">
        <div className="flex-grow overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha de inicio</TableHead>
                <TableHead>Fecha de finalización</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Sufragantes</TableHead>
                <TableHead>Ausentes</TableHead>
                <TableHead>Electores</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  {dayjs(data?.startTime).format('DD/MM/YYYY HH:mm')}
                </TableCell>
                <TableCell>
                  {dayjs(data?.endTime).format('DD/MM/YYYY HH:mm')}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      data?.status === ElectionStatus.ONGOING
                        ? 'default'
                        : data?.status === ElectionStatus.NOT_STARTED
                          ? 'secondary'
                          : 'destructive'
                    }
                  >
                    {data?.status === ElectionStatus.ONGOING
                      ? 'En curso'
                      : data?.status === ElectionStatus.NOT_STARTED
                        ? 'No iniciada'
                        : 'Finalizada'}
                  </Badge>
                </TableCell>
                <TableCell>{data?.totalVotes}</TableCell>
                <TableCell>{data?.absentVoters}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{data?.totalVoters}</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div>
          <VotersChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default ElectionParticipation;
