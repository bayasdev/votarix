import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface VotesBreakdownTableProps {
  totalValidVotes: number;
  totalNullVotes: number;
  totalBlankVotes: number;
}

export const VotesBreakdownTable: React.FC<VotesBreakdownTableProps> = ({
  totalValidVotes,
  totalNullVotes,
  totalBlankVotes,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Votos válidos</TableHead>
          <TableHead>Votos nulos</TableHead>
          <TableHead>Votos blancos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{totalValidVotes}</TableCell>
          <TableCell>{totalNullVotes}</TableCell>
          <TableCell>{totalBlankVotes}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
