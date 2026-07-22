'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxSection({
  children,
  bgImage,
  overlay = true,
  overlayColor = 'from-black/60 via-black/40 to-black/60',
  className = '',
  gradientDirection = 'to-b',
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.6, 1, 1, 0.6]);
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      {bgImage && (
        <motion.div className="absolute inset-0" style={{ scale, y }}>
          <img
            src={bgImage}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
      )}
      {overlay && bgImage && (
        <div className={`absolute inset-0 bg-gradient-${gradientDirection} ${overlayColor}`} />
      )}
      <motion.div className="relative z-10 h-full" style={{ opacity }}>
        {children}
      </motion.div>
    </section>
  );
}
