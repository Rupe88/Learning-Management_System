import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Course } from '../../types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200"
    >
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          {course.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {course.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="text-gray-700 dark:text-gray-300">{course.rating}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">{course.totalStudents}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${course.price}
          </span>
          <Link
            to={`/course/${course.id}`}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;