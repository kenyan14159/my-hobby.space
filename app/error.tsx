'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // エラーをログに記録（本番環境ではSentryなどに送信）
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="ja">
      <body className="bg-gray-50">
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            {/* エラーアイコン */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-10 w-10 text-red-600" aria-hidden="true" />
            </div>
            
            {/* タイトル */}
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              エラーが発生しました
            </h1>
            
            {/* メッセージ */}
            <p className="text-gray-600 mb-2">
              申し訳ございません。予期せぬエラーが発生しました。
            </p>
            <p className="text-sm text-gray-500 mb-8">
              しばらく時間をおいてから再度お試しください。
              <br />
              問題が解決しない場合は、お問い合わせください。
            </p>
            
            {/* エラーコード（開発用） */}
            {error.digest && (
              <p className="text-xs text-gray-400 mb-6 font-mono">
                エラーコード: {error.digest}
              </p>
            )}
            
            {/* アクションボタン */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => reset()}
                className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white"
              >
                <RefreshCw className="h-4 w-4" />
                再読み込み
              </Button>
              <Button 
                variant="outline"
                asChild
                className="inline-flex items-center justify-center gap-2"
              >
                <Link href="/">
                  <Home className="h-4 w-4" />
                  トップへ戻る
                </Link>
              </Button>
            </div>
            
            {/* 追加リンク */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link 
                href="/information/contact" 
                className="text-sm text-sky-600 hover:underline"
              >
                お問い合わせページへ →
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}


