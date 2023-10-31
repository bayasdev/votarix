import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardData } from '@/types';
import {
  FileBadgeIcon,
  UserSquareIcon,
  UsersIcon,
  VoteIcon,
} from 'lucide-react';

interface DashboardClientProps {
  data: DashboardData | null;
}

const DashboardClient: React.FC<DashboardClientProps> = ({ data }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Usuarios registrados
          </CardTitle>
          <UsersIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.totalUsers}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Procesos electorales
          </CardTitle>
          <VoteIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.totalElections}</div>
          <p className="text-xs text-muted-foreground">
            {data?.totalActiveElections} en curso
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Candidatos</CardTitle>
          <UserSquareIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.totalCandidates}</div>
          <p className="text-xs text-muted-foreground">
            en {data?.totalParties} partidos políticos
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Certificados generados
          </CardTitle>
          <FileBadgeIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.totalCertificates}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardClient;
