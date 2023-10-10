import Heading from '@/components/heading';
import { Icons } from '@/components/icons';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Aquí no hay nada',
  subtitle = 'Intenta agregar algo primero',
}) => {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-6">
      <Icons.page className="h-12 w-12" />
      <Heading title={title} subtitle={subtitle} center />
    </div>
  );
};

export default EmptyState;
