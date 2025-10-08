"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Users, MapPin, Calendar, Clock, Flag, Target, Download, ChevronDown, ChevronUp, X } from 'lucide-react';
import { NewsDetailLayout, NewsSection, NewsHighlight } from '@/components/news-detail-layout';
import { Button } from '@/components/ui/button';

export default function HakoneQualifyingRosterPage() {
  const [expandedMember, setExpandedMember] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const members = [
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
      case "④": return "from-red-500 to-pink-600";
      case "③": return "from-blue-500 to-indigo-600";
      case "②": return "from-green-500 to-emerald-600";
      case "①": return "from-yellow-500 to-amber-600";
      default: return "from-gray-500 to-slate-600";
    }
  };

  const getYearBadgeColor = (year: string) => {
    switch (year) {
      case "④": return "bg-red-100 text-red-800 border-red-300";
      case "③": return "bg-blue-100 text-blue-800 border-blue-300";
      case "②": return "bg-green-100 text-green-800 border-green-300";
      case "①": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <NewsDetailLayout
      title="第102回東京箱根間往復大学駅伝競走予選会 エントリーメンバー発表"
      date="2025年10月6日"
    >
      {/* メインビジュアル・大会情報 */}
      <NewsHighlight theme="red" delay={0.2}>
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-red-900 mb-4">
            第102回 箱根駅伝予選会
          </h2>
          
          <div className="space-y-3 text-red-800">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="font-semibold text-lg">2025年10月18日（土）</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">08:30 スタート</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" />
              <span className="text-center">陸上自衛隊立川駐屯地～立川市街地～国営昭和記念公園</span>
            </div>
          </div>
        </div>
      </NewsHighlight>

      {/* チームの意気込み */}
      <NewsSection title="チームの決意" icon={Flag} theme="red" delay={0.4}>
        <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 md:p-8 rounded-xl border border-gray-200">
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p className="text-lg font-semibold text-gray-900">
              14名のエントリーメンバーから、当日は12名が出走します。
            </p>
            <p>
              私たちが掲げる目標は、<span className="font-bold text-red-600">箱根駅伝本戦でのシード権獲得</span>です。
              その目標を実現するため、まずはこの予選会で、部員一人ひとりが与えられた役割を全うし、
              チーム一丸となって全力で<span className="font-bold text-red-600">本戦の切符</span>を掴み取ります。
            </p>
            <p>
              夏合宿を経て、心技体すべてにおいて成長を遂げた選手たち。
              それぞれが積み重ねてきた練習の成果を、この舞台で存分に発揮します。
            </p>
            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="font-semibold text-red-900 text-center text-lg">
                本番では、選手たちの力になるよう、熱い応援をよろしくお願いいたします！
              </p>
            </div>
          </div>
        </div>
      </NewsSection>

      {/* エントリーメンバー */}
      <NewsSection title="エントリーメンバー14名" icon={Users} theme="red" delay={0.6}>
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-900 text-center font-medium">
            <Target className="w-5 h-5 inline mr-2" />
            当日は14名の中から12名が出走します
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* 名前と学年 */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-2xl drop-shadow-lg">
                      {member.year}年　{member.name}
                    </h3>
                    <p className="text-white/90 text-sm mt-1">出身: {member.school}</p>
                  </div>
                </div>

                {/* 選手情報 */}
                <div className="p-5">
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      学部/学科: {member.department}
                    </p>
                  </div>

                  {/* 自己ベスト */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">自己ベスト</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedMember(expandedMember === index ? null : index)}
                        className="text-xs"
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
                          {Object.entries(member.records).map(([event, time]) => (
                            <div
                              key={event}
                              className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg"
                            >
                              <span className="text-sm font-medium text-gray-700">{event}</span>
                              <span className="text-sm font-bold text-gray-900">{time}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {expandedMember !== index && (
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-gray-50 rounded-lg text-center">
                          <p className="text-xs text-gray-600">5000m</p>
                          <p className="text-sm font-bold text-gray-900">{member.records["5000m"]}</p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded-lg text-center">
                          <p className="text-xs text-gray-600">10000m</p>
                          <p className="text-sm font-bold text-gray-900">{member.records["10000m"]}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </NewsSection>


      {/* コースマップ */}
      <NewsSection title="コースガイドマップ" icon={MapPin} theme="red" delay={2.9}>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="text-center mb-4">
            <p className="text-gray-600">
              予選会のコース詳細は公式マップをご確認ください
            </p>
          </div>
          <div className="flex justify-center">
            <a
              href="https://nssu-ekiden.com/wp-content/uploads/2025/10/102hakone_coursemap.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              コースマップをダウンロード（PDF）
            </a>
          </div>
        </div>
      </NewsSection>

      {/* 応援メッセージ */}
      <NewsHighlight theme="red" delay={3.1}>
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-red-900">
            皆さまの応援が、選手たちの力になります
          </h3>
          <p className="text-red-800 leading-relaxed">
            夏合宿で培った力を、予選会という大舞台で存分に発揮できるよう、<br className="hidden md:block" />
            当日は熱いご声援をよろしくお願いいたします。<br />
            チーム一丸となって、必ず本戦出場の切符を手にします！
          </p>
          <div className="pt-4">
            <p className="text-red-900 font-bold text-lg">
              日本体育大学駅伝部
            </p>
          </div>
        </div>
      </NewsHighlight>

      {/* 画像ライトボックス */}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={selectedImage}
                  alt="選手画像"
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                  sizes="(max-width: 768px) 90vw, 1200px"
                />
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </NewsDetailLayout>
  );
}

