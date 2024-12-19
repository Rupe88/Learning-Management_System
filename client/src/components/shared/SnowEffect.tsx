import { motion } from 'framer-motion';

const SnowEffect = () => {
  const snowflakes = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: Math.random() * 5, // Changed to a number
    size: Math.random() * 10 + 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {snowflakes.map((snowflake) => (
        <motion.div
          key={snowflake.id}
          className="absolute bg-white rounded-full opacity-70"
          style={{
            left: snowflake.left,
            width: snowflake.size,
            height: snowflake.size,
          }}
          initial={{ y: -20 }}
          animate={{
            y: '100vh',
            rotate: 360,
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: snowflake.animationDelay, // Passed as a number
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default SnowEffect;
