import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const NewsletterSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Updated with DigiGurukul 
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Get notified about new courses, workshops, and exclusive offers
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              Subscribe
              <Send className="ml-2 h-5 w-5" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;