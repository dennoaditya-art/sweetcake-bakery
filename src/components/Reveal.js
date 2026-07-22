'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

export default function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  y = 40,
  once = true,
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-50px' }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
