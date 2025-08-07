import { ReactNode } from 'react';

interface GiftItem {
  provider: string;
  gift: string;
}

interface EnhancedGiftDisplayProps {
  gifts: GiftItem[];
  title: string;
  description: string;
}

export function EnhancedGiftDisplay({ gifts, title, description }: EnhancedGiftDisplayProps) {
  const getGiftIcon = (gift: string) => {
    if (gift.includes('お菓子') || gift.includes('ケーキ')) {
      return (
        <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM10 4.414L15.586 9H4.414L10 4.414z"/>
        </svg>
      );
    }
    if (gift.includes('お米') || gift.includes('米')) {
      return (
        <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 3L8 5H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-3l-2-2z"/>
        </svg>
      );
    }
    if (gift.includes('ドリンク') || gift.includes('ゼリー') || gift.includes('オロナミン')) {
      return (
        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z"/>
        </svg>
      );
    }
    if (gift.includes('野菜') || gift.includes('ネギ') || gift.includes('ズッキーニ')) {
      return (
        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"/>
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
      </svg>
    );
  };

  return (
    <div className="my-8">
      {/* ヘッダーセクション */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-t-2xl border border-blue-100">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">{description}</p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-blue-600 bg-blue-100 px-4 py-2 rounded-full">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            合計 {gifts.length} 件のご支援
          </div>
        </div>
      </div>

      {/* テーブルセクション */}
      <div className="bg-white shadow-xl rounded-b-2xl border-x border-b border-blue-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700">
                <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    提供者
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                    差し入れ
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {gifts.map((gift, index) => (
                <tr
                  key={index}
                  className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="text-sm font-medium text-gray-900 group-hover:text-blue-900 transition-colors duration-300">
                        {gift.provider}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getGiftIcon(gift.gift)}
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                        {gift.gift}
                      </span>
                      <svg className="w-3 h-3 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* フッターセクション */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-t border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-lg font-medium text-gray-800 mb-2">
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              心より感謝申し上げます
            </div>
            <p className="text-sm text-gray-600">
              皆様の温かいお気持ちが、部員たちの日々の練習と成長の糧となっております
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// MDX用のコンポーネントマッピング
export const enhancedMdxComponents = {
  table: ({ children }: { children: ReactNode }) => {
    // テーブル内容を解析して EnhancedGiftDisplay に渡す
    // この例では、シンプルなテーブルコンポーネントを返す
    return (
      <div className="my-8">
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border-collapse bg-white">
            {children}
          </table>
        </div>
      </div>
    );
  },
  thead: ({ children }: { children: ReactNode }) => (
    <thead className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700">
      {children}
    </thead>
  ),
  tbody: ({ children }: { children: ReactNode }) => (
    <tbody className="divide-y divide-gray-100">{children}</tbody>
  ),
  tr: ({ children }: { children: ReactNode }) => (
    <tr className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group">
      {children}
    </tr>
  ),
  th: ({ children }: { children: ReactNode }) => (
    <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider border-0">
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
        {children}
      </div>
    </th>
  ),
  td: ({ children }: { children: ReactNode }) => (
    <td className="px-6 py-4 text-sm text-gray-900 border-0 group-hover:text-blue-900 transition-colors duration-300">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {children}
        <svg className="w-3 h-3 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
      </div>
    </td>
  ),
}; 