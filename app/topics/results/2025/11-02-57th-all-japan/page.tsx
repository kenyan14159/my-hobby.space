'use client';

import React from 'react';
import { Medal } from 'lucide-react';
import { ResponsiveTable, SectionHeader, ResultCard, ResultPageLayout } from '@/components/results';
import { PhotoGallery } from '@/components/photo-gallery';

export default function AllJapanUniversityEkidenResult2025() {
  // ギャラリー画像
  const galleryImages: string[] = [
    'https://nssu-ekiden.com/wp-content/uploads/2025/11/2025-all-japan-favorite1.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/11/2025-all-japan-favorite2.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/11/2025-all-japan-favorite3.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/11/2025-all-japan-favorite4.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/11/2025-all-japan-favorite5.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/11/2025-all-japan-favorite6.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/11/2025-all-japan-favorite7.jpeg',
    'https://nssu-ekiden.com/wp-content/uploads/2025/11/2025-all-japan-favorite8.jpeg',
  ];

  // 区間成績
  const sectionColumns = [
    { key: 'section', header: '区間' },
    { key: 'name', header: '選手名' },
    { key: 'time', header: '区間タイム' },
    { key: 'rank', header: '区間順位' },
    { key: 'note', header: '備考' },
  ];

  const sectionResults = [
    { section: '1区 (9.5km)', name: '荻野 桂輔②', time: "27'22\"", rank: '5位', note: '日体大記録' },
    { section: '2区 (11.1km)', name: '平島 龍斗④', time: "31'25\"", rank: '7位', note: '日体大記録' },
    { section: '3区 (11.9km)', name: '田島 駿介④', time: "33'44\"", rank: '5位タイ', note: '日体大記録' },
    { section: '4区 (11.8km)', name: '二村 昇太朗④', time: "35'32\"", rank: '12位', note: '' },
    { section: '5区 (12.4km)', name: '吉田 黎大③', time: "36'51\"", rank: '8位', note: '日体大記録' },
    { section: '6区 (12.8km)', name: '大竹 雄大④', time: "38'59\"", rank: '14位', note: '' },
    { section: '7区 (17.6km)', name: '山崎 丞④', time: "52'03\"", rank: '7位タイ', note: '日体大記録' },
    { section: '8区 (19.7km)', name: '佐藤 大和②', time: "59'55\"", rank: '16位', note: '' },
  ];



  return (
    <ResultPageLayout
      title="秩父宮賜杯第57回全日本大学駅伝対校選手権大会"
      date="2025年11月2日"
      place="名古屋市熱田神宮西門前 - 三重県伊勢市伊勢神宮内宮宇治橋前"
      gradient="from-gray-50 to-gray-100"
    >
      {/* ギャラリー */}
      <PhotoGallery 
        images={galleryImages} 
        showTitle={true}
        enableShuffle={false}
        maxImages={8}
        title="ギャラリー"
      />

      {/* 総合結果 */}
      <ResultCard delay={0.2}>
        <div className="text-center mb-8 pb-6 border-b border-gray-200">
          <div className="text-4xl font-bold text-gray-900 mb-2">総合11位</div>
          <div className="text-2xl text-gray-700">5時間15分51秒</div>
          <div className="text-sm text-gray-500 mt-2">8区間 106.8km</div>
        </div>

        <div className="text-gray-700 leading-relaxed space-y-4">
          <p>
            たくさんのご声援ありがとうございました。
          </p>
          <p>
            目標であるシード権を獲得することはできませんでしたが、1区、2区、3区、5区、7区で日本体育大学の区間記録を更新するなど、選手たちは熱田神宮から伊勢神宮までの伊勢路を懸命に襷を繋ぎました。
          </p>
          <p>
            この悔しさを忘れず、箱根駅伝ではシード権獲得できるよう練習に励んでまいります！
          </p>
          <p>
            引き続きご声援のほどよろしくお願いいたします。
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 leading-relaxed">
            秩父宮賜杯第57回全日本大学駅伝対校選手権大会の開催にあたり、ご尽力をいただきました関係者各位の皆様に心より感謝申し上げます。
          </p>
        </div>
      </ResultCard>

      {/* 日本体育大学 区間成績 */}
      <ResultCard delay={0.4}>
        <SectionHeader icon={<Medal size={20} />} title="区間成績" />
        <ResponsiveTable columns={sectionColumns} data={sectionResults} delay={0.6} />
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-700">区間記録更新：</span>
            1区、2区、3区、5区、7区で日本体育大学の区間記録を更新しました。
          </p>
        </div>
      </ResultCard>
    </ResultPageLayout>
  );
}
