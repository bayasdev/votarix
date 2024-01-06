import { Skeleton } from '@/components/ui/skeleton';

export const DashboardNavSkeleton = () => {
  return (
    <aside className="hidden w-[200px] flex-col md:flex">
      <nav className="grid items-start gap-2">
        <Skeleton className="h-9 rounded-md px-3 py-2" />
        <Skeleton className="h-9 rounded-md px-3 py-2" />
        <Skeleton className="h-9 rounded-md px-3 py-2" />
        <Skeleton className="h-9 rounded-md px-3 py-2" />
        <Skeleton className="h-9 rounded-md px-3 py-2" />
        <Skeleton className="h-9 rounded-md px-3 py-2" />
      </nav>
    </aside>
  );
};
