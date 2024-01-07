import dayjs from 'dayjs';

import { ElectionResultsResponse } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface ParticipationTableProps {
  data: ElectionResultsResponse | null;
}

export const ParticipationTable: React.FC<ParticipationTableProps> = ({
  data,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha de inicio</TableHead>
          <TableHead>Fecha de finalización</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Sufragantes</TableHead>
          <TableHead>Ausentes</TableHead>
          <TableHead>Empadronados</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            {dayjs(data?.startsAt).format('DD/MM/YYYY HH:mm')}
          </TableCell>
          <TableCell>
            {dayjs(data?.endsAt).format('DD/MM/YYYY HH:mm')}
          </TableCell>
          <TableCell>
            <Badge
              variant={
                dayjs().isBefore(data?.startsAt)
                  ? 'secondary'
                  : dayjs().isBefore(data?.endsAt) &&
                      dayjs().isAfter(data?.startsAt)
                    ? 'default'
                    : 'destructive'
              }
            >
              {dayjs().isBefore(data?.startsAt)
                ? 'No iniciada'
                : dayjs().isBefore(data?.endsAt) &&
                    dayjs().isAfter(data?.startsAt)
                  ? 'En curso'
                  : 'Finalizada'}
            </Badge>
          </TableCell>
          <TableCell>{data?.totalVoters}</TableCell>
          <TableCell>{data?.totalAbsentVoters}</TableCell>
          <TableCell>
            <Badge variant="secondary">{data?.registeredVoters}</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
