"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Menu, Award, TrendingUp, ArrowRight, User, Users, Loader2, ChevronDown, ChevronUp, ArrowUp } from "lucide-react";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ErrorDisplay } from "@/components/ui/error-display";
import { logger } from "@/lib/logger";

// --- 型定義 ---
interface RecordEntry {
  name: string;
  time: string;
  grade: string;
  date: string;
  school: string;
  location?: string;
  note?: string;
  recordYear?: string;
}

interface RecordsData {
  [eventName: string]: RecordEntry[];
}

// 生データの型定義（JSONから読み込まれるデータ構造）
interface RawRunnerData {
  name?: string;
  time?: string;
  year?: string;
  recordYear?: string;
  回数?: string;
  school?: string;
  出身高校?: string;
  location?: string;
  note?: string;
  [key: string]: unknown; // その他のプロパティに対応
}

// --- データ処理ヘルパー関数群 ---

// タイム文字列を秒数に変換（ソート用）
const timeToSeconds = (timeStr: string | undefined | null): number => {
  if (!timeStr || typeof timeStr !== 'string') return Infinity;
  const marathonMatch = timeStr.match(/(\d+)時間(\d+)分(\d+)秒/);
  if (marathonMatch) return parseInt(marathonMatch[1])*3600 + parseInt(marathonMatch[2])*60 + parseInt(marathonMatch[3]);
  const hmsMatch = timeStr.match(/^(\d{1,2}):(\d{2}):(\d{2})$/);
  if (hmsMatch) return parseInt(hmsMatch[1])*3600 + parseInt(hmsMatch[2])*60 + parseInt(hmsMatch[3]);
  const mscMatch = timeStr.match(/^(\d{1,2}):(\d{2})\.(\d{1,2})$/);
  if (mscMatch) return parseInt(mscMatch[1])*60 + parseInt(mscMatch[2]) + parseFloat(`0.${mscMatch[3]}`);
  const mmssMatch = timeStr.match(/^(\d{1,3}):(\d{2})$/);
  if (mmssMatch) return parseInt(mmssMatch[1])*60 + parseInt(mmssMatch[2]);
  const eightHundredMatch = timeStr.match(/^(\d)'(\d{2})"(\d{2})$/);
  if (eightHundredMatch) return parseInt(eightHundredMatch[1])*60 + parseInt(eightHundredMatch[2]) + parseFloat(`0.${eightHundredMatch[3]}`);
  // M:SS.s (e.g., 1500m) or M:SS (e.g., 1500m no fraction)
  const fifteenMatch = timeStr.match(/^(\d):(\d{2})(\.\d)?$/);
  if(fifteenMatch) return parseInt(fifteenMatch[1])*60 + parseFloat(fifteenMatch[2] + (fifteenMatch[3] || ''));
  // MM'SS" or H:MM'SS
  const ekidenTimeMatch = timeStr.replace(/'/g, ':').replace(/"/g, '');
  const ekidenParts = ekidenTimeMatch.split(':');
  if (ekidenParts.length === 3) return parseInt(ekidenParts[0])*3600 + parseInt(ekidenParts[1])*60 + parseFloat(ekidenParts[2]);
  if (ekidenParts.length === 2) return parseInt(ekidenParts[0])*60 + parseFloat(ekidenParts[1]);

  logger.warn(`[timeToSeconds] Could not parse time: ${timeStr}`);
  return Infinity;
};

// タイム表示を整形
const formatTimeDisplay = (timeStr: string, eventName?: string): string => {
  if (!timeStr) return "";
  
  // マラソンの場合は H:MM:SS 形式（先頭の0は削除）
  if (eventName === "マラソン" || timeStr.includes("時間")) {
    // 既に正しい形式の場合は先頭の0を削除
    if (timeStr.match(/^\d{1,2}:\d{2}:\d{2}$/)) {
      return timeStr.replace(/^0/, '');
    }
    // 時間表記から変換
    const marathonMatch = timeStr.match(/(\d+)時間(\d+)分(\d+)秒/);
    if (marathonMatch) {
      const hours = marathonMatch[1];
      const minutes = marathonMatch[2].padStart(2, '0');
      const seconds = marathonMatch[3].padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }
  }
  
  // ハーフマラソンの場合も HH:MM:SS 形式（1時間を超える場合）
  if (eventName === "ハーフマラソン" && timeStr.includes(":")) {
    const parts = timeStr.split(":");
    if (parts.length === 3) {
      return timeStr; // 既に HH:MM:SS 形式
    }
    if (parts.length === 2 && parseInt(parts[0]) > 59) {
      // MM:SS で分が60を超える場合は時間に変換
      const totalMinutes = parseInt(parts[0]);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${parts[1]}`;
    }
  }
  
  // 10000m以下の種目は MM:SS.SS 形式
  if (eventName && ['1500m', '3000mSC', '5000m', '10000m'].includes(eventName)) {
    // 既に MM:SS.SS 形式の場合
    if (timeStr.match(/^\d{1,2}:\d{2}\.\d{1,2}$/)) {
      return timeStr;
    }
    
    // M:SS.s や M:SS 形式から変換
    const parts = timeStr.split(/[:.]/);
    if (parts.length === 3 && timeStr.includes('.')) { // M:SS.ss
      const minutes = parts[0].padStart(2, '0');
      const seconds = parts[1];
      const fraction = parts[2].padEnd(2, '0');
      return `${minutes}:${seconds}.${fraction}`;
    }
    if (parts.length === 2) { // M:SS
      const minutes = parts[0].padStart(2, '0');
      const seconds = parts[1];
      return `${minutes}:${seconds}.00`;
    }
  }
  
  // その他の場合はそのまま返す
  return timeStr;
};

// データ生成・ソート関数（メモ化）
const createSortedRecords = (runnersData: RawRunnerData[]): RecordEntry[] => {
  return runnersData
    .map((runner: RawRunnerData): RecordEntry => ({
      name: runner.name || "",
      time: runner.time || "",
      grade: runner.year || "",
      date: runner.recordYear || runner.回数 || "",
      school: runner.school || runner.出身高校 || "",
      location: runner.location || "",
      note: runner.note || ""
    }))
    .sort((a, b) => timeToSeconds(a.time) - timeToSeconds(b.time));
};

// --- 共通コンポーネント ---

// 新記録を判定するヘルパー関数
const isNewRecord = (record: RecordEntry) => {
    // 2025年に記録した選手のみNEWを表示
    return record.date?.includes('2025') || record.recordYear?.includes('2025');
};

// 順位に応じたメダルカラーを返す関数
const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-amber-400 to-yellow-300 text-white';
    if (rank === 2) return 'from-slate-400 to-gray-300 text-white';
    if (rank === 3) return 'from-amber-600 to-yellow-600 text-white';
    return 'from-gray-200 to-gray-200 text-gray-600';
};

// 表形式で記録を表示するコンポーネント
const RecordsTable = ({ records, eventName }: { records: RecordEntry[]; eventName?: string }) => (
  <>
    {/* モバイル（xs）: カード/リスト表示 */}
    <div className="sm:hidden space-y-2">
      {records.map((record, index) => (
        <div
          key={index}
          className={`flex items-center justify-between px-3 py-2 rounded-lg border border-gray-100 bg-white/70 ${
            isNewRecord(record) ? 'ring-2 ring-blue-200' : ''
          }`}
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {index + 1}. {record.name}
            </p>
            <p className="text-[11px] text-gray-500 truncate">
              {record.school}
              {record.grade && ` / ${record.grade}`}
              {record.date && ` / ${record.date}`}
            </p>
          </div>
          <p className="ml-2 text-xs font-mono font-semibold whitespace-nowrap">
            {formatTimeDisplay(record.time, eventName)}
          </p>
        </div>
      ))}
    </div>

    {/* タブレット以上: テーブル表示 */}
    <div className="hidden sm:block overflow-x-auto bg-white/60 border border-gray-100/80 rounded-xl">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-sky-100 text-sky-700">
          <tr>
            <th className="px-4 py-2">順位</th>
            <th className="px-4 py-2">氏名</th>
            <th className="px-4 py-2">所属 / 学年</th>
            <th className="px-4 py-2">年</th>
            <th className="px-4 py-2">タイム</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {records.map((record, index) => (
            <tr key={index} className={isNewRecord(record) ? 'bg-blue-50' : ''}>
              <td className="px-4 py-2 font-mono">{index + 1}</td>
              <td className="px-4 py-2">{record.name}</td>
              <td className="px-4 py-2">{record.school}{record.grade && ` / ${record.grade}`}</td>
              <td className="px-4 py-2">{record.date}</td>
              <td className="px-4 py-2 font-mono">{formatTimeDisplay(record.time, eventName)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

// 駅伝専用テーブルコンポーネント
const EkidenSpecialTable = ({ records, sectionType }: { records: RecordEntry[]; sectionType: string }) => {
  // 箱根駅伝の区間記録か総合記録かで表示を分ける（新しい構造に対応）
  const isDistrictRecord = sectionType.match(/^\d+区\s*\(/); // "1区 (21.3km)" 形式
  const isBoxHakoneOverall = sectionType.startsWith("箱根駅伝") && (sectionType.includes("総合") || sectionType.includes("往路") || sectionType.includes("復路"));
  const isZennihon = sectionType === "全日本大学駅伝";
  const isOtherTrack = sectionType === "その他トラック";

  // 種目名を抽出（noteフィールドから）
  const getEventFromNote = (note: string): string => {
    if (note.includes("1区")) return "1区";
    if (note.includes("2区")) return "2区";
    if (note.includes("3区")) return "3区";
    if (note.includes("4区")) return "4区";
    if (note.includes("5区")) return "5区";
    if (note.includes("6区")) return "6区";
    if (note.includes("7区")) return "7区";
    if (note.includes("8区")) return "8区";
    if (note.includes("800m")) return "800m";
    if (note.includes("30km")) return "30km";
    if (note.includes("100km")) return "100km";
    return note;
  };

  return (
    <>
      {/* モバイル表示 */}
      <div className="sm:hidden space-y-2">
        {records.map((record, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-3 py-2 rounded-lg border border-gray-100 bg-white/70"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {isZennihon ? (
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-semibold px-1.5 py-0.5 rounded">
                    {record.note?.replace('全日本大学駅伝 ', '') || `${index + 1}区`}
                  </span>
                ) : isOtherTrack ? (
                  <span className="bg-gray-100 text-gray-800 text-[10px] font-semibold px-1.5 py-0.5 rounded">
                    {getEventFromNote(record.note || '')}
                  </span>
                ) : !isBoxHakoneOverall ? (
                  <span className="bg-sky-100 text-sky-700 text-[10px] font-semibold px-1.5 py-0.5 rounded">
                    {index + 1}位
                  </span>
                ) : null}
                {isBoxHakoneOverall && (
                  <span className="bg-red-100 text-red-700 text-[10px] font-semibold px-1.5 py-0.5 rounded">
                    {record.name}
                  </span>
                )}
                {!isBoxHakoneOverall && (
                  <span className="text-sm font-medium truncate">{record.name}</span>
                )}
              </div>
              <p className="text-[11px] text-gray-500 truncate">
                {!isBoxHakoneOverall && record.school}
                {record.grade && !isBoxHakoneOverall && ` / ${record.grade}`}
                {record.date && ` / ${record.date}`}
              </p>
            </div>
            <div className="ml-2 text-xs font-mono whitespace-nowrap">
              {formatTimeDisplay(record.time, sectionType)}
            </div>
          </div>
        ))}
      </div>

      {/* デスクトップ表示 */}
      <div className="hidden sm:block overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-sky-50 to-blue-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                {isZennihon || isOtherTrack ? (isZennihon ? "区間" : "種目") : "順位"}
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                {isBoxHakoneOverall ? "記録" : "氏名"}
              </th>
              {!isBoxHakoneOverall && (
                <th className="px-6 py-4 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                  {isZennihon || isOtherTrack ? "氏名" : "所属 / 学年"}
                </th>
              )}
              <th className="px-6 py-4 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                {isBoxHakoneOverall ? "回" : "年"}
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                タイム
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {records.map((record, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  {isZennihon ? (
                    <div className="text-sm font-medium text-gray-900">
                      {record.note?.replace('全日本大学駅伝 ', '') || `${index + 1}区`}
                    </div>
                  ) : isOtherTrack ? (
                    <div className="text-sm font-medium text-gray-900">
                      {getEventFromNote(record.note || '')}
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span className="text-sm text-gray-700">
                        {index + 1}
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isBoxHakoneOverall ? (
                    <div className="text-sm font-medium text-gray-900">{record.name}</div>
                  ) : isZennihon ? (
                    <div className="text-sm font-medium text-gray-900">{record.name}</div>
                  ) : isOtherTrack ? (
                    <div className="text-sm font-medium text-gray-900">{record.name}</div>
                  ) : (
                    <div className="text-sm font-medium text-gray-900">{record.name}</div>
                  )}
                </td>
                {!isBoxHakoneOverall && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isZennihon || isOtherTrack ? (
                      <div className="text-sm text-gray-900">{record.name}</div>
                    ) : (
                      <>
                        <div className="text-sm text-gray-900">{record.school}</div>
                        {record.grade && <div className="text-xs text-gray-500">{record.grade}</div>}
                      </>
                    )}
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-gray-900">
                    {formatTimeDisplay(record.time, sectionType)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

// 女子の「その他」記録表示用コンポーネント（アコーディオン形式）
const WomensOthersTable = ({ recordsData }: { recordsData: any }) => {
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({});
  
  if (!recordsData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">データを読み込み中...</p>
      </div>
    );
  }

  const sectionOrder = ["3000mSC", "ハーフマラソン", "マラソン"];
  const availableSections = sectionOrder.filter(sectionKey => {
    const sectionData = recordsData[sectionKey];
    return sectionData && Array.isArray(sectionData) && sectionData.length > 0;
  });

  if (availableSections.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">データが見つかりません</p>
      </div>
    );
  }

  const toggleSection = (sectionKey: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  return (
    <div className="space-y-4">
      {availableSections.map((sectionKey) => {
        const sectionData = recordsData[sectionKey];
        const records = sectionData.map((record: any) => ({
          name: record.name || "",
          time: record.time || "",
          grade: record.year || "",
          date: record.recordYear || "",
          school: record.school || "",
          location: record.location || "",
          note: record.note || ""
        }));
        const isOpen = openSections[sectionKey];

        return (
          <Collapsible key={sectionKey} open={isOpen} onOpenChange={() => toggleSection(sectionKey)}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-bold text-slate-800 text-left">
                  {sectionKey}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {records.length}件
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4"
                  >
                    <RecordsTable records={records} eventName={sectionKey} />
                  </motion.div>
                )}
              </AnimatePresence>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
};

// 男子の「その他」記録表示用コンポーネント（アコーディオン形式）
const MensOthersTable = ({ recordsData }: { recordsData: any }) => {
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({});
  
  if (!recordsData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">データを読み込み中...</p>
      </div>
    );
  }

  // 種目の表示順序を定義
  const sectionOrder = [
    // 箱根駅伝の区間記録（距離情報付き）
    "1区 (21.3km)", "2区 (23.1km)", "3区 (21.4km)", "4区 (21.5km)", "5区 (20.8km)", 
    "6区 (20.8km)", "7区 (21.3km)", "8区 (21.4km)", "9区 (23.1km)", "10区 (23.0km)",
    // 箱根駅伝の総合記録
    "箱根駅伝 総合記録", "箱根駅伝 往路記録", "箱根駅伝 復路記録",
    // その他の駅伝
    "全日本大学駅伝",
    // その他のトラック記録
    "その他トラック"
  ];

  // データを RecordEntry 形式に変換
  const convertToRecordEntry = (record: any): RecordEntry => ({
    name: record.name || record.rank || "", // 総合記録の場合はrankを使用
    time: record.time || "",
    grade: record.grade || "",
    date: record.date || "",
    school: record.school || "",
    location: "",
    note: record.note || ""
  });

  // 実際に表示可能なセクションをフィルタリング
  const availableSections = sectionOrder.filter(sectionKey => {
    const sectionData = recordsData[sectionKey];
    return sectionData && Array.isArray(sectionData) && sectionData.length > 0;
  });

  if (availableSections.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">データが見つかりません</p>
      </div>
    );
  }

  const toggleSection = (sectionKey: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  return (
    <div className="space-y-4">
      {availableSections.map((sectionKey) => {
        const sectionData = recordsData[sectionKey];
        const records = sectionData.map(convertToRecordEntry);
        const isOpen = openSections[sectionKey];

        return (
          <Collapsible key={sectionKey} open={isOpen} onOpenChange={() => toggleSection(sectionKey)}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-bold text-slate-800 text-left">
                  {sectionKey}
                </h3>
                <div className="flex items-center gap-2">
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4"
                  >
                    {sectionKey.includes("箱根駅伝") || sectionKey === "全日本大学駅伝" || sectionKey === "その他トラック" ? (
                      <EkidenSpecialTable records={records} sectionType={sectionKey} />
                    ) : (
                      <RecordsTable records={records} eventName={sectionKey} />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
};

// 駅伝・その他の記録表示—旧コンポーネント—同色のため残しています
const EkidenRecordsTable = ({ recordsData }: { recordsData: any }) => {
  // recordsDataが存在しない場合のフォールバック
  if (!recordsData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">データを読み込み中...</p>
      </div>
    );
  }

  // 駅伝記録の表示順序を定義（新しいキー名に対応）
  const sectionOrder = [
    // 箱根駅伝の区間記録（距離情報付き）
    "1区 (21.3km)", "2区 (23.1km)", "3区 (21.4km)", "4区 (21.5km)", "5区 (20.8km)", 
    "6区 (20.8km)", "7区 (21.3km)", "8区 (21.4km)", "9区 (23.1km)", "10区 (23.0km)",
    // 箱根駅伝の総合記録
    "箱根駅伝 総合記録", "箱根駅伝 往路記録", "箱根駅伝 復路記録",
    // その他の駅伝
    "全日本大学駅伝",
    // その他のトラック記録
    "その他トラック"
  ];

  // データを RecordEntry 形式に変換（新しい構造に対応）
  const convertToRecordEntry = (record: any): RecordEntry => ({
    name: record.name || record.rank || "", // 総合記録の場合はrankを使用
    time: record.time || "",
    grade: record.grade || "",
    date: record.date || "",
    school: record.school || "",
    location: "",
    note: record.note || ""
  });

  // 実際に表示可能なセクションをフィルタリング
  const availableSections = sectionOrder.filter(sectionKey => {
    const sectionData = recordsData[sectionKey];
    return sectionData && Array.isArray(sectionData) && sectionData.length > 0;
  });

  if (availableSections.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">データが見つかりません</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {availableSections.map((sectionKey) => {
        const sectionData = recordsData[sectionKey];
        const records = sectionData.map(convertToRecordEntry);

        return (
          <div key={sectionKey} className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 border-b-2 border-slate-200 pb-3 mb-6">
              {sectionKey}
            </h3>
            <EkidenSpecialTable records={records} sectionType={sectionKey} />
          </div>
        );
      })}
    </div>
  );
};

// --- メイン表示コンポーネント ---
const GenderRecordsView = ({ recordsData, eventLabel }: { recordsData: RecordsData, eventLabel: string }) => {
    const eventsOrder = useMemo(() => ["全種目", ...Object.keys(recordsData)], [recordsData]);
    const [selectedEvent, setSelectedEvent] = useState("全種目");
    
    const renderContent = (event: string) => {
        // 全種目表示の場合
        if (event === "全種目") {
            return (
                <div className="space-y-10">
                    {eventsOrder.filter(eventName => eventName !== "全種目").map((eventName) => {
                        const records = recordsData[eventName] || [];
                        
                        return (
                            <div key={eventName} className="space-y-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 border-b-2 border-slate-200 pb-3 mb-6">
                                    {eventName}
                                </h3>
                                {eventName === "その他" ? (
                                    eventLabel === "女子" ? (
                                        <WomensOthersTable recordsData={recordsData["その他"]} />
                                    ) : (
                                        <MensOthersTable recordsData={recordsData["その他"]} />
                                    )
                                ) : (
                                    <RecordsTable records={records} eventName={eventName} />
                                )}
                            </div>
                        );
                    })}
                </div>
            );
        }

        // 個別種目表示の場合
        const records = recordsData[event] || [];
        
        // 個別種目選択時のタイトル表示
        const eventTitle = (
            <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 text-left sm:text-center border-b-2 border-slate-200 pb-4 mb-6">
                    {event === "その他" ? "その他 記録" : event}
                </h2>
            </div>
        );
        
        if (event === "その他") {
            return (
                <div>
                    {eventTitle}
                    {eventLabel === "女子" ? (
                        <WomensOthersTable recordsData={recordsData["その他"]} />
                    ) : (
                        <MensOthersTable recordsData={recordsData["その他"]} />
                    )}
                </div>
            );
        }

        return (
            <div>
                {eventTitle}
                <RecordsTable records={records} eventName={event} />
            </div>
        );
    };

    return (
        <div>
            {/* 種目選択タブ */}
            <div className="mb-12">
                <Tabs value={selectedEvent} onValueChange={setSelectedEvent}>
                    <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent p-0 mb-16">
                        {eventsOrder.map((event) => (
                            <TabsTrigger 
                                key={event} 
                                value={event} 
                                className={`
                                    px-3 py-2 text-xs sm:text-sm font-medium rounded-full border-2 transition-all duration-200
                                    ${eventLabel === "男子" 
                                        ? "border-blue-200 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500 hover:bg-blue-50 hover:border-blue-300" 
                                        : "border-pink-200 data-[state=active]:bg-pink-500 data-[state=active]:text-white data-[state=active]:border-pink-500 hover:bg-pink-50 hover:border-pink-300"
                                    }
                                    data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700
                                    shadow-sm hover:shadow-md min-w-[80px] flex-shrink-0
                                `}
                            >
                                {event}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>

            {/* コンテンツ表示 */}
            <div>
                <Card className="border-none shadow-none bg-transparent">
                    <CardContent className="p-0">
                        {renderContent(selectedEvent)}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

// トップへ戻るボタンコンポーネント
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-full shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
          aria-label="ページの上部に戻る"
        >
          <ArrowUp className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// --- ページ全体 ---
export default function RecordsPage() {
    const [selectedGender, setSelectedGender] = useState<'mens' | 'womens'>('mens');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [mensData, setMensData] = useState<RecordsData>({});
    const [womensData, setWomensData] = useState<RecordsData>({});

    // 種目名を表示用に変換
    const getEventDisplayName = useCallback((eventKey: string): string => {
        const displayNames: { [key: string]: string } = {
            '1500m': '1500m',
            '3000mSC': '3000mSC', 
            '5000m': '5000m',
            '10000m': '10000m',
            'ハーフマラソン': 'ハーフマラソン',
            'マラソン': 'マラソン',
            'その他': 'その他'
        };
        return displayNames[eventKey] || eventKey;
    }, []);

    // データ読み込み関数
    const loadRecordsData = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            // 男子データ読み込み
            const mensFiles = [
                '1500m.json', '3000msc.json', '5000m.json', '10000m.json', 
                'half-marathon.json', 'marathon.json', 'ekiden-others.json'
            ];

            const mensResults: RecordsData = {};
            
            for (const file of mensFiles) {
                try {
                    const response = await fetch(`/data/records/men/${file}`);
                    if (response.ok) {
                        const data = await response.json();
                        
                        // ekiden-others.json の場合は新しい構造に対応
                        if (file === 'ekiden-others.json') {
                            mensResults["その他"] = data; // そのまま渡す
                        } else {
                            // その他のファイルは従来の処理
                            const eventKey = Object.keys(data)[0];
                            if (eventKey && data[eventKey]) {
                                const eventName = getEventDisplayName(eventKey);
                                mensResults[eventName] = createSortedRecords(data[eventKey]);
                            }
                        }
                    }
                } catch (err) {
                    logger.warn(`Failed to load men's ${file}:`, err);
                }
            }

            // 女子データ読み込み
            const womensFiles = [
                '1500m.json', '5000m.json', '10000m.json', 'others.json'
            ];

            const womensResults: RecordsData = {};
            
            for (const file of womensFiles) {
                try {
                    const response = await fetch(`/data/records/women/${file}`);
                    if (response.ok) {
                        const data = await response.json();
                        
                        // others.json の場合は新しい構造に対応
                        if (file === 'others.json') {
                            womensResults["その他"] = data; // そのまま渡す
                        } else {
                            // その他のファイルは従来の処理
                            const eventKey = Object.keys(data)[0];
                            if (eventKey && data[eventKey]) {
                                const eventName = getEventDisplayName(eventKey);
                                womensResults[eventName] = createSortedRecords(data[eventKey]);
                            }
                        }
                    }
                } catch (err) {
                    logger.warn(`Failed to load women's ${file}:`, err);
                }
            }

            setMensData(mensResults);
            setWomensData(womensResults);

        } catch (err) {
            logger.error('Error loading records data:', err);
            setError('記録データの読み込みに失敗しました');
        } finally {
            setIsLoading(false);
        }
    }, [getEventDisplayName]);

    // 初期化
    useEffect(() => {
        loadRecordsData();
    }, [loadRecordsData]);

    // エラー状態
    if (error) {
        return (
            <ErrorDisplay 
                message={error}
                onRetry={() => {
                    setError(null);
                    loadRecordsData();
                }}
            />
        );
    }

    // ローディング状態
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white to-sky-50 flex flex-col items-center justify-center p-4">
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <Loader2 className="mx-auto h-16 w-16 text-sky-500 mb-4 animate-spin" />
                    <h1 className="text-2xl font-bold text-slate-800 mb-4">読み込み中...</h1>
                    <p className="text-gray-600">記録データを準備しています</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-sky-50">
            <motion.div 
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* パンくず＋ページヘッダー */}
                <div className="mb-6">
                    <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '歴代記録' }]} />
                </div>
                <div className="text-center mb-12">
                    <AnimatedPageHeader 
                        title="歴代記録"
                        subtitle="All-Time Records"
                    />
                </div>

                {/* 男女選択タブ */}
                <div className="mb-12">
                    <Tabs value={selectedGender} onValueChange={(value) => setSelectedGender(value as 'mens' | 'womens')}>
                        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 p-2 rounded-lg bg-transparent border-none shadow-none">
                            <TabsTrigger 
                                value="mens" 
                                className="text-base font-semibold px-8 py-3 rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700 transition-all duration-200 hover:bg-blue-50"
                            >
                                <User className="mr-2 h-5 w-5" />
                                男子
                            </TabsTrigger>
                            <TabsTrigger 
                                value="womens" 
                                className="text-base font-semibold px-8 py-3 rounded-md data-[state=active]:bg-pink-500 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700 transition-all duration-200 hover:bg-pink-50"
                            >
                                <Users className="mr-2 h-5 w-5" />
                                女子
                            </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="mens">
                            <GenderRecordsView recordsData={mensData} eventLabel="男子" />
                        </TabsContent>
                        
                        <TabsContent value="womens">
                            <GenderRecordsView recordsData={womensData} eventLabel="女子" />
                        </TabsContent>
                    </Tabs>
                </div>
            </motion.div>
            
            {/* トップへ戻るボタン（共通ボタンに統一のためページ内ボタンは削除） */}
        </div>
    );
}