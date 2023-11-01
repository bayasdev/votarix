import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface NavSkeletonProps {
  className?: string;
}

const NavSkeleton = ({ className }: NavSkeletonProps) => {
  return (
    <div className={cn(className)}>
      <Skeleton className="h-8 w-[50%]" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  );
};

export default NavSkeleton;
