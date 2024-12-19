import { motion } from 'framer-motion';
import { BookOpen, Video, Users, Award, Clock, MessageSquare } from 'lucide-react';
import { Feature } from '../../types';

const features = [
  {
    icon: BookOpen,
    title: 'Structured Learning',
    description: 'Follow a clear path to master web development skills'
  },
  {
    icon: Video,
    title: 'HD Video Lessons',
    description: 'Learn with high-quality video content and live sessions'
  },
  {
    icon: Users,
    title: 'Active Community',
    description: 'Join our community of passionate developers'
  },
  {
    icon: Award,
    title: 'Certification',
    description: 'Earn certificates upon course completion'
  },
  {
    icon: Clock,
    title: 'Lifetime Access',
    description: 'Access course content anytime, anywhere'
  },
  {
    icon: MessageSquare,
    title: '24/7 Support',
    description: 'Get help whenever you need it'
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose DigiGurukul ?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We provide everything you need to become a successful developer
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  const Icon = feature.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6">
        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
        {feature.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {feature.description}
      </p>
    </motion.div>
  );
};

export default FeaturesSection;