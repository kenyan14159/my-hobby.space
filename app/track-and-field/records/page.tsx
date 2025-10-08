import Link from "next/link";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";

export default function TrackAndFieldRecordsPage() {
  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '陸上競技部', href: '/track-and-field' }, { label: '歴代記録' }]} />
      </div>
      <AnimatedPageHeader title="歴代記録" subtitle="歴代記録・ランキングを種目別に掲載" />
      
      {/* 統合記録ページへのリンク */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Link href="/track-and-field/records/data/men" className="block">
          <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <CardContent className="py-8 text-center">
              <h3 className="text-2xl font-bold text-blue-900 mb-2">男子 歴代記録</h3>
              <p className="text-blue-700">全種目の記録を一覧表示</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/track-and-field/records/data/women" className="block">
          <Card className="border-2 border-pink-300 bg-gradient-to-br from-pink-50 to-pink-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <CardContent className="py-8 text-center">
              <h3 className="text-2xl font-bold text-pink-900 mb-2">女子 歴代記録</h3>
              <p className="text-pink-700">全種目の記録を一覧表示</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </main>
  );
} 