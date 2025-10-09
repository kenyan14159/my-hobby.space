"use client";

import { motion } from "framer-motion";

interface AnimatedPageHeaderProps {
  title: string;
  subtitle?: string | Date;
  titleClassName?: string;
  subtitleClassName?: string;
  underlineColor?: string;
  underlineWidth?: string;
  largeSubtitle?: boolean;
}

export function AnimatedPageHeader({
  title,
  subtitle,
  titleClassName = "text-4xl md:text-5xl font-bold text-sky-900 mb-2 tracking-tight",
  subtitleClassName = "text-lg text-sky-700",
  underlineColor = "bg-sky-500",
  underlineWidth = "250px",
  largeSubtitle = false
}: AnimatedPageHeaderProps) {
  const defaultSubtitleClassName = largeSubtitle 
    ? "mt-6 text-2xl md:text-3xl font-semibold text-gray-700 max-w-2xl mx-auto"
    : subtitleClassName;
  
  const finalSubtitleClassName = subtitleClassName || defaultSubtitleClassName;

  return (
    <header className="mb-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.8,
            ease: [0.6, 0.05, 0.01, 0.9]
          }}
          className={titleClassName}
        >
          {title}
        </motion.h1>
        <motion.div 
          className={`h-1 ${underlineColor} mx-auto`}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: underlineWidth, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        />
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className={finalSubtitleClassName}
          >
            {subtitle instanceof Date ? subtitle.toLocaleDateString() : subtitle}
          </motion.p>
        )}
      </motion.div>
    </header>
  );
} 