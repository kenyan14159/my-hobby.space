"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Shield, 
  FileText, 
  Info, 
  Mail, 
  AlertCircle, 
  Heart, 
  Camera, 
  Users,
  ExternalLink,
  CheckCircle,
  Instagram
} from "lucide-react";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { InfoQuickAccess } from "@/components/info-quick-access";

// --- データ定義 ---
const privacyItems = [
  {
    title: "個人情報の収集と利用について",
    content: "当サイトでは、お問い合わせフォーム送信時にお客様の個人情報を収集し、サービス提供およびサポート、お問い合わせへの対応を目的として利用します。"
  },
  {
    title: "個人情報の保護について", 
    content: "お客様の個人情報保護のため、漏洩や不正アクセス防止に適切なセキュリティ対策を講じます。"
  }
];

const prohibitedActions = [
  "法令または公序良俗に違反する行為",
  "当サイトの運営を妨害する行為", 
  "他の利用者の個人情報を収集する行為",
  "不正アクセスを試みる行為"
];

const disclaimerItems = [
  {
    title: "免責事項",
    content: "当サイトは、提供する情報の正確性・完全性について保証しません。当サイトの利用により損害が生じた場合でも、一切責任を負いかねます。"
  },
  {
    title: "著作権について",
    content: "当サイトに掲載されているコンテンツ（テキスト、画像等）の無断使用はご遠慮ください。"
  }
];

const understandingItems = [
  "ホームページの更新が遅れる場合があります",
  "画像の無断使用は固くお断りいたします",
  "お問い合わせ先への迷惑行為はご遠慮ください",
  "パスワード保護されたコンテンツは、パスワードをお持ちの方のみ閲覧可能です"
];

// --- アニメーション設定 ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// --- メインページコンポーネント ---
export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-white via-sky-50/30 to-white min-h-screen py-16">
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto">
          {/* ページヘッダー */}
          <AnimatedPageHeader 
            title="ホームページについて"
            subtitle="当サイトの利用規約、プライバシーポリシー、運営方針について"
          />

          {/* クイックアクセスボタン */}
          <InfoQuickAccess />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* はじめに */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/80 border-sky-100 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-sky-50 to-sky-100/50">
                  <CardTitle className="flex items-center text-2xl text-sky-800">
                    <Info className="h-6 w-6 mr-3" />
                    はじめに
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      このホームページは、日本体育大学駅伝部を応援する皆様との繋がりを広げるため、また、より多くの方々からのご支援をいただけるよう願いを込めて、公式サイトの一つとして運営しております。
                    </p>
                    <div className="bg-sky-50 p-4 rounded-lg border-l-4 border-sky-400">
                      <p className="text-sm text-sky-800 font-medium">
                        管理：趣味で制作する現役駅伝部学生
                      </p>
                    </div>
                    <p>
                      活動状況により更新が不定期になる点、また、一人で運営しているため記録に誤り等が含まれる可能性がある点をご了承ください。誤りを発見された際や、コンテンツのご要望等ございましたら、お気軽にご連絡いただけますと幸いです。
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Camera className="h-4 w-4" />
                      <span>写真提供: saya (Instagram: ページ下部にリンク)</span>
                    </div>
                    <a 
                      href="https://www.instagram.com/saya_sports_films/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 transition-colors text-sm font-medium"
                    >
                      <Instagram className="h-4 w-4" />
                      https://www.instagram.com/saya_sports_films/
                    </a>
                    <p className="text-sky-700 font-medium">
                      皆様の応援が励みになりますので、ぜひSNSのフォローもよろしくお願いいたします。
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* プライバシーポリシー */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/80 border-sky-100 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50">
                  <CardTitle className="flex items-center text-2xl text-green-800">
                    <Shield className="h-6 w-6 mr-3" />
                    プライバシーポリシー
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    当サイトでは、お客様の個人情報を適切に取り扱うことをお約束します。
                  </p>
                  <div className="space-y-6">
                    {privacyItems.map((item, index) => (
                      <div key={index} className="border-l-4 border-green-400 pl-4">
                        <h4 className="font-semibold text-gray-800 mb-2">{index + 1}. {item.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 利用規約 */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/80 border-sky-100 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50">
                  <CardTitle className="flex items-center text-2xl text-blue-800">
                    <FileText className="h-6 w-6 mr-3" />
                    利用規約
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    この利用規約は、当サイトの利用条件を定めるものです。当サイトを利用することで、本規約に同意したものとみなされます。
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                        1. 禁止事項
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">当サイトの利用にあたり、以下の行為を禁止します。</p>
                      <ul className="space-y-2">
                        {prohibitedActions.map((action, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-red-400 mt-1">•</span>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {disclaimerItems.map((item, index) => (
                      <div key={index} className="border-l-4 border-blue-400 pl-4">
                        <h4 className="font-semibold text-gray-800 mb-2">{index + 2}. {item.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* ご理解とご協力のお願い */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/80 border-sky-100 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100/50">
                  <CardTitle className="flex items-center text-2xl text-orange-800">
                    <Heart className="h-6 w-6 mr-3" />
                    ご理解とご協力のお願い
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {understandingItems.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 日本体育大学長距離競技会について */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/80 border-sky-100 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-red-50 to-red-100/50">
                  <CardTitle className="flex items-center text-2xl text-red-800">
                    <AlertCircle className="h-6 w-6 mr-3" />
                    日本体育大学長距離競技会について
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p className="font-medium text-red-700">
                      日本体育大学長距離競技会に関してのお問い合わせ等は私は一切関わっていないので、以下の連絡先までお願いいたします。
                    </p>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <div className="flex items-center gap-2 text-red-800 mb-2">
                        <Mail className="h-4 w-4" />
                        <span className="font-medium">競技会に関するお問い合わせ:</span>
                      </div>
                      <a 
                        href="mailto:nittaidai-ekiden@outlook.jp" 
                        className="text-red-600 hover:text-red-800 transition-colors font-medium"
                      >
                        nittaidai-ekiden@outlook.jp
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* お問い合わせ */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/80 border-sky-100 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/50">
                  <CardTitle className="flex items-center text-2xl text-purple-800">
                    <Mail className="h-6 w-6 mr-3" />
                    お問い合わせ
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      ご意見・ご要望、プライバシーポリシーや利用規約に関するお問い合わせなど、当サイトに関するご連絡は下記までお願いいたします。
                    </p>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-2 text-purple-800 mb-2">
                        <Mail className="h-4 w-4" />
                        <span className="font-medium">制作者メールアドレス:</span>
                      </div>
                      <a 
                        href="mailto:nssuekiden@nssu-ekiden.com" 
                        className="text-purple-600 hover:text-purple-800 transition-colors font-medium flex items-center gap-1"
                      >
                        nssuekiden@nssu-ekiden.com
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>


          </motion.div>

          {/* 最終メッセージ */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 p-8 rounded-2xl border border-sky-200">
              <p className="text-lg text-sky-800 font-medium mb-2">
                今後とも変わらぬご支援、ご声援をよろしくお願い申し上げます。
              </p>
              <p className="text-sky-700 mb-4">
                箱根路を一緒に駆け抜ける日を、部員一同心待ちにしております。
              </p>
              <p className="text-xl font-bold text-sky-900">
                日本体育大学陸上競技部男子駅伝ブロック一同
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
