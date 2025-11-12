import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BackToTop } from "@/components/ui/back-to-top";
import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";

// カテゴリ定義
const categories: Record<string, { label: string; color: string }> = {
  "sprint-men": { label: "短距離男子", color: "bg-blue-50 text-blue-900 border-blue-200" },
  "sprint-women": { label: "短距離女子", color: "bg-blue-50 text-blue-900 border-blue-200" },
  "middle-men": { label: "中距離男子", color: "bg-sky-50 text-sky-900 border-sky-200" },
  "middle-women": { label: "中距離女子", color: "bg-sky-50 text-sky-900 border-sky-200" },
  "ekiden-men": { label: "駅伝男子", color: "bg-yellow-50 text-yellow-900 border-yellow-200" },
  "ekiden-women": { label: "駅伝女子", color: "bg-yellow-50 text-yellow-900 border-yellow-200" },
  "jump-men": { label: "跳躍男子", color: "bg-purple-50 text-purple-900 border-purple-200" },
  "jump-women": { label: "跳躍女子", color: "bg-purple-50 text-purple-900 border-purple-200" },
  "throw-men": { label: "投擲男子", color: "bg-orange-50 text-orange-900 border-orange-200" },
  "throw-women": { label: "投擲女子", color: "bg-orange-50 text-orange-900 border-orange-200" },
  "combined-men": { label: "混成男子", color: "bg-pink-50 text-pink-900 border-pink-200" },
  "combined-women": { label: "混成女子", color: "bg-pink-50 text-pink-900 border-pink-200" },
  "para": { label: "パラ", color: "bg-green-50 text-green-900 border-green-200" },
  "trainer-men": { label: "トレーナー男子", color: "bg-teal-50 text-teal-900 border-teal-200" },
  "trainer-women": { label: "トレーナー女子", color: "bg-teal-50 text-teal-900 border-teal-200" },
  "staff": { label: "本部スタッフ", color: "bg-gray-50 text-gray-900 border-gray-200" },
};

interface Member {
  name: string;
  furigana: string;
  role: string;
  event: string;
  pb: string;
  school: string;
  from: string;
  "画像URL"?: string;
}

interface MembersData {
  [grade: string]: Member[];
}

// 静的エクスポート用のパスを生成
export function generateStaticParams() {
  return [
    { category: "sprint-men" },
    { category: "sprint-women" },
    { category: "middle-men" },
    { category: "middle-women" },
    { category: "ekiden-men" },
    { category: "ekiden-women" },
    { category: "jump-men" },
    { category: "jump-women" },
    { category: "throw-men" },
    { category: "throw-women" },
    { category: "combined-men" },
    { category: "combined-women" },
    { category: "para" },
    { category: "trainer-men" },
    { category: "trainer-women" },
    { category: "staff" },
  ];
}

