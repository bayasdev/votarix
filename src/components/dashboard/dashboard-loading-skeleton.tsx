import { Skeleton } from '@/components/ui/skeleton';

const DashboardLoadingSkeleton = () => {
  return (
    <div className="space-y-8">
      <Skeleton className="h-16 w-1/2" />
      <Skeleton className="h-64" />
    </div>
  );
};

export default DashboardLoadingSkeleton;
