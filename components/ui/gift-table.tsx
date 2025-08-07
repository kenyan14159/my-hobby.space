import { ReactNode } from 'react';

interface GiftTableProps {
  children: ReactNode;
}

export function GiftTable({ children }: GiftTableProps) {
  return (
    <div className="my-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-t-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            心温まるご支援をいただきました
          </h3>
        </div>
        <p className="text-gray-600 text-sm">
          部員一同、心より感謝申し上げます。皆様の温かいお気持ちが、日々の練習の励みとなっています。
        </p>
      </div>
      
      <div className="overflow-x-auto shadow-lg">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider border-0">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  提供者
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider border-0">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                  差し入れ
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {children}
          </tbody>
        </table>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-b-lg border-t">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          ありがとうございました
        </div>
      </div>
    </div>
  );
}

export function GiftTableRow({ provider, gift }: { provider: string; gift: string }) {
  return (
    <tr className="hover:bg-blue-50 transition-colors duration-200 group">
      <td className="px-6 py-4 text-sm font-medium text-gray-900 border-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          {provider}
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-700 border-0">
        <span className="inline-flex items-center gap-1">
          {gift}
          <svg className="w-3 h-3 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg>
        </span>
      </td>
    </tr>
  );
} 