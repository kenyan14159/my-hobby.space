import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { TrackFieldQuickAccess } from "@/components/track-field-quick-access";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, FileText } from "lucide-react";

export default function TrackAndFieldSupportersPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '陸上競技部', href: '/track-and-field' }, { label: 'OB・OGの皆様へ' }]} />
      </div>
      
      <div className="text-center mb-6">
        <Badge className="mb-3 text-sm px-4 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          創部100周年記念
        </Badge>
      </div>
      
      <AnimatedPageHeader
        title="OB・OGの皆様へ"
        subtitle="For Our Alumni"
      />
      
      <TrackFieldQuickAccess />
      
      <div className="max-w-3xl mx-auto">
        {/* メインメッセージカード */}
        <Card className="mb-6 border border-blue-200 bg-blue-50/30">
          <CardContent className="py-6 px-6 space-y-3 text-sm text-gray-700">
            <p className="text-center font-semibold">拝啓</p>
            
            <p>日頃より、日本体育大学陸上競技部の活動に対し多大なるご厚情を賜り心より感謝申し上げます。</p>
            
            <p>
              本陸上競技部は1925（大正14）年に創部され、2025年で100周年を迎えます。
              そこで、陸上競技部のスタッフを中心に日本体育大学陸上競技部創部100周年記念実行委員会を組織し、
              記念誌の発行並びに記念行事の開催に向け準備を進めているところです。
            </p>
            
            <p>
              本委員会では一人でも多くのOB・OGの皆さまにご連絡させていただくためにアンケートを実施しております。
              添付のアンケートにご回答いただくとともに、ご連絡のつく同窓生などにもお知らせいただきますようお願いします。
            </p>
            
            <div className="bg-white p-4 rounded border border-orange-200 my-4">
              <p className="text-center font-semibold text-orange-800">
                記念パーティ：2026年3月7日（土）健志台キャンパスにて開催決定
              </p>
            </div>
            
            <p className="text-center text-green-700 font-medium">
              2025年4月7日現在、1,860件の回答をいただいております。<br />
              引き続きより多くのOB・OGの回答をお待ちしております。
            </p>
            
            <p className="text-right font-semibold">敬具</p>

            <Separator className="my-4" />
            
            {/* 委員会メンバー */}
            <div className="bg-white/50 p-4 rounded space-y-2 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>委員長：水野増彦（顧問/副学長）</div>
                <div>副委員長：神藤昭嘉（陸桜会会長）</div>
                <div>副委員長：石井隆士（名誉顧問）</div>
                <div>副委員長：横山順一（部長/健康学科長）</div>
                <div className="md:col-span-2">副委員長：小林史明（副部長兼監督）</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* アンケートボタン */}
        <Card className="mb-6 border border-green-200 bg-green-50/30">
          <CardContent className="py-6 text-center">
            <p className="text-sm text-gray-700 mb-4">
              創部100周年記念事業へのご協力をお願いいたします
            </p>
            <Button size="lg" className="px-6 py-3 bg-green-600 hover:bg-green-700" asChild>
              <a 
                href="https://forms.office.com/Pages/ResponsePage.aspx?id=i3L01H3hf0m3MTOfl0tkW1gm6oVvtFNGrsVKt8t47vBURUlFWTZXUVpZTlU2ODhVNksyQ0MwWVREMy4u" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                アンケートに回答する
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* 個人情報保護 */}
        <div className="text-center text-xs text-gray-500 space-y-2">
          <p>100周年記念行事に伴う個人情報は、記念事業の目的のみに使用し、適切に管理いたします。</p>
          <p>※記念誌の発行および記念パーティの詳細につきましては、追ってご連絡させていただきます。</p>
        </div>
      </div>
    </div>
  );
} 