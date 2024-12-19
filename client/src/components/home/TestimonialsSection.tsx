import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Testimonial } from '../../types';

const testimonials = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Frontend Developer',
    avatar: 'https://source.unsplash.com/random/100x100?portrait=1',
    content: 'Becodemy transformed my career. The MERN stack course was exactly what I needed to land my dream job.',
    rating: 5
  },
  {
    id: 2,
    name: 'Sarah Williams',
    role: 'Full Stack Developer',
    avatar: 'https://source.unsplash.com/random/100x100?portrait=2',
    content: 'The quality of instruction and project-based learning approach is outstanding. Worth every penny!',
    rating: 5
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Software Engineer',
    avatar: 'https://source.unsplash.com/random/100x100?portrait=3',
    content: 'I went from knowing nothing about web development to building complex applications. Amazing platform!',
    rating: 5
  }
];

const TestimonialsSection = () => {
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
            What Our Students Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hear from our successful students who have transformed their careers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
    >
      <div className="flex items-center mb-6">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white">
            {testimonial.name}
          </h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {testimonial.role}
          </p>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {testimonial.content}
      </p>
      <div className="flex text-yellow-400">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-current" />
        ))}
      </div>
    </motion.div>
  );
};

export default TestimonialsSection;