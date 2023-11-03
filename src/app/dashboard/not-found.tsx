import EmptyState from '@/components/shared/empty-state';

const NotFoundPage = () => {
  return (
    <div>
      <EmptyState
        title="Error 404"
        subtitle="La página que buscas no existe"
        icon="notFound"
        showGoBack
      />
    </div>
  );
};

export default NotFoundPage;
