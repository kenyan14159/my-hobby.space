import Link from 'next/link';
import { FileQuestion, Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* 404イラスト */}
        <div className="mb-8">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-sky-100">
            <FileQuestion className="h-12 w-12 text-sky-600" aria-hidden="true" />
          </div>
          <p className="text-7xl font-bold text-sky-600 mb-2">404</p>
        </div>
        
        {/* タイトルとメッセージ */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          ページが見つかりませんでした
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          お探しのページは移動または削除された可能性があります。
          <br className="hidden sm:block" />
          URLが正しいかご確認ください。
        </p>
        
        {/* アクションボタン */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Button 
            asChild
            className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              トップへ戻る
            </Link>
          </Button>
          <Button 
            variant="outline"
            asChild
            className="inline-flex items-center justify-center gap-2"
          >
            <Link href="/topics/news">
              <Search className="h-4 w-4" />
              ニュースを見る
            </Link>
          </Button>
        </div>
        
        {/* 人気のリンク */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            よくアクセスされるページ
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <li>
              <Link 
                href="/members" 
                className="block py-2 px-3 rounded-lg text-gray-700 hover:bg-white hover:text-sky-600 transition-colors"
              >
                メンバー紹介
              </Link>
            </li>
            <li>
              <Link 
                href="/ekiden/hakone" 
                className="block py-2 px-3 rounded-lg text-gray-700 hover:bg-white hover:text-sky-600 transition-colors"
              >
                箱根駅伝
              </Link>
            </li>
            <li>
              <Link 
                href="/topics/schedule" 
                className="block py-2 px-3 rounded-lg text-gray-700 hover:bg-white hover:text-sky-600 transition-colors"
              >
                スケジュール
              </Link>
            </li>
            <li>
              <Link 
                href="/records" 
                className="block py-2 px-3 rounded-lg text-gray-700 hover:bg-white hover:text-sky-600 transition-colors"
              >
                歴代記録
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}


