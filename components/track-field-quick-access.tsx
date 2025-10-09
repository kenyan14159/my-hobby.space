"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Newspaper, Trophy, Award, Users, UserPlus, Heart } from "lucide-react";

const quickAccessItems = [
  { 
    href: "/track-and-field/schedule", 
    label: "スケジュール", 
    icon: Calendar,
    color: "bg-blue-500 hover:bg-blue-600"
  },
  { 
    href: "/track-and-field/news", 
    label: "ニュース", 
    icon: Newspaper,
    color: "bg-green-500 hover:bg-green-600"
  },
  { 
    href: "/track-and-field/competition", 
    label: "日体大競技会", 
    icon: Trophy,
    color: "bg-purple-500 hover:bg-purple-600"
  },
  { 
    href: "/track-and-field/records", 
    label: "歴代記録", 
    icon: Award,
    color: "bg-amber-500 hover:bg-amber-600"
  },
  { 
    href: "/track-and-field/members", 
    label: "メンバー", 
    icon: Users,
    color: "bg-cyan-500 hover:bg-cyan-600"
  },
  { 
    href: "/track-and-field/recruitment", 
    label: "入部案内", 
    icon: UserPlus,
    color: "bg-indigo-500 hover:bg-indigo-600"
  },
  { 
    href: "/track-and-field/supporters", 
    label: "OB/OG", 
    icon: Heart,
    color: "bg-rose-500 hover:bg-rose-600"
  },
];

export function TrackFieldQuickAccess() {
  return (
    <div className="mb-10">
      <div className="flex flex-wrap gap-2 justify-center">
        {quickAccessItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={item.href}>
                <button
                  className={`${item.color} text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 shadow-sm hover:shadow-md`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </button>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
