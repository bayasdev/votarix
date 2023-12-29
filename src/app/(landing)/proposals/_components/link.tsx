import Link from 'next/link';
import { Vote } from 'lucide-react';

import { SafeElection } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ElectionLinkProps {
  election: SafeElection | null;
}

const ElectionLink: React.FC<ElectionLinkProps> = ({ election }) => {
  return (
    <Link href={`/proposals/${election?.id}`}>
      <Card className="hover:bg-accent">
        <CardHeader>
          <Vote className="h-12 w-12" />
          <CardTitle className="tracking-tight">{election?.name}</CardTitle>
        </CardHeader>
        <CardContent>{election?.description}</CardContent>
      </Card>
    </Link>
  );
};

export default ElectionLink;
