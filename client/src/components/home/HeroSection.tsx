import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-24 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Become a <span className="text-yellow-400">Successful</span> Developer With Us
            </h1>
            <p className="text-lg text-gray-100 mb-8">
              Learn from industry experts and get real-world experience. Join thousands of students already learning on DigiGurukul .
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center px-8 py-3 text-lg bg-white text-blue-600 rounded-full hover:bg-gray-100 transition-colors"
              >
                Explore Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="inline-flex items-center px-8 py-3 text-lg text-white border-2 border-white rounded-full hover:bg-white/10 transition-colors">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>
          </motion.div>

          {/* Right Content - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            <StatsCard number="20K+" label="Active Students" />
            <StatsCard number="200+" label="Video Lessons" />
            <StatsCard number="50+" label="Pro Courses" />
            <StatsCard number="24/7" label="Support" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatsCard = ({ number, label }: { number: string; label: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white/10 p-6 rounded-xl text-center"
  >
    <h3 className="text-3xl font-bold text-white mb-2">{number}</h3>
    <p className="text-gray-200">{label}</p>
  </motion.div>
);

export default HeroSection;