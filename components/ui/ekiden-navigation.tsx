
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Trophy, Crown, Mountain, Users, Heart, Flame } from "lucide-react";

interface EkidenNavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  description: string;
}

const ekidenNavItems: EkidenNavItem[] = [
  {
    name: "箱根駅伝",
    href: "/ekiden/hakone",
    icon: Trophy,
    color: "text-blue-600",
    bgColor: "bg-blue-50 hover:bg-blue-100",
    description: "関東学連選抜"
  },
  {
    name: "全日本大学駅伝",
    href: "/ekiden/all-japan", 
    icon: Crown,
    color: "text-purple-600",
    bgColor: "bg-purple-50 hover:bg-purple-100",
    description: "大学三大駅伝"
  },
  {
    name: "出雲駅伝",
    href: "/ekiden/izumo",
    icon: Mountain,
    color: "text-green-600", 
    bgColor: "bg-green-50 hover:bg-green-100",
    description: "スピード駅伝"
  },
  {
    name: "杜の都駅伝",
    href: "/ekiden/womens-all-japan",
    icon: Heart,
    color: "text-pink-600",
    bgColor: "bg-pink-50 hover:bg-pink-100", 
    description: "女子駅伝"
  },
  {
    name: "富士山女子駅伝",
    href: "/ekiden/fujisan",
    icon: Flame,
    color: "text-orange-600", 
    bgColor: "bg-orange-50 hover:bg-orange-100",
    description: "富士山麓"
  },
  {
    name: "男女混合駅伝",
    href: "/ekiden/mixed",
    icon: Users,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 hover:bg-indigo-100",
    description: "男女混合"
  }
];

export function EkidenNavigation() {
  const pathname = usePathname();

  return (
    <div className="mb-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">駅伝成績一覧</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {ekidenNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative p-4 rounded-xl transition-all duration-200 text-center
                    ${isActive 
                      ? `${item.bgColor.replace('hover:', '')} ring-2 ring-offset-2 ring-opacity-50 ${item.color.replace('text-', 'ring-')}`
                      : `${item.bgColor} hover:shadow-md`
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
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