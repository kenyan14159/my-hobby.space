"use client";

import { useState } from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InternalLinks } from "@/components/ui/internal-links";

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'join' | 'training' | 'support' | 'events';
}

const FAQ_DATA: FAQItem[] = [
  // 一般的な質問
  {
    category: 'general',
    question: '日本体育大学駅伝部の目標は何ですか？',
    answer: '日本体育大学駅伝部の最大の目標は箱根駅伝でのシード権獲得です。また、全日本大学駅伝、出雲駅伝の三大駅伝すべてで上位入賞を目指しています。選手一人ひとりが自己ベストを更新し、チーム一丸となって日本一を目指して日々トレーニングに励んでいます。'
  },
  {
    category: 'general',
    question: '日体大駅伝部の歴史を教えてください',
    answer: '日本体育大学駅伝部は長い歴史を持ち、数多くの名ランナーを輩出してきました。箱根駅伝には過去〇〇回出場し、最高順位は〇位を記録しています。近年は藤本拓馬監督のもと、チーム力強化に取り組んでいます。詳しくは「チームについて」ページをご覧ください。'
  },
  {
    category: 'general',
    question: '現在の部員数は何名ですか？',
    answer: '2025年現在、男子駅伝ブロックには約〇〇名の部員が所属しています。学年別では1年生から4年生までバランス良く在籍しており、切磋琢磨しながら日々練習に励んでいます。全部員のプロフィールは「メンバー一覧」ページで確認できます。'
  },
  
  // 入部に関する質問
  {
    category: 'join',
    question: '日体大駅伝部に入部するにはどうすればいいですか？',
    answer: '日体大駅伝部への入部を希望される方は、まず日本体育大学への入学が必要です。入学後、陸上競技部男子駅伝ブロックへの入部手続きを行います。高校時代の陸上競技実績や、入部テストでの記録が考慮されます。詳しくは大学の入試課または陸上競技部にお問い合わせください。'
  },
  {
    category: 'join',
    question: '入部に必要な記録の基準はありますか？',
    answer: '明確な基準タイムは公表していませんが、高校時代に県大会以上の実績がある選手、または5000mで15分台前半、10000mで31分台などの記録を持つ選手を中心に募集しています。ただし、記録だけでなく、伸びしろやチームへの貢献意欲も重視しています。'
  },
  {
    category: 'join',
    question: '陸上未経験でも入部できますか？',
    answer: '駅伝ブロックは基本的に陸上競技経験者を対象としています。ただし、他のスポーツで優れた持久力を持つ方や、強い意志を持って取り組める方は、監督・コーチと相談の上、入部が認められる場合もあります。まずはお問い合わせください。'
  },
  
  // 練習に関する質問
  {
    category: 'training',
    question: '普段の練習メニューはどのようなものですか？',
    answer: '平日は朝練（ジョギング）と午後練（ポイント練習）の2部練習が基本です。ポイント練習ではインターバル走、ペース走、LSD（Long Slow Distance）、坂道トレーニングなど、目的に応じたメニューを実施します。週末は距離走やレースペース走を中心に行います。'
  },
  {
    category: 'training',
    question: '夏合宿はどこで行いますか？',
    answer: '夏合宿は主に長野県の野尻湖、菅平高原、富士見高原などの高地で実施します。標高1000m以上の環境でトレーニングすることで、心肺機能の向上と持久力アップを図ります。2025年は8月から9月にかけて、複数回の合宿を予定しています。'
  },
  {
    category: 'training',
    question: '学業との両立は可能ですか？',
    answer: 'はい、可能です。多くの部員が学業と競技の両立に成功しています。大学側も学生アスリートのサポート体制を整えており、授業の出席や課題提出については個別に相談できます。時間管理能力が求められますが、計画的に取り組めば両立できます。'
  },
  
  // 応援・サポートに関する質問
  {
    category: 'support',
    question: '試合の観戦はできますか？',
    answer: 'はい、多くの大会は一般観戦可能です。箱根駅伝は沿道での応援、全日本大学駅伝や出雲駅伝も指定エリアでの応援が可能です。トラック競技の大会もスタンドから観戦できます。最新の観戦情報は「大会スケジュール」ページでご確認ください。'
  },
  {
    category: 'support',
    question: 'サポーターになるにはどうすればいいですか？',
    answer: 'サポーター登録は公式サイトの「サポーター情報」ページから行えます。登録いただくと、限定コンテンツの閲覧、イベント優先案内、オリジナルグッズ購入などの特典があります。年会費は無料です。多くの方のご支援をお待ちしています。'
  },
  {
    category: 'support',
    question: '選手への差し入れは可能ですか？',
    answer: '温かいお気持ちは大変ありがたいのですが、食品や飲料の差し入れは衛生管理の観点からお控えいただいております。応援グッズや激励のメッセージは大変励みになりますので、ぜひお寄せください。詳しくは「お問い合わせ」ページからご連絡ください。'
  },
  
  // イベントに関する質問
  {
    category: 'events',
    question: '練習見学はできますか？',
    answer: '一般の方向けの練習見学会を不定期で開催しています。開催情報は公式サイトやSNSでお知らせします。個別の見学については、事前にお問い合わせいただければ、可能な範囲で対応いたします。'
  },
  {
    category: 'events',
    question: 'ファン感謝イベントはありますか？',
    answer: 'はい、年に数回、ファン感謝イベントを開催しています。選手との交流会、サイン会、ミニ講演会などを企画しています。イベント情報は公式サイトの「最新ニュース」で随時お知らせしますので、ぜひチェックしてください。'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'すべて', icon: '📋' },
  { id: 'general', label: '一般的な質問', icon: '❓' },
  { id: 'join', label: '入部について', icon: '🎓' },
  { id: 'training', label: '練習について', icon: '🏃' },
  { id: 'support', label: '応援・サポート', icon: '📣' },
  { id: 'events', label: 'イベント', icon: '🎉' }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  // 検索とカテゴリフィルタリング
  const filteredFAQ = FAQ_DATA.filter((item) => {
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  // FAQPage 構造化データ（SEO最適化）
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  return (
    <>
      {/* FAQPage 構造化データ */}
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-4 py-16">
          <Breadcrumbs
            items={[
              { label: 'ホーム', href: '/' },
              { label: 'インフォメーション', href: '/information' },
              { label: 'よくある質問', href: '/information/faq' }
            ]}
          />

          <AnimatedPageHeader
            title="よくある質問"
            subtitle="FAQ - 日体大駅伝部に関するよくある質問にお答えします"
          />

          {/* 検索バー */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="質問を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-base"
              />
            </div>
          </motion.div>

          {/* カテゴリフィルター */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 justify-center mb-12"
          >
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                  }
                `}
              >
                <span className="mr-1">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* FAQ リスト */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto space-y-4 mb-12"
          >
            {filteredFAQ.length === 0 ? (
              <Card className="p-12 text-center">
                <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">該当する質問が見つかりませんでした</p>
                <p className="text-sm text-gray-500 mt-2">
                  別のキーワードで検索するか、カテゴリを変更してください
                </p>
              </Card>
            ) : (
              filteredFAQ.map((item, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full p-6 text-left flex items-start gap-4 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mt-1">
                        Q
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1">
                          {item.question}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`flex-shrink-0 w-6 h-6 text-gray-400 transition-transform mt-1 ${
                          openItems.has(index) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openItems.has(index) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                              A
                            </div>
                            <p className="flex-1 text-gray-700 leading-relaxed whitespace-pre-line">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              ))
            )}
          </motion.div>

          {/* 内部リンク */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <InternalLinks
              currentCategory="topics"
              keywords={['メンバー', '記録', '試合', '応援']}
              maxLinks={6}
            />
          </motion.div>

          {/* お問い合わせCTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-2">
                  ここにない質問がありますか？
                </h3>
                <p className="text-blue-100 mb-6">
                  お気軽にお問い合わせください
                </p>
                <a
                  href="/information/contact"
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  お問い合わせフォームへ
                </a>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}