export default async function CategoryMembersPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryInfo = categories[category];

  if (!categoryInfo) {
    return (
      <main className="max-w-7xl mx-auto py-10 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">カテゴリが見つかりません</h1>
        </div>
      </main>
    );
  }

  // サーバーサイドでJSONファイルを読み込む
  let membersData: MembersData | null = null;
  let error: string | null = null;

  try {
    const filePath = path.join(process.cwd(), "public", "data", "track-field-members", `${category}.json`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    membersData = JSON.parse(fileContent);
  } catch (err) {
    error = err instanceof Error ? err.message : "データの読み込みに失敗しました";
  }

  if (error || !membersData) {
    return (
      <main className="max-w-7xl mx-auto py-10 px-4">
        <div className="text-center">
          <p className="text-red-600">{error || "データが見つかりません"}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: "ホーム", href: "/" },
            { label: "陸上競技部", href: "/track-and-field" },
            { label: "メンバー・ブロック紹介", href: "/track-and-field/members" },
            { label: categoryInfo.label },
          ]}
        />
      </div>

      <AnimatedPageHeader title={categoryInfo.label} />

      {/* SEO用の選手名リスト（視覚的には隠す） */}
      <div className="sr-only">
        <h2>日本体育大学陸上競技部{categoryInfo.label}メンバー一覧</h2>
        <p>
          日本体育大学陸上競技部{categoryInfo.label}のメンバー紹介ページです。
          以下の選手のプロフィール、自己ベスト記録、出身校情報を掲載しています：
          {membersData && Object.entries(membersData).map(([grade, members]) => 
            members.map((member, index) => (
              <span key={`${grade}-${member.name}-${index}`}>
                {index > 0 || (grade !== Object.keys(membersData!)[0] && index === 0) ? '、' : ''}
                {member.name}
                {member.school && `（${member.school}出身）`}
                {member.event && member.event !== '-' && `（種目: ${member.event.replace(/<br>/g, '、')}）`}
              </span>
            ))
          )}
        </p>
      </div>

      {/* 他の種目へのナビゲーション */}
      <div className="mt-6 mb-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">他のブロックを見る</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(categories)
            .filter(([key]) => key !== category)
            .map(([key, cat]) => (
              <Link
                key={key}
                href={`/track-and-field/members/${key}`}
                className={`${cat.color} text-xs px-3 py-1.5 rounded-full border hover:shadow-md transition-all`}
              >
                {cat.label}
              </Link>
            ))}
        </div>
      </div>

      <div className="mt-8 space-y-12">
        {membersData &&
          Object.entries(membersData).map(([grade, members]) => (
            <div key={grade}>
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-gray-200">
                {grade}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {members.map((member, index) => (
                  <Card 
                    key={index} 
                    id={encodeURIComponent(member.name)}
                    className={`p-4 ${categoryInfo.color} border-2`}
                  >
                    <div className="space-y-3">
                      {/* 画像表示 */}
                      {member["画像URL"] && (
                        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-200 mb-3">
                          <Image
                            src={member["画像URL"]}
                            alt={member.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                        </div>
                      )}

                      <div>
                        <h3 className="text-lg font-bold">{member.name}</h3>
                        <p className="text-xs text-gray-600">{member.furigana}</p>
                      </div>

                      {member.role && member.role !== "-" && (
                        <Badge variant="secondary" className="text-xs">
                          {member.role}
                        </Badge>
                      )}

                      <div className="space-y-1.5 text-xs">
                        {member.event && member.event !== "-" && (
                          <div>
                            <span className="font-semibold text-gray-700">種目:</span>
                            <div
                              className="mt-0.5"
                              dangerouslySetInnerHTML={{ __html: member.event }}
                            />
                          </div>
                        )}

                        {member.pb && member.pb !== "-" && (
                          <div>
                            <span className="font-semibold text-gray-700">自己ベスト:</span>
                            <div
                              className="mt-0.5"
                              dangerouslySetInnerHTML={{ __html: member.pb }}
                            />
                          </div>
                        )}

                        <div>
                          <span className="font-semibold text-gray-700">出身校:</span>
                          <div className="mt-0.5">{member.school}</div>
                        </div>

                        {member.from && member.from !== "-" && (
                          <div>
                            <span className="font-semibold text-gray-700">出身:</span>
                            <div className="mt-0.5">{member.from}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
      </div>

      <div className="mt-12 text-xs text-gray-500 text-center">
        ※種目、自己ベスト、出身校、出身などの情報に誤りがある可能性があります。
      </div>

      {/* 下部の他のブロックを見るセクション */}
      <section className="mt-12 mb-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">他のブロックを見る</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {Object.entries(categories)
            .filter(([key]) => key !== category)
            .map(([key, cat]) => (
              <Link
                key={`bottom-${key}`}
                href={`/track-and-field/members/${key}`}
                className={`${cat.color} text-xs px-3 py-1.5 rounded-full border hover:shadow-md transition-all`}
              >
                {cat.label}
              </Link>
            ))}
        </div>
      </section>

      <BackToTop />
    </main>
  );
}
