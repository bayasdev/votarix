import { cn } from '@/lib/utils';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={cn('space-y-2', center ? 'text-center' : 'text-start')}>
      <div className="text-2xl font-semibold tracking-tight">{title}</div>
      <div className="text-sm text-muted-foreground">{subtitle}</div>
    </div>
  );
};

export default Heading;
