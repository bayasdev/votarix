import Heading from '@/src/components/common/Heading';

interface PositionsPageProps {}

const PositionsPage: React.FC<PositionsPageProps> = ({}) => {
  // follow CandidatePage.tsx as an example
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Puestos Electivos"
        subtitle="Administrar puestos electivos"
      />
    </div>
  );
};

export default PositionsPage;
