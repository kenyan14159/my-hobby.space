"use client";

import React from 'react';
import { Target, Users, Trophy, TrendingUp } from 'lucide-react';
import { NewsDetailLayout, NewsSection, NewsHighlight } from '@/components/news-detail-layout';

export default function NewSystemPage() {
  const leadership = [
    {
      title: "浦上 和樹",
      subtitle: "（熊本・九州学院）",
      description: "",
      badge: "主将"
    },
    {
      title: "犬童 慧真", 
      subtitle: "（熊本・熊本工業）",
      description: "",
      badge: "副主将"
    },
    {
      title: "黒葛原 佑真",
      subtitle: "（大阪・清風高校）", 
      description: "",
      badge: "主務"
    }
  ];

  return (
    <NewsDetailLayout
      title="2025年度の目標と新体制発表"
      date="2025年3月15日"
    >
      {/* 最大目標セクション */}
      <NewsSection 
        title="最大目標"
        icon={Target}
        theme="red"
        delay={0.2}
      >
        <NewsHighlight theme="red" delay={0.3}>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-red-800 mb-2">第102回箱根駅伝</h3>
            <p className="text-3xl font-bold text-red-900">10位以内</p>
            <p className="text-red-700 mt-2">を目指します。</p>
          </div>
        </NewsHighlight>
      </NewsSection>

      {/* パーソナルベスト更新目標セクション */}
      <NewsSection 
        title="パーソナルベスト更新目標"
        icon={TrendingUp}
        theme="green"
        delay={0.4}
      >
        <NewsHighlight theme="green" delay={0.5}>
          <p className="text-gray-700 mb-3">2025年度は</p>
          <div className="text-center bg-white rounded-lg p-4 shadow-sm">
            <span className="text-lg text-gray-600">パーソナルベスト (PB)</span>
            <div className="text-4xl font-bold text-green-800 my-2">115回更新</div>
            <span className="text-gray-600">を掲げ、更なる競技力向上に挑戦します。</span>
          </div>
        </NewsHighlight>
      </NewsSection>

      {/* チームスローガンセクション */}
      <NewsSection 
        title="チームスローガン"
        icon={Trophy}
        theme="purple"
        delay={0.6}
      >
        <NewsHighlight theme="purple" delay={0.7}>
          <div className="text-center">
            <blockquote className="text-4xl font-bold text-purple-900 mb-4">
              &ldquo;體進&rdquo;
            </blockquote>
            <p className="text-xl text-purple-700 font-medium">
              〜継承を力に越境を恐れず〜
            </p>
          </div>
        </NewsHighlight>
      </NewsSection>

      {/* 新幹部体制セクション */}
      <NewsSection
        title="新幹部体制"
        icon={Users}
        theme="blue"
        delay={0.8}
      >
        <div className="space-y-4">
          {leadership.map((member, index) => (
            <div 
              key={index}
              className={`flex items-center gap-4 p-6 rounded-xl border ${
                member.badge === '主将' ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200' :
                member.badge === '副主将' ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' :
                'bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200'
              }`}
            >
              <span className={`font-semibold px-4 py-2 rounded-full ${
                member.badge === '主将' ? 'text-blue-800 bg-blue-200' :
                member.badge === '副主将' ? 'text-green-800 bg-green-200' :
                'text-purple-800 bg-purple-200'
              }`}>
                {member.badge}
              </span>
              <div className="flex-1">
                <span className="text-lg font-bold text-gray-800">{member.title}</span>
                <span className="text-gray-600 ml-3">{member.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </NewsSection>
    </NewsDetailLayout>
  );
} 