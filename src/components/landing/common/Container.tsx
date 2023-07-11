interface ContainerProps {
    children: React.ReactNode;
  }
  
  const ContainerLanding: React.FC<ContainerProps> = ({ children }) => {
    return (
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 py-4">
        {children}
      </div>
    );
  };
  
  export default ContainerLanding;
  