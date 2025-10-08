"use client";

import Link from "next/link";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

// カテゴリ定義
const categories = [
  { id: "sprint-men", label: "短距離男子", color: "bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100" },
  { id: "sprint-women", label: "短距離女子", color: "bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100" },
  { id: "middle-men", label: "中距離男子", color: "bg-sky-50 text-sky-900 border-sky-200 hover:bg-sky-100" },
  { id: "middle-women", label: "中距離女子", color: "bg-sky-50 text-sky-900 border-sky-200 hover:bg-sky-100" },
  { id: "ekiden-men", label: "駅伝男子", color: "bg-yellow-50 text-yellow-900 border-yellow-200 hover:bg-yellow-100" },
  { id: "ekiden-women", label: "駅伝女子", color: "bg-yellow-50 text-yellow-900 border-yellow-200 hover:bg-yellow-100" },
  { id: "jump-men", label: "跳躍男子", color: "bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100" },
  { id: "jump-women", label: "跳躍女子", color: "bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100" },
  { id: "throw-men", label: "投擲男子", color: "bg-orange-50 text-orange-900 border-orange-200 hover:bg-orange-100" },
  { id: "throw-women", label: "投擲女子", color: "bg-orange-50 text-orange-900 border-orange-200 hover:bg-orange-100" },
  { id: "combined-men", label: "混成男子", color: "bg-pink-50 text-pink-900 border-pink-200 hover:bg-pink-100" },
  { id: "combined-women", label: "混成女子", color: "bg-pink-50 text-pink-900 border-pink-200 hover:bg-pink-100" },
  { id: "para", label: "パラ", color: "bg-green-50 text-green-900 border-green-200 hover:bg-green-100" },
  { id: "trainer-men", label: "トレーナー男子", color: "bg-teal-50 text-teal-900 border-teal-200 hover:bg-teal-100" },
  { id: "trainer-women", label: "トレーナー女子", color: "bg-teal-50 text-teal-900 border-teal-200 hover:bg-teal-100" },
  { id: "staff", label: "本部スタッフ", color: "bg-gray-50 text-gray-900 border-gray-200 hover:bg-gray-100" },
];

export default function TrackFieldMembersPage() {
  return (
    <main className="max-w-7xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: "ホーム", href: "/" },
            { label: "陸上競技部", href: "/track-and-field" },
            { label: "メンバー・ブロック紹介" },
          ]}
        />
      </div>

      <AnimatedPageHeader title="陸上競技部メンバー・ブロック紹介" />

      <p className="text-gray-600 text-center mt-4 mb-8">
        各ブロックのメンバーを確認できます。下記からブロックを選択してください。
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/track-and-field/members/${cat.id}`}
            className={`${cat.color} block border font-semibold rounded-lg px-6 py-8 text-center transition-all shadow-sm hover:shadow-md`}
          >
            <div className="text-lg">{cat.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-xs text-gray-500 text-center">
        ※自己ベストは誤りがある可能性があります。
      </div>
    </main>
  );
}
