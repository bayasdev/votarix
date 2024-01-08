import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardDataResponse } from '@/types';
import { FileBadge, UserSquare, Users, Vote } from 'lucide-react';

interface DashboardClientProps {
  data: DashboardDataResponse | null;
}

const DashboardClient: React.FC<DashboardClientProps> = ({ data }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Usuarios registrados
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
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
          <Vote className="h-4 w-4 text-muted-foreground" />
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
          <UserSquare className="h-4 w-4 text-muted-foreground" />
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
          <FileBadge className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.totalCertificates}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardClient;
