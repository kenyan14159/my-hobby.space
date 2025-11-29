'use client';

import React from 'react';
import { Trophy, Clock } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';
import { PhotoGallery } from '@/components/photo-gallery';

export default function AgeoHalfResult2025() {
  // ギャラリー画像
  const galleryImages: string[] = [
    'https://nssu-ekiden.com/wp-content/uploads/2025/11/2025-ageo-favorite1.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/11/2025-ageo-favorite2.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/11/2025-ageo-favorite3.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/11/2025-ageo-favorite4.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/11/2025-ageo-favorite5.jpeg',
  ];

  const athletesData = [
    { name: '天瀬 海斗③', time: "1'03\"05", rank: '54', note: 'PB', isPB: true },
    { name: '伊藤 航④', time: "1'05\"24", rank: '191', note: '' },
    { name: '西坂 侑④', time: "1'05\"50", rank: '209', note: '' },
    { name: '倉村 空④', time: "1'07\"42", rank: '297', note: '' },
  ];

  const columns = [
    { key: 'name', header: '氏名' },
    { key: 'time', header: 'タイム' },
    { key: 'rank', header: '順位' },
    { key: 'note', header: '備考' },
  ];

  return (
    <ResultPageLayout
      title="第38回2025上尾シティハーフマラソン"
      date="2025年11月16日（日）"
      place="公道(川越上尾線)スタート・フィニッシュの上尾市内折り返しコース"
      gradient="from-gray-50 to-gray-100"
    >
      {/* フォトギャラリー */}
      <PhotoGallery 
        images={galleryImages} 
        showTitle={true}
        enableShuffle={false}
        maxImages={5}
        title="フォトギャラリー"
        subtitle="大会当日のスナップショット"
      />

        {/* ハーフマラソン結果 */}
        <ResultCard delay={0.4}>
          <SectionHeader icon={<Clock size={20} />} title="ハーフマラソン結果" />
          <ResponsiveTable columns={columns} data={athletesData} delay={0.6} />
        </ResultCard>

        {/* 凡例 */}
        <ResultCard delay={0.8}>
          <SectionHeader icon={<Trophy size={20} />} title="備考欄の説明" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">PB</span>
              <span className="text-sm text-gray-600">自己新記録</span>
            </div>
          </div>
        </ResultCard>
    </ResultPageLayout>
  );
}
