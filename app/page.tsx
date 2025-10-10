"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Hero } from "@/components/hero";
import { LatestArticles } from "@/components/latest-articles";
import { Skeleton } from "@/components/ui/skeleton";
import { TeamHighlights } from "@/components/team-highlights";
import { UpcomingEvents } from "@/components/upcoming-events";
import { SupportMessages } from "@/components/support-messages";

// Heavy Client Components を動的インポートし、ロード中は Skeleton を表示
const LatestNews = dynamic(() => import("@/components/latest-news").then(mod => mod.LatestNews), {
  ssr: false,
  loading: () => <Skeleton className="h-[600px] w-full" />
});

const PhotoGallery = dynamic(() => import("@/components/photo-gallery").then(mod => mod.PhotoGallery), {
  ssr: false,
  loading: () => <Skeleton className="h-[600px] w-full" />
});

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />
        <LatestArticles />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <LatestNews />
          <SupportMessages />
          <PhotoGallery />
          <TeamHighlights />
          <UpcomingEvents />
        </motion.div>
      </main>
    </div>
  );
}