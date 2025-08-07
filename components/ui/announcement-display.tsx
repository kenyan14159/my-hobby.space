import { ReactNode } from 'react';

interface AnnouncementDisplayProps {
  content: string;
  title: string;
}

export function AnnouncementDisplay({ content, title }: AnnouncementDisplayProps) {
  // コンテンツを構造化して解析
  const parseContent = (content: string) => {
    const sections = [];
    const lines = content.split('\n').filter(line => line.trim());
    
    let currentSection: any = null;
    
    for (const line of lines) {
      if (line.startsWith('## ')) {
        if (currentSection) sections.push(currentSection);
        currentSection = {
          type: 'section',
          title: line.replace('## ', ''),
          content: []
        };
      } else if (line.startsWith('> ')) {
        if (currentSection) sections.push(currentSection);
        currentSection = {
          type: 'quote',
          content: line.replace('> ', '')
        };
      } else if (line.startsWith('- **')) {
        if (!currentSection || currentSection.type !== 'roles') {
          if (currentSection) sections.push(currentSection);
          currentSection = {
            type: 'roles',
            items: []
          };
        }
        const match = line.match(/- \*\*(.*?)\*\*: (.*)/);
        if (match) {
          currentSection.items.push({
            role: match[1],
            person: match[2]
          });
        }
      } else if (currentSection && currentSection.type === 'section') {
        currentSection.content.push(line);
      } else if (line.trim()) {
        if (currentSection) sections.push(currentSection);
        currentSection = {
          type: 'text',
          content: line
        };
      }
    }
    
    if (currentSection) sections.push(currentSection);
    return sections;
  };

  const sections = parseContent(content);

  return (
    <div className="my-8">
      {/* ヘッダーセクション */}
      <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-8 rounded-t-2xl border border-purple-100">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">重要なお知らせ</h2>
          <p className="text-gray-600">チーム一丸となって新たな目標に向かいます</p>
        </div>
      </div>

      {/* コンテンツセクション */}
      <div className="bg-white shadow-xl rounded-b-2xl border-x border-b border-purple-100 overflow-hidden">
        <div className="p-8 space-y-8">
          {sections.map((section, index) => (
            <div key={index}>
              {section.type === 'section' && (
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-200">
                  <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {section.title}
                  </h3>
                  <div className="space-y-2">
                    {section.content.map((line: string, i: number) => (
                      <p key={i} className="text-gray-700 leading-relaxed">
                        {line.includes('**') ? (
                          <span className="font-bold text-purple-800">
                            {line.replace(/\*\*(.*?)\*\*/g, '$1')}
                          </span>
                        ) : (
                          line
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {section.type === 'quote' && (
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-lg border-l-4 border-amber-500">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-bold text-amber-800 mb-2">チームスローガン</h4>
                      <p className="text-xl font-bold text-amber-900 italic">
                        &ldquo;{section.content}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {section.type === 'roles' && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                  <h4 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                    新体制
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.items.map((item: any, i: number) => (
                      <div key={i} className="bg-white p-4 rounded-lg border border-green-300 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {item.person.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-green-800">{item.role}</p>
                            <p className="text-gray-700">{item.person}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {section.type === 'text' && (
                <p className="text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* フッターセクション */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 border-t border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-lg font-medium text-gray-800 mb-2">
              <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              一致団結、目標達成へ
            </div>
            <p className="text-sm text-gray-600">
              皆様の変わらぬご声援をよろしくお願いいたします
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 