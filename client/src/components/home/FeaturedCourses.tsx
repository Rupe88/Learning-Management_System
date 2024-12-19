import { motion } from 'framer-motion';
import CourseCard from '../shared/CourseCard';
import { Course } from '../../types';

const featuredCourses: Course[] = [
  {
    id: '1',
    title: 'Complete MERN Stack Course',
    description: 'Build full-stack applications with MongoDB, Express, React, and Node.js',
    thumbnail: 'https://source.unsplash.com/random/800x600?coding=1',
    price: 99.99,
    instructor: 'John Doe',
    rating: 4.8,
    totalStudents: 1500,
    category: 'Web Development'
  },
  {
    id: '2',
    title: 'Advanced Next.js & TypeScript',
    description: 'Master Next.js 13 with TypeScript and build enterprise applications',
    thumbnail: 'https://source.unsplash.com/random/800x600?programming=2',
    price: 89.99,
    instructor: 'Jane Smith',
    rating: 4.9,
    totalStudents: 1200,
    category: 'Frontend'
  },
  {
    id: '3',
    title: 'AWS Solutions Architect',
    description: 'Become an AWS certified solutions architect with hands-on projects',
    thumbnail: 'https://source.unsplash.com/random/800x600?server=3',
    price: 129.99,
    instructor: 'Mike Johnson',
    rating: 4.7,
    totalStudents: 800,
    category: 'Cloud Computing'
  }
];

const FeaturedCourses = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Courses
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Start your journey with our most popular courses
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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

export default FeaturedCourses;