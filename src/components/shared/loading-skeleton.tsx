import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ className }) => {
  return (
    <div className={cn('flex flex-col gap-8', className)}>
      <Skeleton className="h-16 w-1/2" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
};

export default LoadingSkeleton;
