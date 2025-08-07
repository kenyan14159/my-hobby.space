"use client";

import React from 'react';
import { Gift, Heart } from 'lucide-react';
import { NewsDetailLayout, NewsSection, NewsHighlight } from '@/components/news-detail-layout';
import { ResponsiveTable } from '@/components/ui/responsive-table';

export default function GiftsFebMarPage() {
  const giftsData = [
    { provider: "住原のご実家", gift: "お菓子、キウイ" },
    { provider: "平島の親戚", gift: "里芋、さつまいも" },
    { provider: "山口のご実家", gift: "お茶、ボディメンテ" },
    { provider: "小嶋のご実家", gift: "お菓子" },
    { provider: "野田のご実家", gift: "はちみつチョコレート" },
    { provider: "栃木県保護者会様", gift: "カロリーメイト" },
    { provider: "伊藤様（治療関係者）", gift: "みかん" },
    { provider: "松本のご実家", gift: "鰹節" },
    { provider: "植松のご実家", gift: "豆乳、野菜" },
    { provider: "山下のご実家", gift: "お菓子" },
    { provider: "分須のご実家", gift: "スポーツドリンク" },
    { provider: "富永のご実家", gift: "お菓子" },
    { provider: "OB谷口浩美様", gift: "ボディメンテ" },
    { provider: "浦上のご実家", gift: "オロナミンC" },
    { provider: "OB米田様", gift: "お菓子" },
    { provider: "OB服部様", gift: "オイコス" },
    { provider: "匿名", gift: "オイコス、プロテインドリンク" },
    { provider: "OB小栁様", gift: "きんかん" },
    { provider: "OB漆畑様、佐藤様", gift: "オロナミンC" },
    { provider: "濵野のご実家", gift: "レモンケーキ" }
  ];

  const columns = [
    { key: 'provider', header: 'ご提供者' },
    { key: 'gift', header: '差し入れ' },
  ];

  return (
    <NewsDetailLayout
      title="2,3月の差し入れ"
      date="2025年3月30日"
    >
      {/* 感謝メッセージ */}
      <NewsHighlight theme="blue" delay={0.2}>
        <div className="text-center">
          <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            皆様からの温かいご支援、ありがとうございます！
          </h2>
        </div>
      </NewsHighlight>

      {/* メッセージセクション */}
      <NewsHighlight theme="gray" delay={0.4}>
        <p className="text-gray-700 leading-relaxed text-center">
          日頃より、日本体育大学陸上競技部 男子駅伝ブロックへのご声援、誠にありがとうございます。2・3 月に下記の方々よりたくさんの差し入れを頂戴いたしました。部員一同、大変美味しくいただき、日々の練習の励みにしております。心より感謝申し上げます。
        </p>
      </NewsHighlight>

      {/* 差し入れ一覧セクション */}
      <NewsSection 
        title="2・3月の差し入れ一覧"
        icon={Gift}
        theme="green"
        delay={0.6}
      >
        <ResponsiveTable 
          columns={columns} 
          data={giftsData} 
          delay={0.7}
        />
        
        {/* 合計と感謝 */}
        <NewsHighlight theme="green" delay={1.5}>
          <div className="text-center">
            <p className="text-green-800 font-semibold">
              合計 {giftsData.length} 件のご支援をいただきました
            </p>
            <p className="text-green-700 mt-1 text-sm">
              皆様の温かいご支援に心より感謝申し上げます
            </p>
          </div>
        </NewsHighlight>
      </NewsSection>
    </NewsDetailLayout>
  );
} 