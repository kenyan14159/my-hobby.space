"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Megaphone, Gift, AlertCircle, Contact, PackageCheck, Archive } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { InfoQuickAccess } from "@/components/info-quick-access";

// --- データ定義 ---

const requests = [
  {
    icon: Contact,
    title: "メッセージカードへのご記入",
    description: "お名前とご連絡先をご記入いただけますと、感謝の気持ちをお伝えしやすくなります。"
  },
  {
    icon: PackageCheck,
    title: "差し入れの種類について",
    description: "常温で保存が可能で、練習後にすぐ食べられるものが大変ありがたいです。"
  },
  {
    icon: Archive,
    title: "大量の差し入れの場合",
    description: "事前にご連絡いただけますと、受け取りの準備がスムーズに行え大変助かります。"
  }
];

// --- コンポーネント定義 ---

// お願い項目のコンポーネント
const RequestItem = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 mt-1">
      <Icon className="h-6 w-6 text-sky-600" />
    </div>
    <div>
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

// --- メインページコンポーネント ---
export default function ForSupportersPage() {
  return (
    <div className="bg-gradient-to-b from-white to-sky-50 min-h-screen py-16">
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: 'チーム情報', href: '/information' }, { label: '応援してくださる皆様へ' }]} />
          </div>
          <AnimatedPageHeader 
            title="応援してくださる皆様へ"
            subtitle="日頃からの温かいご支援、心より感謝申し上げます。"
            titleClassName="text-5xl font-extrabold text-sky-900 mb-3 tracking-tight"
            subtitleClassName="text-lg text-gray-600"
            underlineWidth="300px"
          />

          {/* クイックアクセスボタン */}
          <InfoQuickAccess />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="mb-10 bg-white/80 border-sky-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-sky-800">
                  <Megaphone className="h-6 w-6 mr-3" />
                  ご挨拶
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  日頃より日本体育大学陸上競技部男子駅伝ブロックにご支援を賜り、心より感謝申し上げます。
                </p>
                <p>
                  今年度は「学生が主体となるチーム」をテーマに、4年生が中心となり活動しています。キャプテン・副キャプテンを中心に、日々「全員駅伝」をモットーに成長を続けています。
                </p>
                <p>
                  伝統校としての誇りを胸に、箱根駅伝での目標達成に向け、選手・スタッフ一丸となって邁進してまいります。皆様からの温かい応援は、選手にとって何よりの励みです。厳しい練習の中、皆様の応援が困難を乗り越える力となっています。
                </p>
                <p>
                  私たちの挑戦は始まったばかりです。今後も多くの試練があると思いますが、皆様と共に乗り越え、喜びを分かち合える日を心から願っています。
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/80 border-sky-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-sky-800">
                  <Gift className="h-6 w-6 mr-3" />
                  皆様へお願い
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  いつも温かい差し入れ、誠にありがとうございます。皆様のお心遣いが選手の大きな力となっています。差し入れをお送りいただく際は、下記にご協力いただけますと幸いです。
                </p>
                <div className="space-y-6">
                  {requests.map((req, index) => (
                    <RequestItem key={index} icon={req.icon} title={req.title} description={req.description} />
                  ))}
                </div>
                
                <Alert variant="destructive" className="mt-8 bg-red-50 border-red-200">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <AlertTitle className="text-red-800 font-bold">ご遠慮いただきたいもの</AlertTitle>
                  <AlertDescription className="text-red-700">
                    安全管理の観点から、生鮮食品や賞味期限の短いものはお受け取りが難しい場合がございます。何卒ご理解いただけますと幸いです。
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </motion.div>

          <div className="mt-12 text-right">
            <p className="text-gray-800 font-semibold">今後とも変わらぬご支援、ご声援をよろしくお願い申し上げます。</p>
            <p className="text-gray-800 font-semibold">箱根路を一緒に駆け抜ける日を、部員一同心待ちにしております。</p>
            <p className="mt-4 text-lg font-bold text-sky-900">日本体育大学陸上競技部男子駅伝ブロック一同</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}