import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  children: React.ReactNode;
}

const FOREST = '#123B2A';

const panelVariants = {
  initial: { scaleX: 0, transformOrigin: 'left center' },
  animate: {
    scaleX: [0, 1, 1, 0],
    transformOrigin: ['left center', 'left center', 'right center', 'right center'],
    transition: {
      duration: 0.5,
      times: [0, 0.35, 0.6, 1],
      ease: 'easeInOut',
    },
  },
};

const contentVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { delay: 0.3, duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

export default function PageTransition({ children }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div key="page" style={{ position: 'relative' }}>
        {/* Sweep overlay */}
        <motion.div
          aria-hidden="true"
          variants={panelVariants}
          initial="initial"
          animate="animate"
          style={{
            position: 'fixed',
            inset: 0,
            background: FOREST,
            zIndex: 1000,
            pointerEvents: 'none',
          }}
        />

        {/* Page content */}
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
