import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import PopularCourses from '../components/home/PopularCourses';
import TestimonialsSection from '../components/home/TestimonialsSection';
import NewsletterSection from '../components/home/NewsletterSection';
import SnowEffect from '../components/shared/SnowEffect';

const Home = () => {
  return (
    <div className="min-h-screen">
      <SnowEffect />
      <HeroSection />
      <FeaturesSection />
      <PopularCourses />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;