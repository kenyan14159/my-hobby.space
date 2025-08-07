import { ReactNode } from 'react';

interface MemberItem {
  name: string;
  furigana: string;
  info: string;
}

interface MemberDisplayProps {
  members: MemberItem[];
  title: string;
  description: string;
}

export function MemberDisplay({ members, title, description }: MemberDisplayProps) {
  return (
    <div className="my-8">
      {/* ヘッダーセクション */}
      <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8 rounded-t-2xl border border-green-100">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">{description}</p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-green-600 bg-green-100 px-4 py-2 rounded-full">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            合計 {members.length} 名
          </div>
        </div>
      </div>

      {/* メンバーグリッド */}
      <div className="bg-white shadow-xl rounded-b-2xl border-x border-b border-green-100 overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg hover:border-green-300 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-500">{member.furigana}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                  {member.info}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* フッターセクション */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-t border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-lg font-medium text-gray-800 mb-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              今後の活躍にご期待ください
            </div>
            <p className="text-sm text-gray-600">
              新たな力で、さらなる高みを目指します
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 