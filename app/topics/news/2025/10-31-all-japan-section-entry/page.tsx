"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Users, MapPin, Calendar, X, Award } from 'lucide-react';
import { NewsDetailLayout } from '@/components/news-detail-layout';
import { Button } from '@/components/ui/button';

export default function AllJapanSectionEntryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 区間エントリーメンバー
  const sections = [
    {
      section: 1,
      distance: "9.5km",
      name: "荻野 桂輔",
      nameReading: "おぎの けいすけ",
      year: "2",
      school: "白鴎大足利",
      department: "体育/体育",
      records: {
        "1500m": "3'49\"10",
        "3000mSC": "10'06\"84",
        "5000m": "14'28\"94",
        "10000m": "30'40\"26",
        "ハーフマラソン": "1:03'56"
      },
      image: "https://nssu-ekiden.works/wp-content/uploads/2025/05/2025-menbers3.jpeg"
    },
    {
      section: 2,
      distance: "11.1km",
      name: "平島 龍斗",
      nameReading: "ひらしま りゅうと",
      year: "4",
      school: "相洋高校",
      department: "体育/体育",
      records: {
        "1500m": "3'55\"83",
        "5000m": "13'42\"84",
        "10000m": "28'20\"32",
        "ハーフマラソン": "1:01'02"
      },
      image: "https://nssu-ekiden.works/wp-content/uploads/2025/05/2025-menbers5.jpeg"
    },
    {
      section: 3,
      distance: "11.9km",
      name: "田島 駿介",
      nameReading: "たじま しゅんすけ",
      year: "4",
      school: "旭野高校",
      department: "体育/体育",
      records: {
        "1500m": "3'52\"33",
        "5000m": "13'46\"12",
        "10000m": "28'11\"41",
        "ハーフマラソン": "1:02'04"
      },
      image: "https://nssu-ekiden.works/wp-content/uploads/2025/05/2025-members1.jpeg"
    },
    {
      section: 4,
      distance: "11.8km",
      name: "二村 昇太朗",
      nameReading: "ふたむら しょうたろう",
      year: "4",
      school: "仙台育英",
      department: "体育/体育",
      records: {
        "1500m": "3'57\"52",
        "5000m": "13'56\"57",
        "10000m": "29'03\"74",
        "ハーフマラソン": "1:03'58"
      },
      image: "https://nssu-ekiden.works/wp-content/uploads/2025/05/2025-menbers12.jpeg"
    },
    {
      section: 5,
      distance: "12.4km",
      name: "吉田 黎大",
      nameReading: "よしだ れお",
      year: "3",
      school: "埼玉栄",
      department: "体育/体育",
      records: {
        "1500m": "3'53\"86",
        "3000mSC": "9'12\"85",
        "5000m": "14'15\"16",
        "10000m": "29'39\"34",
        "ハーフマラソン": "1:04'08"
      },
      image: "https://nssu-ekiden.works/wp-content/uploads/2025/05/2025-menbers21.jpeg"
    },
    {
      section: 6,
      distance: "12.8km",
      name: "大竹 雄大",
      nameReading: "おおたけ ゆうだい",
      year: "4",
      school: "日体大柏",
      department: "体育/健康",
      records: {
        "1500m": "4'07\"67",
        "5000m": "14'29\"14",
        "10000m": "29'44\"72",
        "ハーフマラソン": "1:05'47"
      },
      image: "https://nssu-ekiden.works/wp-content/uploads/2025/05/2025-menbers64.jpeg"
    },
    {
      section: 7,
      distance: "17.6km",
      name: "山崎 丞",
      nameReading: "やまざき たすく",
      year: "4",
      school: "中越高校",
      department: "体育/体育",
      records: {
        "1500m": "3'47\"75",
        "5000m": "13'52\"09",
        "10000m": "28'19\"33",
        "ハーフマラソン": "1:02'06"
      },
      image: "https://nssu-ekiden.works/wp-content/uploads/2025/05/2025-menbers53.jpeg"
    },
    {
      section: 8,
      distance: "19.7km",
      name: "佐藤 大和",
      nameReading: "さとう やまと",
      year: "2",
      school: "十日町",
      department: "体育/体育",
      records: {
        "1500m": "4'01\"31",
        "3000mSC": "9'51\"96",
        "5000m": "14'09\"99",
        "10000m": "29'24\"60",
        "ハーフマラソン": "1:03'44"
      },
      image: "https://nssu-ekiden.works/wp-content/uploads/2025/05/2025-menbers44.jpeg"
    }
  ];

  // 補欠メンバー
  const reserves = [
    {
      name: "水津 勇人",
      nameReading: "すいづ はやと",
      year: "1",
      school: "高川学園",
      department: "体育/体育",
      records: {
        "1500m": "4'04\"14",
        "5000m": "14'33\"00",
        "10000m": "31'31\"81",
        "ハーフマラソン": "1:04'36"
      },
      image: "https://nssu-ekiden.works/wp-content/uploads/2025/05/2025-menbers47.jpeg"
    },
    {
      name: "夏見 虹郎",
      nameReading: "なつみ にじろう",
      year: "1",
      school: "小豆島中央",
      department: "体育/体育",
      records: {
        "1500m": "3'53\"78",
        "5000m": "14'15\"80",
        "10000m": "29'19\"91",
        "ハーフマラソン": "1:04'17"
      },
      image: "https://nssu-ekiden.works/wp-content/uploads/2025/05/2025-menbers42.jpeg"
    },
    {
      name: "樋村 銀河",
      nameReading: "ひむら ぎんが",
      year: "2",
      school: "荏田高校",
      department: "体育/体育",
      records: {
        "1500m": "3'51\"35",
        "5000m": "14'23\"80",
        "10000m": "29'39\"84",
        "ハーフマラソン": "1:05'11"
      },
      image: "https://nssu-ekiden.works/wp-content/uploads/2025/05/2025-menbers20.jpeg"
    },
    {
      name: "天瀬 海斗",
      nameReading: "あませ かいと",
      year: "3",
      school: "盛岡大附",
      department: "体育/体育",
      records: {
        "1500m": "3'58\"15",
        "3000mSC": "8'49\"23",
        "5000m": "14'20\"26",
        "10000m": "29'32\"38",
        "ハーフマラソン": "1:05'46"
      },
      image: "https://nssu-ekiden.works/wp-content/uploads/2025/05/2025-menbers25.jpeg"
    },
    {
      name: "倉村 空",
      nameReading: "くらむら そら",
      year: "4",
      school: "樟南高校",
      department: "体育/体育",
      records: {
        "1500m": "3'55\"45",
        "3000mSC": "9'22\"62",
        "5000m": "14'28\"57",
        "10000m": "30'05\"62",
        "ハーフマラソン": "1:05'45"
      },
      image: "https://nssu-ekiden.works/wp-content/uploads/2025/02/member35-e1748839633610.jpg"
    }
  ];

  return (
    <NewsDetailLayout
      title="第57回全日本大学駅伝 区間エントリー決定!"
      date="2025年10月31日"
    >
      {/* 大会情報 */}
      <div className="mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            秩父宮賜杯 第57回 全日本大学駅伝対校選手権大会
          </h2>
          
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>2025年11月2日（日）08:10 スタート</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>熱田神宮西門前 〜 伊勢神宮内宮宇治橋前（全8区間 106.8km）</span>
            </div>
          </div>
        </div>
      </div>

      {/* チームの意気込み */}
      <div className="mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">意気込み</h3>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p>
              区間エントリーが決定しました。目標は<span className="font-bold text-gray-900">8位以内のシード権獲得</span>です。
            </p>
            <p>
              夏合宿、箱根駅伝予選会を経て成長した選手たち。各選手が自分の役割を果たし、チーム一丸となって襷を繋ぎます。
            </p>
            <p>
              なお、レース当日、区間配置された選手と補欠の間で3人まで入れ替えができます。
            </p>
            <p>
              応援よろしくお願いします。
            </p>
          </div>
        </div>
      </div>

      {/* 目標 */}
      <div className="mb-8">
        <div className="bg-gray-900 text-white p-5 rounded-lg text-center">
          <p className="text-sm mb-1">チーム目標</p>
          <p className="text-xl font-bold">8位以内シード権獲得</p>
        </div>
      </div>

      {/* 区間エントリー */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5" />
          区間エントリー
        </h3>

        <div className="space-y-4">
          {sections.map((member, index) => (
            <motion.div
              key={member.section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="grid md:grid-cols-[200px,1fr] gap-0">
                  {/* 選手画像 */}
                  <div 
                    className="relative h-48 md:h-auto overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(member.image)}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-bold text-base drop-shadow-md">
                        {member.name}
                      </p>
                      <p className="text-white/90 text-xs">{member.nameReading}</p>
                    </div>
                    <div className="absolute top-3 left-3">
                      <div className="px-3 py-1 rounded bg-gray-900/80 text-white text-sm font-bold">
                        {member.section}区
                      </div>
                    </div>
                  </div>

                  {/* 選手情報 */}
                  <div className="p-4">
                    <div className="mb-3">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-2xl font-bold text-gray-900">{member.section}区</span>
                        <span className="text-base text-gray-600">（{member.distance}）</span>
                        <span className="text-sm text-gray-500 ml-auto">{member.year}年</span>
                      </div>
                      <h4 className="text-base font-bold text-gray-900 mb-1">{member.name}</h4>
                      <p className="text-xs text-gray-600">
                        {member.school} / {member.department}
                      </p>
                    </div>

                    {/* 自己ベスト */}
                    <div>
                      <h5 className="text-xs font-semibold text-gray-700 mb-2">自己ベスト</h5>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200">
                        <div className="space-y-1">
                          {Object.entries(member.records).map(([event, record]) => (
                            <div key={event} className="flex justify-between items-center text-xs">
                              <span className="text-gray-600">{event}</span>
                              <span className="font-mono font-semibold text-gray-900">{record}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 補欠メンバー */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          補欠メンバー
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reserves.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
            >
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors">
                <div 
                  className="relative h-44 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(member.image)}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white font-bold text-sm drop-shadow-md">
                      {member.name} {member.year}年
                    </p>
                    <p className="text-white/90 text-xs">{member.nameReading}</p>
                  </div>
                </div>

                <div className="p-3">
                  <p className="text-xs text-gray-600 mb-2">{member.school} / {member.department}</p>
                  <div className="bg-gray-50 p-2 rounded border border-gray-200">
                    <p className="text-xs font-semibold text-gray-700 mb-1">自己ベスト</p>
                    <div className="space-y-0.5">
                      {Object.entries(member.records).map(([event, record]) => (
                        <div key={event} className="flex justify-between text-xs">
                          <span className="text-gray-600">{event}</span>
                          <span className="font-mono text-gray-900">{record}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 感謝のメッセージ */}
      <div className="mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">応援してくださる皆様へ</h3>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p>
              日頃より日本体育大学駅伝部を応援してくださり、誠にありがとうございます。
            </p>
            <p>
              皆様の温かいご声援が、選手たちの大きな力となっております。
              これまで積み重ねてきた練習の成果を、全日本大学駅伝という大舞台で発揮できるよう、
              選手・スタッフ一同、全力で準備を進めてまいりました。
            </p>
            <p>
              当日は、テレビの前、または沿道から、選手たちに熱いご声援をお願いいたします。
            </p>
            <p className="font-semibold text-gray-900">
              チーム一丸となって、8位以内のシード権獲得を目指して全力で戦います！
            </p>
          </div>
        </div>
      </div>

      {/* 放送情報 */}
      <div className="mb-8">
        <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 text-center">
          <p className="text-sm text-gray-700">
            11月2日（日）午前8時10分スタート / テレビ朝日系列で生中継
          </p>
        </div>
      </div>

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
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
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
