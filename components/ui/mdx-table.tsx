import { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
}

interface TableRowProps {
  children: ReactNode;
}

interface TableCellProps {
  children: ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children }: TableProps) {
  return (
    <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      {children}
    </thead>
  );
}

export function TableBody({ children }: TableProps) {
  return <tbody className="divide-y divide-gray-200">{children}</tbody>;
}

export function TableRow({ children }: TableRowProps) {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200">
      {children}
    </tr>
  );
}

export function TableHeaderCell({ children }: TableCellProps) {
  return (
    <th className="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
      {children}
    </th>
  );
}

export function TableCell({ children }: TableCellProps) {
  return (
    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
      {children}
    </td>
  );
}

// MDX用のデフォルトテーブルコンポーネント
export const mdxComponents = {
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeaderCell,
  td: TableCell,
}; 