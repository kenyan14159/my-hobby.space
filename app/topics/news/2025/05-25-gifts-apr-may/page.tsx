"use client";

import React from 'react';
import { Gift, Heart } from 'lucide-react';
import { NewsDetailLayout, NewsSection, NewsHighlight } from '@/components/news-detail-layout';
import { ResponsiveTable } from '@/components/ui/responsive-table';

export default function GiftsAprMayPage() {
  const gifts = [
    { provider: "渡辺(晄月)、野村のご実家", gift: "お菓子" },
    { provider: "山本のご実家", gift: "お菓子" },
    { provider: "佐々木のご実家", gift: "お菓子" },
    { provider: "犬童のご実家", gift: "お菓子" },
    { provider: "OB杉本様", gift: "お菓子" },
    { provider: "矢島様", gift: "お菓子" },
    { provider: "水津のご実家", gift: "お菓子" },
    { provider: "OB伊藤様", gift: "差し入れ（富津合宿にて）" },
    { provider: "大宮のご実家", gift: "お米" },
    { provider: "渡辺和志のご実家", gift: "お菓子" },
    { provider: "夏見のご実家", gift: "お菓子" },
    { provider: "藤原想太のご実家", gift: "お菓子" },
    { provider: "鳥羽のご実家", gift: "お菓子" },
    { provider: "野手のご実家", gift: "お菓子" },
    { provider: "稗村のご実家", gift: "お菓子" },
    { provider: "島村のご実家", gift: "お菓子" },
    { provider: "國井のご実家", gift: "お米、ネギ" },
    { provider: "纓坂の祖母", gift: "梅干し" },
    { provider: "佐藤大和の叔父", gift: "お菓子" },
    { provider: "平木のご実家", gift: "ラスク" },
    { provider: "濵野のご実家", gift: "レモンケーキ" },
    { provider: "松田のご実家", gift: "うなぎパイ" },
    { provider: "市丸のご実家", gift: "うなぎパイ" },
    { provider: "OB藤本様", gift: "スポーツドリンク" },
    { provider: "黒宮のご実家", gift: "お菓子" },
    { provider: "荒井のご実家", gift: "お菓子" },
    { provider: "今野のご実家", gift: "お米" },
    { provider: "勝又のご実家", gift: "お菓子" },
    { provider: "田島の祖父", gift: "筍" },
    { provider: "増田のご実家", gift: "inゼリー" },
    { provider: "小野のご実家", gift: "お菓子" },
    { provider: "佐藤（大和）のご実家", gift: "山菜のこごみ" },
    { provider: "小野木コーチのご実家", gift: "ズッキーニ" },
    { provider: "OB山口様", gift: "アミノバイタル" }
  ];

  const columns = [
    { key: 'provider', header: 'ご提供者' },
    { key: 'gift', header: '差し入れ' },
  ];

  return (
    <NewsDetailLayout
      title="4、5月の差し入れ"
      date="2025年5月25日"
    >
      {/* 感謝メッセージ */}
      <NewsHighlight theme="blue" delay={0.2}>
        <div className="text-center">
          <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <p className="text-gray-700 leading-relaxed">
            日頃より、日本体育大学陸上競技部 男子駅伝ブロックへの温かいご声援、誠にありがとうございます。4・5 月にも多くのご支援を頂戴しました。心より御礼申し上げます。
          </p>
        </div>
      </NewsHighlight>

      {/* 差し入れ一覧セクション */}
      <NewsSection
        title="4・5月の差し入れ一覧"
        icon={Gift}
        theme="blue"
        delay={0.4}
      >
        <ResponsiveTable
          columns={columns}
          data={gifts}
          delay={0.5}
        />
      </NewsSection>

      {/* 合計と感謝 */}
      <NewsHighlight theme="green" delay={2.0}>
        <div className="text-center">
          <p className="text-green-800 font-semibold text-lg">
            合計 {gifts.length} 件のご支援をいただきました
          </p>
          <p className="text-green-700 mt-2">
            皆様の温かいご支援が、選手たちの大きな励みとなっております
          </p>
        </div>
      </NewsHighlight>
    </NewsDetailLayout>
  );
} 