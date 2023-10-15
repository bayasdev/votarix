import { Icons } from '@/components/icons';
import Heading from '@/components/heading';
import GoBack from '@/components/go-back';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  icon?: keyof typeof Icons;
  showGoBack?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Aquí no hay nada',
  subtitle = 'Intenta agregar algo primero',
  icon,
  showGoBack = false,
}) => {
  const Icon = Icons[icon || 'page'];

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-6">
      <Icon className="h-12 w-12" />
      <Heading title={title} subtitle={subtitle} center />
      {showGoBack && <GoBack />}
    </div>
  );
};

export default EmptyState;
