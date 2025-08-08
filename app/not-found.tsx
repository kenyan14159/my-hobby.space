import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24 text-center">
      <h1 className="text-4xl font-bold mb-4">ページが見つかりませんでした</h1>
      <p className="text-gray-600 mb-8">お探しのページは移動または削除された可能性があります。</p>
      <Link href="/" className="text-sky-700 underline">トップへ戻る</Link>
    </main>
  );
}


