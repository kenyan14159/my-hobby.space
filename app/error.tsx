'use client'

import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="ja">
      <body>
        <main className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">エラーが発生しました</h1>
          <p className="text-gray-600 mb-8">ご不便をおかけして申し訳ありません。時間をおいて再度お試しください。</p>
          <div className="flex gap-6 justify-center">
            <button onClick={() => reset()} className="text-sky-700 underline">再読み込み</button>
            <Link href="/" className="text-sky-700 underline">トップへ戻る</Link>
          </div>
        </main>
      </body>
    </html>
  )
}


