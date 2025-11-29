'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TableColumn {
  key: string;
  header: string;
  className?: string;
}

interface TableData {
  [key: string]: any;
  _highlight?: boolean;
  _className?: string;
}

interface ResponsiveTableProps {
  columns: TableColumn[];
  data: TableData[];
  className?: string;
  delay?: number;
}

const RankBadge = ({ rank }: { rank: any }): React.ReactElement | null => {
  const rankStr = String(rank || '').trim();
  if (!rankStr) return null;

  const rankNum = parseInt(rankStr, 10);
  let className = 'bg-gray-100 text-gray-800';
  if (!isNaN(rankNum)) {
    if (rankNum <= 3) className = 'bg-yellow-200 text-yellow-900';
    else if (rankNum <= 8) className = 'bg-blue-100 text-blue-800';
    else if (rankNum <= 20) className = 'bg-green-100 text-green-800';
  }

  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${className}`}>{rankStr}</span>;
};

const createNoteBadges = ({ note, isPB, isFirst }: { note?: any; isPB?: boolean; isFirst?: boolean }): React.ReactElement[] => {
  const badges: React.ReactElement[] = [];
  const noteStr = String(note || '');

  if (isPB) {
    badges.push(<span key="pb" className="px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">PB</span>);
  }
  if (isFirst || noteStr === '初') {
    badges.push(<span key="first" className="px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">初</span>);
  }
  if (noteStr.includes('日体大記録')) {
    badges.push(<span key="nssu" className="px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">大学記録</span>);
  }
  if (noteStr.includes('U20日本記録')) {
    badges.push(<span key="u20" className="px-1.5 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700">U20日本記録</span>);
  }
  if (noteStr.includes('MGC')) {
    badges.push(<span key="mgc" className="px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">MGC出場権</span>);
  }
  if (noteStr === 'Q') {
    badges.push(<span key="q" className="px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">Q</span>);
  }
  if (noteStr === 'qR') {
    badges.push(<span key="qr" className="px-1.5 py-0.5 rounded text-xs font-medium bg-blue-200 text-blue-700">qR</span>);
  }

  return badges;
};

const renderCellContent = (row: TableData, columnKey: string) => {
  const cellData = row[columnKey];

  switch (columnKey) {
    case 'name':
      return <span className="font-medium text-gray-800">{cellData}</span>;
    case 'time':
      return <span className="font-mono text-sm">{cellData}</span>;
    case 'rank':
      return RankBadge({ rank: cellData }) || cellData;
    case 'note': {
      const noteStr = String(cellData || '');
      const isFirst = row.isFirst || noteStr === '初';
      const badges = createNoteBadges({ note: cellData, isPB: row.isPB, isFirst });
      if (badges.length === 0) {
        return cellData; // バッジがなければ元のデータをそのまま表示
      }

      // これらのキーワードが備考の全体である場合、テキストとしては表示しない
      const replacementKeywords = ['Q', 'qR', '日体大記録', 'U20日本記録', 'MGC出場権', '初', 'PB'];
      const textHandledByPb = row.isPB && noteStr === 'PB';
      const textHandledByFirst = isFirst && noteStr === '初';
      const textHandledByKeyword = replacementKeywords.includes(noteStr);

      const showText = !textHandledByPb && !textHandledByFirst && !textHandledByKeyword;

      return (
        <div className="flex flex-wrap items-center gap-1">
          {badges}
          {showText && <span className="text-sm">{noteStr}</span>}
        </div>
      );
    }
    default:
      return cellData;
  }
};


export function ResponsiveTable({ columns, data, className = '', delay = 0 }: ResponsiveTableProps) {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* デスクトップ表示 */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`text-left p-4 font-medium text-gray-700 text-sm ${column.className || ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <motion.tr
                key={index}
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  row._highlight ? 'bg-blue-50' : ''
                } ${row._className || ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: delay + index * 0.05 }}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`p-4 text-sm text-gray-800 align-middle ${column.className || ''}`}
                  >
                    {renderCellContent(row, column.key)}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* モバイル表示 */}
      <div className="md:hidden divide-y divide-gray-100">
        {data.map((row, index) => (
          <motion.div
            key={index}
            className={`p-4 ${row._highlight ? 'bg-blue-50' : ''} ${row._className || ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: delay + index * 0.1 }}
          >
            {columns.map((column) => (
              <div key={column.key} className="flex justify-between items-center py-2">
                <span className="font-semibold text-gray-600 text-sm">{column.header}</span>
                <div className="text-right text-gray-800 text-sm">{renderCellContent(row, column.key)}</div>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ icon, title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={`flex items-center gap-3 mb-6 ${className}`}>
      <div className="text-blue-600">{icon}</div>
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

interface ResultCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ResultCard({ children, className = '', delay = 0 }: ResultCardProps) {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
} 