"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Users, MapPin, Calendar, Clock, Flag, Target, Download, ChevronDown, ChevronUp, X, Trophy } from 'lucide-react';
import { NewsDetailLayout, NewsSection, NewsHighlight } from '@/components/news-detail-layout';
import { Button } from '@/components/ui/button';

export default function AllJapanEntryPage() {
  const [expandedMember, setExpandedMember] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const members = [
    {
      name: "犬童 慧真",
      nameReading: "いんどう けいま",
      year: "④",
      school: "熊本工業",
      department: "体育/体育",
      records: {
        "1500m": "3'54\"19",
        "5000m": "14'27\"78",
        "10000m": "29'31\"00",
        "ハーフマラソン": "1:05'33"
      },
      image: "https://nssu-ekiden.com/wp-content/uploads/2025/05/2025-menbers2.jpeg"
    },
    {
      name: "浦上 和樹",
      year: "④",
      school: "九州学院",
      department: "スポーツマネジメント/スポーツライフマネジメント",
      records: {
        "1500m": "4'36\"84",
        "5000m": "14'16\"87",
        "10000m": "29'05\"97",
        "ハーフマラソン": "1:03'21"
      },
      image: "https://nssu-ekiden.com/wp-content/uploads/2025/05/2025-menbers54.jpeg"
    },
    {
      name: "大竹 雄大",
      year: "④",
      school: "日体大柏",
      department: "体育/健康",
      records: {
        "1500m": "4'07\"67",
        "5000m": "14'29\"14",
        "10000m": "29'44\"72",
        "ハーフマラソン": "1:05'47"
      },
      image: "https://nssu-ekiden.com/wp-content/uploads/2025/05/2025-menbers64.jpeg"
    },
    {
      name: "倉村 空",
      year: "④",
      school: "樟南高校",
      department: "体育/体育",
      records: {
        "1500m": "3'55\"45",
        "5000m": "14'28\"57",
        "10000m": "30'48\"95",
        "3000mSC": "9'22\"62",
        "ハーフマラソン": "1:05'45"
      },
      image: "https://nssu-ekiden.com/wp-content/uploads/2025/02/member35-e1748839633610.jpg"
    },
    {
      name: "田島 駿介",
      year: "④",
      school: "旭野高校",
      department: "体育/体育",
      records: {
        "1500m": "3'52\"33",
        "5000m": "13'46\"12",
        "10000m": "28'11\"41",
        "ハーフマラソン": "1:03'15"
      },
      image: "https://nssu-ekiden.com/wp-content/uploads/2025/05/2025-members1.jpeg"
    },
    {
      name: "平島 龍斗",
      year: "④",
      school: "相洋高校",
      department: "体育/体育",
      records: {
        "1500m": "3'55\"83",
        "5000m": "13'42\"85",
        "10000m": "28'20\"32",
        "ハーフマラソン": "1:03'47"
      },
      image: "https://nssu-ekiden.com/wp-content/uploads/2025/05/2025-menbers5.jpeg"
    },
    {
      name: "二村 昇太朗",
      year: "④",
      school: "仙台育英",
      department: "体育/体育",
      records: {
        "1500m": "3'57\"52",
        "5000m": "13'56\"57",
        "10000m": "29'03\"74",
        "ハーフマラソン": "1:05'51"
      },
      image: "https://nssu-ekiden.com/wp-content/uploads/2025/05/2025-menbers12.jpeg"
    },
    {
      name: "山崎 丞",
      year: "④",
      school: "中越高校",
      department: "体育/体育",
      records: {
        "1500m": "3'47\"75",
        "5000m": "13'52\"09",
        "10000m": "28'19\"33",
        "ハーフマラソン": "1:02'06"
      },
      image: "https://nssu-ekiden.com/wp-content/uploads/2025/05/2025-menbers53.jpeg"
    },
    {
      name: "天瀬 海斗",
      year: "③",
      school: "盛岡大附",
      department: "体育/体育",
      records: {
        "1500m": "3'58\"15",
        "5000m": "14'25\"74",
        "10000m": "29'32\"38",
        "3000mSC": "8'49\"23",
        "ハーフマラソン": "1:05'46"
      },
      image: "https://nssu-ekiden.com/wp-content/uploads/2025/05/2025-menbers59.jpeg"
    },
    {
      name: "佐藤 輝歩",
      nameReading: "さとう きらと",
      year: "③",
      school: "学法石川",
      department: "体育/体育",
      records: {
        "1500m": "4'02\"29",
        "5000m": "14'26\"01",
        "10000m": "29'53\"29",
        "3000mSC": "9'07\"53"
      },
      image: "https://nssu-ekiden.com/wp-content/uploads/2025/05/2025-menbers25.jpeg"
    },
    {
      name: "吉田 黎大",
      year: "③",
      school: "埼玉栄",
      department: "体育/体育",
      records: {
        "1500m": "3'53\"86",
        "5000m": "14'15\"16",
        "10000m": "29'39\"34",
        "3000mSC": "9'12\"85",
        "ハーフマラソン": "1:04'11"
      },
      image: "https://nssu-ekiden.com/wp-content/uploads/2025/05/2025-menbers21.jpeg"
    },
    {
      name: "荻野 桂輔",
      year: "②",
      school: "白鴎足利",
      department: "体育/体育",
      records: {
        "1500m": "3'49\"10",
        "5000m": "14'28\"94",
        "3000mSC": "10'06\"84",
        "10000m": "30'41\"10"
      },
      image: "https://nssu-ekiden.com/wp-content/uploads/2025/05/2025-menbers3.jpeg"
    },
    {
      name: "佐藤 大和",
      year: "②",
      school: "十日町",
      department: "体育/体育",
      records: {
        "1500m": "4'01\"31",
        "5000m": "14'09\"99",
        "10000m": "29'24\"60",
        "3000mSC": "9'51\"96",
        "ハーフマラソン": "1:04:15"
      },
      image: "https://nssu-ekiden.com/wp-content/uploads/2025/05/2025-menbers44.jpeg"
    },
    {
      name: "樋村 銀河",
      year: "②",
      school: "荏田高校",
      department: "体育/体育",
      records: {
        "1500m": "3'51\"35",
        "5000m": "14'20\"82",
        "10000m": "29'39\"84",
        "ハーフマラソン": "1:07:15"
      },
      image: "https://nssu-ekiden.com/wp-content/uploads/2025/05/2025-menbers20.jpeg"
    },
    {
      name: "水津 勇人",
      year: "①",
      school: "高川学園",
      department: "体育/体育",
      records: {
        "1500m": "4'04\"14",
        "5000m": "14'32\"99",
        "10000m": "31'31\"81"
      },
      image: "https://nssu-ekiden.com/wp-content/uploads/2025/05/2025-menbers47.jpeg"
    },
    {
      name: "夏見 虹郎",
      year: "①",
      school: "小豆島中央",
      department: "体育/体育",
      records: {
        "1500m": "3'53\"78",
        "5000m": "14'15\"75",
        "10000m": "29'19\"91",
        "ハーフマラソン": "1:08'13"
      },
      image: "https://nssu-ekiden.com/wp-content/uploads/2025/05/2025-menbers42.jpeg"
    }
  ];

  const getYearColor = (year: string) => {
    switch (year) {
      case "④": return "from-purple-500 to-indigo-600";
      case "③": return "from-blue-500 to-cyan-600";
      case "②": return "from-green-500 to-teal-600";
      case "①": return "from-orange-500 to-amber-600";
      default: return "from-gray-500 to-slate-600";
    }
  };

  const getYearBadgeColor = (year: string) => {
    switch (year) {
      case "④": return "bg-purple-100 text-purple-800 border-purple-300";
      case "③": return "bg-blue-100 text-blue-800 border-blue-300";
      case "②": return "bg-green-100 text-green-800 border-green-300";
      case "①": return "bg-orange-100 text-orange-800 border-orange-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <NewsDetailLayout
      title="全日本大学駅伝エントリー決定！"
      date="2025年10月18日"
    >
      {/* メインビジュアル・大会情報 */}
      <NewsHighlight theme="blue" delay={0.2}>
        <div className="text-center space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-blue-900">
            秩父宮賜杯 第57回 全日本大学駅伝対校選手権大会
          </h2>
          
          <div className="space-y-2 text-sm sm:text-base text-blue-800">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>2025年11月2日（日）08:10 スタート</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="text-xs sm:text-sm">熱田神宮西門前（名古屋）〜伊勢神宮内宮宇治橋前（三重）</span>
            </div>
            <div>
              <span className="text-sm">全8区間 106.8km</span>
            </div>
          </div>
        </div>
      </NewsHighlight>

      {/* チームの意気込み */}
      <NewsSection title="チームの決意" icon={Flag} theme="blue" delay={0.4}>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed">
            <p>
              16名のエントリーメンバーから、レース当日に8名の選手を選出します。
            </p>
            <p>
              全日本大学駅伝は、「伊勢路を制する者が大学駅伝界を制す」と言われる、
              大学駅伝日本一を決定する権威ある大会です。
            </p>
            <p>
              私たちの目標は、<span className="font-bold text-blue-600">8位以内のシード権獲得</span>です。
              部員一人ひとりが役割を全うし、チーム一丸となって全力で挑みます。
            </p>
            <p>
              夏合宿を経て成長した選手たち。
              それぞれが積み重ねてきた練習の成果を、伊勢路の舞台で発揮します。
            </p>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-center text-blue-900 font-medium">
                本番は選手たちの力になるように応援をお願いします！
              </p>
            </div>
          </div>
        </div>
      </NewsSection>

      {/* 大会要項ダウンロード */}
      <div className="my-8 text-center">
        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
          <a href="https://nssu-ekiden.com/wp-content/uploads/2025/10/all-japan-57.pdf" target="_blank" rel="noopener noreferrer">
            <Download className="w-5 h-5 mr-2" />
            大会要項 (PDF)
          </a>
        </Button>
      </div>

      {/* エントリーメンバー */}
      <NewsSection title="エントリーメンバー16名" icon={Users} theme="blue" delay={0.6}>
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-900 text-center text-sm">
            <Target className="w-4 h-4 inline mr-1" />
            レース当日は16名の中から8名の選手を選出します
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.05 }}
              className="group"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200">
                {/* 選手画像 */}
                <div 
                  className="relative h-64 md:h-72 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(member.image)}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent`} />

                  {/* 学年バッジ */}
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full border-2 ${getYearBadgeColor(member.year)} font-bold shadow-lg`}>
                      {member.year}年
                    </div>
                  </div>

                  {/* 名前 */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl sm:text-2xl drop-shadow-lg">
                      {member.name}
                    </h3>
                    {member.nameReading && (
                      <p className="text-white/80 text-xs sm:text-sm mt-1">{member.nameReading}</p>
                    )}
                    <p className="text-white/90 text-xs sm:text-sm mt-1">出身: {member.school}</p>
                  </div>
                </div>

                {/* 選手情報 */}
                <div className="p-4 sm:p-5">
                  <div className="mb-4">
                    <p className="text-xs sm:text-sm text-gray-600">
                      学部/学科: {member.department}
                    </p>
                  </div>

                  {/* 自己ベスト */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium text-xs sm:text-sm">自己ベスト</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedMember(expandedMember === index ? null : index)}
                        className="text-xs hover:bg-blue-50"
                      >
                        {expandedMember === index ? (
                          <>詳細を閉じる <ChevronUp className="w-4 h-4 ml-1" /></>
                        ) : (
                          <>詳細を見る <ChevronDown className="w-4 h-4 ml-1" /></>
                        )}
                      </Button>
                    </div>

                    <AnimatePresence>
                      {expandedMember === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2 overflow-hidden"
                        >
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 rounded-lg border border-blue-100">
                            <div className="space-y-2">
                              {Object.entries(member.records).map(([event, record]) => (
                                <div key={event} className="flex justify-between items-center py-1 border-b border-blue-100 last:border-0">
                                  <span className="text-gray-600 font-medium text-xs sm:text-sm">{event}</span>
                                  <span className="font-mono font-bold text-blue-700 text-xs sm:text-sm ml-2">{record}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </NewsSection>

      {/* 応援メッセージ */}
      <NewsSection title="応援よろしくお願いします" icon={Flag} theme="blue" delay={1.0}>
        <div className="bg-blue-600 text-white p-6 rounded-lg text-center">
          <p className="text-base font-medium mb-3">
            選手たちの挑戦を、温かいご声援でお支えください
          </p>
          <p className="text-sm text-blue-100">
            全日本大学駅伝は11月2日（日）午前8時10分スタート<br />
            テレビ朝日系列で生中継されます
          </p>
        </div>
      </NewsSection>

      {/* 画像モーダル */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[90vh] w-full h-full"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </Button>
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage}
                  alt="選手写真"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </NewsDetailLayout>
  );
}
