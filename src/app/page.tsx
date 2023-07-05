import Container from '../components/common/Container';
import Logo from '../components/common/Logo';
import Home from '../components/home/Home';
import Footer from '../components/landing/common/Footer';
import Header from '../components/landing/common/Header';
import Hero from '../components/landing/common/Hero';
import getCurrentUser from './actions/getCurrentUser';

const HomePage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <Header/>
      <Hero/>
      <Container>
        
      </Container>
      <Footer/>

    </div>
  );
};

export default HomePage;
