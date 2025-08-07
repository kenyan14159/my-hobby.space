"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, MapPin } from "lucide-react";


const events = [
  {
    date: "2025.10.04～05",
    title: "第323回日本体育大学長距離競技会・第17回NCG",
    location: "健志台キャンパス",
  },
  {
    date: "2025.10.18",
    title: "第102回東京箱根間往復大学駅伝競走予選会",
    location: "陸上自衛隊立川駐屯地～立川市街地～国営昭和記念公園",
  },
  {
    date: "2025.11.02",
    title: "第57回全日本大学駅伝対校選手権大会",
    location: "愛知・三重",
  },
];

export function UpcomingEvents() {
  return (
    <section className="py-8 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center mb-4 sm:mb-8 border-b border-gray-200 pb-2">
            <CalendarDays className="h-5 w-5 sm:h-7 sm:w-7 mr-2 sm:mr-3 text-sky-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">今後の試合予定</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >

                <Card className="overflow-hidden border-gray-100 hover:shadow-md transition-shadow bg-white h-full">
                  <div className="h-1.5 bg-sky-200" />
                  <CardHeader className="pb-2 p-3 sm:p-6">
                    <div className="mb-1">
                      <p className="text-gray-800 font-medium text-sm sm:text-base">{event.date}</p>
                    </div>
                    <CardTitle className="text-base sm:text-lg text-gray-900 line-clamp-2">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 p-3 sm:p-6">
                    {event.location && (
                      <div className="flex items-start text-xs sm:text-sm text-gray-600 mt-1">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-1.5 mt-0.5 flex-shrink-0 text-sky-400" />
                        <p>{event.location}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}