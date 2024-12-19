import { motion } from 'framer-motion';
import CourseCard from '../shared/CourseCard';
import { Course } from '../../types';

const popularCourses: Course[] = [
  {
    id: '1',
    title: 'MERN Stack LMS Platform',
    description: 'Build a complete Learning Management System with MERN Stack',
    thumbnail: 'https://source.unsplash.com/random/800x600?coding=1',
    price: 149.99,
    instructor: 'Shahriar Sajeeb',
    rating: 4.9,
    totalStudents: 2500,
    category: 'Full Stack'
  },
  {
    id: '2',
    title: 'Next.js 14 Social Media',
    description: 'Create a modern social media platform with Next.js 14',
    thumbnail: 'https://source.unsplash.com/random/800x600?programming=2',
    price: 129.99,
    instructor: 'Shahriar Sajeeb',
    rating: 4.8,
    totalStudents: 1800,
    category: 'Frontend'
  },
  {
    id: '3',
    title: 'MERN Stack E-commerce',
    description: 'Build a full-featured e-commerce platform from scratch',
    thumbnail: 'https://source.unsplash.com/random/800x600?computer=3',
    price: 199.99,
    instructor: 'Shahriar Sajeeb',
    rating: 4.9,
    totalStudents: 3200,
    category: 'Full Stack'
  }
];

const PopularCourses = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Most Popular Courses
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join our top-rated courses and start your development journey today
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;