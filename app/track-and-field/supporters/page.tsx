import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function TrackAndFieldSupportersPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-6">
        <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '陸上競技部', href: '/track-and-field' }, { label: 'OB・OGの皆様へ' }]} />
      </div>
      <AnimatedPageHeader
        title="OB・OGの皆様へ"
        subtitle="卒業生・関係者向けのご案内"
      />
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8 border-blue-100 bg-blue-50/60">
          <CardHeader>
            <CardTitle className="text-blue-900 text-xl font-bold mb-2">創部100周年記念のご挨拶</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-800">拝啓 日頃より、日本体育大学陸上競技部の活動に対し多大なるご厚情を賜り心より感謝申し上げます。</p>
            <p className="mb-4 text-gray-800">本陸上競技部は1925（大正14）年に創部され、2025年で100周年を迎えます。陸上競技部スタッフを中心に「創部100周年記念実行委員会」を組織し、記念誌の発行や記念行事の開催に向け準備を進めております。</p>
            <p className="mb-4 text-gray-800">一人でも多くのOB・OGの皆さまにご連絡させていただくため、アンケートを実施しております。ご回答・ご協力をよろしくお願いいたします。</p>
            <p className="mb-4 text-gray-800">2024年9月1日現在、1600の回答をいただいております。引き続きより多くのOB・OGの回答をお待ちしております。</p>
            <p className="mb-4 text-gray-800">敬具</p>
            <Separator className="my-6" />
            <div className="flex flex-col md:flex-row md:justify-between gap-4 text-sm text-blue-900">
              <div>
                <span className="font-semibold">委員長：</span>水野増彦（顧問/副学長）<br />
                <span className="font-semibold">副委員長：</span>神藤昭嘉（陸桜会会長）
              </div>
              <div>
                <span className="font-semibold">副委員長：</span>石井隆士（名誉顧問）<br />
                <span className="font-semibold">副委員長：</span>横山順一（部長/健康学科長）<br />
                <span className="font-semibold">副委員長：</span>小林史明（副部長兼監督）
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <Button size="lg" className="px-8 py-4 text-base font-bold" asChild>
                <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=i3L01H3hf0m3MTOfl0tkW1gm6oVvtFNGrsVKt8t47vBURUlFWTZXUVpZTlU2ODhVNksyQ0MwWVREMy4u" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  アンケートに回答する
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 