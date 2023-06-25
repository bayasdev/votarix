import Heading from './Heading';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Aquí no hay nada',
  subtitle = 'Intenta agregar algo primero',
}) => {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center">
      <Heading center title={title} subtitle={subtitle} />
    </div>
  );
};

export default EmptyState;
