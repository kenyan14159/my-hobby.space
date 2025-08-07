"use client";

import React from 'react';
import { Users, GraduationCap, Star } from 'lucide-react';
import { NewsDetailLayout, NewsSection, NewsHighlight, NewsList } from '@/components/news-detail-layout';

export default function NewMembersPage() {
  const newMembers = [
    { title: "今野 健太", subtitle: "いまの けんた", description: "埼玉栄" },
    { title: "大宮 健治", subtitle: "おおみや けんじ", description: "酒田南" },
    { title: "小野 晴生", subtitle: "おの はるせ", description: "松山商業" },
    { title: "勝又 大介", subtitle: "かつまた だいすけ", description: "御殿場西" },
    { title: "佐々木 快斗", subtitle: "ささき かいと", description: "相可高校" },
    { title: "島村 真登", subtitle: "しまむら まなと", description: "小林高校" },
    { title: "水津 勇人", subtitle: "すいづ はやと", description: "高川学園" },
    { title: "只隈 昂大", subtitle: "ただくま こうだい", description: "大牟田" },
    { title: "鳥羽 恭平", subtitle: "とば きょうへい", description: "愛知高校" },
    { title: "夏見 虹郎", subtitle: "なつみ にじろう", description: "小豆島中央" },
    { title: "野手 駈", subtitle: "ので かける", description: "文星芸大" },
    { title: "野村 汰輝", subtitle: "のむら たいき", description: "秋田工業" },
    { title: "稗村 泰吾", subtitle: "ひえむら たいご", description: "相洋高校" },
    { title: "平木 仁", subtitle: "ひらき じん", description: "市船橋" },
    { title: "藤原 想太", subtitle: "ふじわら そうた", description: "青森山田" },
    { title: "増田 陸斗", subtitle: "ますだ りくと", description: "佐久長聖" },
    { title: "松田 進", subtitle: "まつだ しん", description: "東北高校" },
    { title: "村上 愛祈", subtitle: "むらかみ あいき", description: "東農大二" },
    { title: "山本 琉生", subtitle: "やまもと るい", description: "洛北高校" },
    { title: "渡辺 和志", subtitle: "わたなべ かずし", description: "水島工業" },
    { title: "渡邊 晄月", subtitle: "わたなべ みづき", description: "帝京安積" }
  ];

  return (
    <NewsDetailLayout
      title="男子駅伝ブロックに22名の新入生が入学しました！"
      date="2025年4月4日"
    >
      {/* 入学メッセージ */}
      <NewsHighlight theme="green" delay={0.2}>
        <div className="text-center">
          <GraduationCap className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <p className="text-gray-700 leading-relaxed">
            このたび、日本体育大学 陸上競技部 男子駅伝ブロックに <span className="font-bold text-green-800 text-xl">22名</span> の新入生が入学しました。入学式が無事に執り行われ、新たな大学生活がスタートしています。今後の活躍にご期待ください！
          </p>
        </div>
      </NewsHighlight>

      {/* 新入生一覧セクション */}
      <NewsSection
        title="2025年度新入生一覧"
        icon={Users}
        theme="green"
        delay={0.4}
      >
        <NewsList 
          items={newMembers}
          columns={3}
          delay={0.5}
        />
      </NewsSection>

      {/* 合計とメッセージ */}
      <NewsHighlight theme="blue" delay={2.0}>
        <div className="text-center">
          <p className="text-blue-800 font-semibold text-lg mb-2">
            合計 {newMembers.length} 名の新入生が加入
          </p>
          <p className="text-blue-700">
            新たな仲間とともに、さらなる高みを目指します
          </p>
        </div>
      </NewsHighlight>
    </NewsDetailLayout>
  );
} 