"use client";

import React, { useState } from 'react';
import { NewsDetailLayout } from '@/components/news-detail-layout';
import { Handshake, Star, Users, Trophy } from 'lucide-react';
import { ImageModal } from '@/components/bulletin-board/image-modal';
import Image from 'next/image';

export default function ArinaminSponsorPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const imageUrl = "https://nssu-ekiden.com/wp-content/uploads/2025/07/arinamin00001-scaled.jpg";

  return (
    <NewsDetailLayout
      title="日本体育大学陸上競技部男子駅伝ブロックがアリナミン製薬株式会社とスポンサー契約を締結"
      date="2025年7月23日"
    >
      {/* 上部画像＋キャプション */}
      <div className="mb-8">
        <div className="relative w-full h-[340px] rounded-xl shadow-md border cursor-pointer overflow-hidden">
          <Image
            src={imageUrl}
            alt="アリナミン製薬株式会社スポンサー契約締結式の様子"
            fill
            className="object-cover"
            onClick={() => setModalOpen(true)}
          />
        </div>
        <div className="text-xs text-gray-500 text-center mt-2">アリナミン製薬株式会社スポンサー契約締結式（2025年7月10日・日本体育大学健志台キャンパス）</div>
      </div>
      <ImageModal src={imageUrl} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="prose prose-neutral max-w-none text-gray-900">
        {/* 契約締結 */}
        <div className="flex items-center gap-2 mb-2">
          <Handshake className="w-6 h-6 text-blue-600" />
          <span className="font-bold text-lg text-blue-900">スポンサー契約締結</span>
        </div>
        <p>
          日本体育大学陸上競技部男子駅伝ブロックはこのたび、「アリナミン」シリーズで広く知られるアリナミン製薬株式会社とスポンサー契約を締結しました。2025年7月10日には、日本体育大学健志台キャンパスにて締結式を開催。今後は選手のユニフォーム胸部に「アリナミン」のロゴが掲出され、新たなパートナーとともに競技活動に取り組んでまいります。
        </p>
        <p>
          また本契約に伴い、アスリートの栄養補給をサポートするため、同社製品「アリナミンメディカルバランス」の支給も行われることとなりました。日々厳しいトレーニングに励む選手たちのコンディション維持に向け、製品面からのサポートが加わることで、さらなるパフォーマンス向上が期待されます。
        </p>
        {/* 会社紹介 */}
        <div className="flex items-center gap-2 mt-8 mb-2">
          <Star className="w-6 h-6 text-yellow-500" />
          <span className="font-bold text-lg text-yellow-800">アリナミン製薬株式会社について</span>
        </div>
        <p>
          アリナミン製薬株式会社は、ビタミンB1誘導体「フルスルチアミン」を主成分とする医薬品・指定医薬部外品「アリナミン」などを開発・製造・販売する製薬会社であり、「明日の元気を変えていく」をコーポレートメッセージに掲げ、長年にわたり日本の健康づくりに貢献してきました。近年はアスリートのコンディショニングや疲労軽減に特化した製品開発にも注力し、スポーツ分野においても厚い信頼を得ています。
        </p>
        {/* 締結式の様子 */}
        <div className="flex items-center gap-2 mt-8 mb-2">
          <Users className="w-6 h-6 text-purple-600" />
          <span className="font-bold text-lg text-purple-800">締結式の様子</span>
        </div>
        <p>
          締結式には、男子駅伝ブロックより玉城良二監督、浦上和樹主将（スポーツマネジメント学部4年）、黒葛原主務（体育学部4年）をはじめとする選手たちが出席。アリナミン製薬からは執行役員 経営管理本部長の塙貴弘氏、経営管理本部 経営企画部の野澤颯志氏が来学され、和やかな雰囲気の中で懇談が行われました。
        </p>
        {/* コメント */}
        <div className="mt-8">
          <div className="mb-2 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-bold text-base text-yellow-800">関係者コメント</span>
          </div>
          <div className="border-l-4 border-blue-200 pl-4 mb-4">
            <div className="font-bold text-blue-900 mb-1">塙貴弘氏（アリナミン製薬株式会社）</div>
            <p className="italic text-gray-700">
              「日々厳しい練習に取り組む学生アスリートの皆さんを支援できることを、心より嬉しく思います。アリナミンが培ってきた疲労回復の知見を活かし、選手の皆さんが最高のパフォーマンスを発揮できるよう、『アリナミンメディカルバランス』の支給も含めて、製品面でもしっかりとサポートしてまいります」
            </p>
          </div>
          <div className="border-l-4 border-blue-200 pl-4 mb-4">
            <div className="font-bold text-blue-900 mb-1">玉城良二監督</div>
            <p className="italic text-gray-700">
              「アリナミン製薬からのご支援は、選手たちにとって大きな励みとなります。コンディション管理の重要性を理解し、支援してくださる企業とパートナーシップを結べたことに心から感謝しています。箱根駅伝でのシード権獲得を目指し、全力で挑戦してまいります」
            </p>
          </div>
          <div className="border-l-4 border-blue-200 pl-4">
            <div className="font-bold text-blue-900 mb-1">浦上和樹主将</div>
            <p className="italic text-gray-700">
              「アリナミンといえば、疲労回復の代名詞として多くの方に親しまれているブランドです。そのロゴを胸に走ることは、選手一同にとって大きな誇りです。第102回東京箱根間往復大学駅伝競走予選会・本大会、そして秩父宮賜杯第57回全日本大学駅伝対校選手権大会において、アリナミン製薬の力強いサポートとともに、チーム一丸となって襷をつないでまいります」
            </p>
          </div>
        </div>
        {/* 今後の大会 */}
        <div className="flex items-center gap-2 mt-8 mb-2">
          <Trophy className="w-6 h-6 text-red-600" />
          <span className="font-bold text-lg text-red-700">今後の大会と応援</span>
        </div>
        <p>
          今後、日本体育大学陸上競技部男子駅伝ブロックは、主要大会においてアリナミン製薬とともに挑戦を続けます。皆さまの温かいご声援をよろしくお願いいたします。
        </p>
      </div>
    </NewsDetailLayout>
  );
} 