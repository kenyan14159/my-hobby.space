"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarDays, ListOrdered, Newspaper } from "lucide-react";

interface TopicsNavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  description: string;
}

const topicsNavItems: TopicsNavItem[] = [
  {
    name: "スケジュール",
    href: "/topics/schedule",
    icon: CalendarDays,
    color: "text-sky-600",
    bgColor: "bg-sky-50 hover:bg-sky-100",
    description: "大会・イベントの日程",
  },
  {
    name: "リザルト",
    href: "/topics/results",
    icon: ListOrdered,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 hover:bg-emerald-100",
    description: "大会結果",
  },
  {
    name: "ニュース",
    href: "/topics/news",
    icon: Newspaper,
    color: "text-orange-600",
    bgColor: "bg-orange-50 hover:bg-orange-100",
    description: "最新ニュース",
  },
];

export function TopicsNavigation() {
  const pathname = usePathname();

  return (
    <div className="mb-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {topicsNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative p-4 rounded-xl transition-all duration-200 text-center
                    ${isActive
                      ? `${item.bgColor.replace("hover:", "")} ring-2 ring-offset-2 ring-opacity-50 ${item.color.replace("text-", "ring-")}`
                      : `${item.bgColor} hover:shadow-md`}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTopicsTab"
                      className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent rounded-xl"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="relative z-10">
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
                    <h4 className={`font-medium text-sm ${item.color} mb-1`}>{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
} 