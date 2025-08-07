"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface NewsPageLayoutProps {
  children: ReactNode;
}

export function NewsPageLayout({ children }: NewsPageLayoutProps) {
  return (
    <div className="bg-gradient-to-br from-white to-sky-50 min-h-screen py-16">
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default NewsPageLayout; 