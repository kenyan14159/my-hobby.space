"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, AlertTriangle } from "lucide-react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-sky-800 text-center">
            掲示板利用規約
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 px-2">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-sky-800 border-b-2 border-sky-600 pb-2">
              基本的な投稿ルール
            </h2>
            
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-700">投稿前にお読みください</h3>
              <ul className="space-y-2 list-disc list-inside text-gray-700 pl-2">
                <li>投稿内容は全て投稿者の責任となります</li>
                <li>匿名での投稿であっても法的責任は投稿者本人に帰属します</li>
                <li>他の利用者に配慮した建設的な議論を心がけてください</li>
                <li>選手を応援する内容を投稿してください</li>
                <li>同一内容の連続投稿は控えてください</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-700">投稿できる内容</h3>
              <ul className="space-y-2 list-disc list-inside text-gray-700 pl-2">
                <li>選手への応援メッセージ</li>
                <li>建設的な意見交換・議論</li>
                <li>有益な情報共有</li>
                <li>適切な質問・相談</li>
                <li>駅伝に関連した体験談</li>
              </ul>
            </div>
          </section>

          <Separator className="my-6" />

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-sky-800 border-b-2 border-sky-600 pb-2">
              禁止事項
            </h2>
            <p className="text-gray-700">以下の投稿は削除対象となります</p>

            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-700">誹謗中傷・人格攻撃</h3>
                <ul className="space-y-2 list-disc list-inside text-gray-700 pl-2">
                  <li>特定個人・団体への悪口・中傷</li>
                  <li>人格を否定する表現</li>
                  <li>根拠のない悪評の流布</li>
                  <li>嫌がらせ目的の投稿</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-700">差別・偏見</h3>
                <ul className="space-y-2 list-disc list-inside text-gray-700 pl-2">
                  <li>人種・民族・国籍による差別表現</li>
                  <li>性別・性的指向による差別</li>
                  <li>宗教・思想信条への偏見的発言</li>
                  <li>身体的特徴を揶揄する表現</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-700">その他の禁止事項</h3>
                <ul className="space-y-2 list-disc list-inside text-gray-700 pl-2">
                  <li>違法行為の予告・示唆</li>
                  <li>個人情報の無断公開</li>
                  <li>商業目的の宣伝・広告</li>
                  <li>わいせつ・不適切な内容</li>
                  <li>荒らし行為・スパム投稿</li>
                </ul>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-sky-800 border-b-2 border-sky-600 pb-2">
              重要な注意事項
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-700">法的責任について</h3>
                <p className="text-gray-700">
                  匿名投稿であっても、違法な投稿については法的措置の対象となります。必要に応じて投稿者情報を関係機関に提供する場合があります。
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-700">個人情報の取り扱い</h3>
                <p className="text-gray-700">
                  他人の個人情報は絶対に投稿しないでください。自分の個人情報も安易に投稿しないよう注意してください。
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-700">通報・削除について</h3>
                <p className="text-gray-700">
                  不適切な投稿を発見した場合は通報機能をご利用ください。削除対象の投稿は管理者判断で予告なく削除されます。
                </p>
              </div>
            </div>
          </section>

          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              このルールに同意いただけない場合は、当掲示板のご利用をお控えください。
            </AlertDescription>
          </Alert>

          <Alert className="border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              ご不明な点がございましたら、
              <a 
                href="mailto:info@nssu-ekiden.com" 
                className="underline hover:no-underline font-medium ml-1"
              >
                info@nssu-ekiden.com
              </a>
              までご連絡ください。
            </AlertDescription>
          </Alert>

          <div className="text-center pt-4">
            <Button 
              onClick={onClose}
              className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-2"
            >
              掲示板に戻る
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 