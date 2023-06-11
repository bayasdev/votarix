import Home from '../components/home/Home';
import getCurrentUser from './actions/getCurrentUser';

const HomePage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <div>HomePage</div>
      <Home currentUser={currentUser} />
    </div>
  );
};

export default HomePage;
