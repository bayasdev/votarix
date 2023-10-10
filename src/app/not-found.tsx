import EmptyState from '@/components/empty-state';

const NotFoundPage = () => {
  return (
    <div>
      <EmptyState
        title="Página no encontrada"
        subtitle="La página que buscas no existe"
      />
    </div>
  );
};

export default NotFoundPage;
