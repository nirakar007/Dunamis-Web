// src/components/PageTransitionWrapper.jsx
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    x: '100%', // Start off-screen to the right
    scale: 0.9, // Slightly smaller
  },
  in: {
    opacity: 1,
    x: 0, // Move to its final position
    scale: 1,
  },
  out: {
    opacity: 0,
    x: '-100%', // Exit off-screen to the left
    scale: 0.9,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.6,
};

const PageTransitionWrapper = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="absolute inset-0 w-full h-full" // Crucial for positioning and full-page animation
    >
      {children}
    </motion.div>
  );
};

export default PageTransitionWrapper;