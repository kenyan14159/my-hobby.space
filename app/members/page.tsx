"use client";

import { motion } from "framer-motion";
import Image from "next/image"; // Next.jsのImageコンポーネントを使用
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, Fragment, useEffect } from "react"; // useState, Fragment, useEffectフックを追加
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { X, Loader2 } from "lucide-react"; // XアイコンとLoader2アイコンをインポート

// --- 型定義 ---
interface PersonalBest {
  event: string;
  time: string;
}

interface NameRubyPair {
  kanji: string;
  ruby: string;
}

interface Member {
  name: string; // ルビなしの名前 (alt属性やフォールバック用)
  nameRubyParts?: NameRubyPair[]; // 漢字とルビのペア配列
  imageUrl: string;
  highSchool: string;
  faculty: string; // 学部
  department: string; // 学科
  personalBests: PersonalBest[];
  grade: number; // 学年 (1, 2, 3, 4)
}

interface Staff {
  name: string; // ルビなしの名前 (alt属性やフォールバック用)
  nameRubyParts?: NameRubyPair[]; // 漢字とルビのペア配列
  imageUrl: string;
  role: string; // 役職
  highSchool?: string; // 出身高校 (オプション)
  university?: string; // 出身大学/卒業年 (オプション)
  faculty?: string; // 学部 (学生スタッフ用)
  department?: string; // 学科 (学生スタッフ用)
  grade?: number; // 学年 (学生スタッフ用)
  isStudent: boolean; // 学生スタッフかどうかのフラグ
}

// --- コンポーネント ---
export default function MemberIntroductionPage() {
  const grades = [1, 2, 3, 4];
  
  // データ状態
  const [membersData, setMembersData] = useState<Member[]>([]);
  const [staffData, setStaffData] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // データ読み込み
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 各学年のデータを読み込み
        const membersPromises = grades.map(async (grade) => {
          const response = await fetch(`/data/members/grade${grade}.json`);
          if (!response.ok) {
            throw new Error(`Failed to load grade ${grade} data`);
          }
          const data = await response.json();
          return data[`${grade}年生`] || [];
        });

        // スタッフデータを読み込み
        const staffResponse = await fetch('/data/members/staff.json');
        if (!staffResponse.ok) {
          throw new Error('Failed to load staff data');
        }
        const staffDataJson = await staffResponse.json();

        // すべてのデータを並行して読み込み
        const [grade1Data, grade2Data, grade3Data, grade4Data] = await Promise.all(membersPromises);
        
        // メンバーデータを結合
        const allMembers = [...grade1Data, ...grade2Data, ...grade3Data, ...grade4Data];
        
        // スタッフデータを結合
        const allStaff = [
          ...(staffDataJson['監督・コーチ'] || []),
          ...(staffDataJson['学生スタッフ'] || [])
        ];

        setMembersData(allMembers);
        setStaffData(allStaff);

      } catch (err) {
        console.error('Error loading member data:', err);
        setError('データの読み込みに失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const professionalStaff = staffData.filter(s => !s.isStudent);
  const studentStaff = staffData.filter(s => s.isStudent);
  const sortedStudentStaff = [...studentStaff].sort((a, b) => (b.grade || 0) - (a.grade || 0));

  // モーダル表示用のstate
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItems, setModalItems] = useState<(Member | Staff)[]>([]); // モーダル対象のリスト
  const [currentIndex, setCurrentIndex] = useState(0); // 現在表示中のインデックス

  // モーダルを開くヘルパー関数
  const openModal = (items: (Member | Staff)[], index: number) => {
    console.log("openModal called", { items, index });
    setModalItems(items);
    setCurrentIndex(index);
    setIsModalOpen(true);
    console.log("Modal state updated", { isModalOpen: true, itemsLength: items.length, currentIndex: index });
  };

  // 前後の選手へ移動
  const showPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + modalItems.length) % modalItems.length);
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % modalItems.length);
  };

  const getMembersByGrade = (grade: number): Member[] => {
    return membersData.filter(member => member.grade === grade);
  };

  // 漢字とルビのペアをレンダリングするヘルパー関数
  const renderNameWithRuby = (item: Member | Staff) => {
    if (item.nameRubyParts && item.nameRubyParts.length > 0) {
      const nameRubyParts = item.nameRubyParts; // 変数に格納してTypeScriptの型チェックを回避
      return (
        <ruby>
          {nameRubyParts.map((part, i) => (
            <Fragment key={i}>
              {part.kanji}<rt>{part.ruby}</rt>
              {i < nameRubyParts.length - 1 && ' '} {/* 最後の要素以外にスペースを追加 */}
            </Fragment>
          ))}
        </ruby>
      );
    }
    return item.name; // ルビ情報がない場合は通常の名前を表示
  };

  // ローディング状態
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-sky-50 flex flex-col items-center justify-center py-16">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Loader2 className="mx-auto h-16 w-16 text-sky-500 mb-4 animate-spin" />
          <h1 className="text-2xl font-bold text-slate-800 mb-4">読み込み中...</h1>
          <p className="text-gray-600">メンバー情報を準備しています</p>
        </motion.div>
      </div>
    );
  }

  // エラー状態
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-sky-50 flex flex-col items-center justify-center py-16">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <X className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-red-600 mb-4">エラーが発生しました</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            再読み込み
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-sky-50 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <AnimatedPageHeader 
          title="部員紹介"
          subtitle="男子駅伝部のメンバーをご紹介します"
        />

        <Tabs defaultValue="grade-1" className="space-y-8">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl mx-auto gap-4 bg-transparent p-0">
            {grades.map((grade) => (
              <TabsTrigger 
                key={`grade-${grade}`} 
                value={`grade-${grade}`} 
                className="h-11 sm:h-12 w-full text-xs sm:text-sm md:text-base font-medium rounded-full border border-sky-300 flex items-center justify-center transition-colors data-[state=active]:bg-sky-500 data-[state=active]:text-white data-[state=active]:border-sky-500 data-[state=inactive]:text-sky-700 data-[state=inactive]:bg-white hover:data-[state=inactive]:bg-sky-50"
              >
                {grade}年生
              </TabsTrigger>
            ))}
            <TabsTrigger 
              value="staff" 
              className="h-11 sm:h-12 w-full text-xs sm:text-sm md:text-base font-medium rounded-full border border-sky-300 flex items-center justify-center transition-colors data-[state=active]:bg-sky-500 data-[state=active]:text-white data-[state=active]:border-sky-500 data-[state=inactive]:text-sky-700 data-[state=inactive]:bg-white hover:data-[state=inactive]:bg-sky-50"
            >
              スタッフ
            </TabsTrigger>
          </TabsList>

          {/* 学年生タブ */}
          {grades.map((grade) => (
            <TabsContent key={`content-grade-${grade}`} value={`grade-${grade}`}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-bold">
                    <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-sky-500 text-white">
                      {grade}
                    </span>
                    <span className="text-sky-700">年生 メンバー</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                    {getMembersByGrade(grade).map((member, index) => (
                      <motion.div
                        key={`${grade}-${member.name}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -4 }}
                      >
                        <Card className="overflow-hidden h-full flex flex-col">
                          <div
                            className="relative w-full h-32 sm:h-48 md:h-56 bg-gray-200 cursor-pointer"
                            onClick={() => openModal(getMembersByGrade(grade), index)}
                          >
                            {member.imageUrl ? (
                              <Image
                                src={member.imageUrl}
                                alt={member.name}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                style={{ objectFit: "cover" }}
                                unoptimized
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs sm:text-base">
                                No Image
                              </div>
                            )}
                          </div>
                          <CardContent className="p-2 sm:p-4 flex-grow flex flex-col">
                            <h5 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2 leading-tight">
                              {renderNameWithRuby(member)}
                            </h5>
                            <div className="text-xs sm:text-sm text-gray-600 space-y-0.5 sm:space-y-1 mb-2 sm:mb-3 flex-grow">
                              <p>出身: {member.highSchool || '---'}</p>
                              <p>学部/学科: {member.faculty}/{member.department}</p>
                            </div>
                            {member.personalBests.length > 0 && (
                              <div>
                                <h6 className="text-xs font-semibold mb-1 text-gray-700">自己ベスト:</h6>
                                <ul className="text-xs text-gray-500 space-y-0.5">
                                  {member.personalBests.map((pb, pbIndex) => (
                                    <li key={pbIndex} className="truncate">{pb.event}: {pb.time}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                    {getMembersByGrade(grade).length === 0 && (
                      <p className="col-span-full text-center text-gray-500 text-sm sm:text-base">この学年のメンバー情報はありません。</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}

          {/* スタッフタブ */}
          <TabsContent value="staff">
            {/* 監督・コーチ */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-bold">
                  <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-sky-500 text-white">監</span>
                  <span className="text-sky-700">監督・コーチ</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                  {professionalStaff.map((staff, index) => (
                     <motion.div
                      key={`prof-staff-${staff.name}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -4 }}
                    >
                      <Card className="overflow-hidden h-full flex flex-col">
                        <div
                          className="relative w-full h-32 sm:h-48 md:h-56 bg-gray-200 cursor-pointer"
                          onClick={() => openModal(professionalStaff, index)}
                        >
                           {staff.imageUrl ? (
                              <Image
                                src={staff.imageUrl}
                                alt={staff.name}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                style={{ objectFit: "cover" }}
                                unoptimized
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs sm:text-base">
                                No Image
                              </div>
                            )}
                        </div>
                        <CardContent className="p-2 sm:p-4 flex-grow">
                          <h5 className="text-sm sm:text-lg font-semibold mb-1 leading-tight">
                            {renderNameWithRuby(staff)}
                          </h5>
                          <p className="text-xs sm:text-sm font-medium text-primary mb-1 sm:mb-2">{staff.role}</p>
                          <div className="text-xs sm:text-sm text-gray-600 space-y-0.5 sm:space-y-1">
                            {staff.highSchool && <p>出身高校: {staff.highSchool}</p>}
                            {staff.university && <p>出身大学: {staff.university}</p>}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 学生スタッフ */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-bold">
                  <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-sky-500 text-white">学</span>
                  <span className="text-sky-700">学生スタッフ</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                  {sortedStudentStaff.map((staff, index) => (
                    <motion.div
                      key={`student-staff-${staff.name}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -4 }}
                    >
                      <Card className="overflow-hidden h-full flex flex-col">
                         <div
                            className="relative w-full h-32 sm:h-48 md:h-56 bg-gray-200 cursor-pointer"
                            onClick={() => openModal(sortedStudentStaff, index)}
                         >
                           {staff.imageUrl ? (
                              <Image
                                src={staff.imageUrl}
                                alt={staff.name}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                style={{ objectFit: "cover" }}
                                unoptimized
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs sm:text-base">
                                No Image
                              </div>
                            )}
                        </div>
                        <CardContent className="p-2 sm:p-4 flex-grow">
                          <h5 className="text-sm sm:text-lg font-semibold mb-1 leading-tight">
                            {renderNameWithRuby(staff)}
                          </h5>
                          <p className="text-xs sm:text-sm font-medium text-primary mb-1 sm:mb-2">役職: {staff.role} ({staff.grade}年)</p>
                          <div className="text-xs sm:text-sm text-gray-600 space-y-0.5 sm:space-y-1">
                            {staff.highSchool && <p>出身: {staff.highSchool}</p>}
                            {staff.faculty && staff.department && <p>学部/学科: {staff.faculty}/{staff.department}</p>}
                          </div>
                        </CardContent>
                      </Card>
                      </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 下部クイックアクセスボタン */}
          <TabsList className="grid grid-cols-5 w-full max-w-3xl mx-auto gap-4 bg-transparent p-0 mt-12">
            {grades.map((grade) => (
              <TabsTrigger
                key={`bottom-grade-${grade}`}
                value={`grade-${grade}`}
                className="h-11 sm:h-12 w-full text-xs sm:text-sm md:text-base font-medium rounded-full border border-sky-300 flex items-center justify-center transition-colors data-[state=active]:bg-sky-500 data-[state=active]:text-white data-[state=active]:border-sky-500 data-[state=inactive]:text-sky-700 data-[state=inactive]:bg-white hover:data-[state=inactive]:bg-sky-50"
              >
                {grade}年生
              </TabsTrigger>
            ))}
            <TabsTrigger
              value="staff"
              className="h-11 sm:h-12 w-full text-xs sm:text-sm md:text-base font-medium rounded-full border border-sky-300 flex items-center justify-center transition-colors data-[state=active]:bg-sky-500 data-[state=active]:text-white data-[state=active]:border-sky-500 data-[state=inactive]:text-sky-700 data-[state=inactive]:bg-white hover:data-[state=inactive]:bg-sky-50"
            >
              スタッフ
            </TabsTrigger>
          </TabsList>

        </Tabs>
      </motion.div>

      {/* カスタムモーダル */}
      {isModalOpen && modalItems.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* オーバーレイ */}
          <div 
            className="absolute inset-0 bg-black/80" 
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* モーダルコンテンツ */}
          <div className="relative z-10 bg-white max-w-3xl w-full rounded-lg overflow-hidden">
            {/* 閉じるボタン */}
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute right-4 top-4 z-20 bg-white/80 rounded-full p-1 hover:bg-white"
            >
              <X size={24} />
            </button>
            
            {/* 画像 */}
            <div className="relative">
              <Image
                src={modalItems[currentIndex].imageUrl}
                alt={modalItems[currentIndex].name}
                width={800}
                height={600}
                style={{ objectFit: "contain" }}
                unoptimized
                className="w-full h-auto"
              />
              
              {/* ナビゲーションボタン */}
              {modalItems.length > 1 && (
                <>
                  <button
                    onClick={showPrev}
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
                    aria-label="前の選手"
                  >
                    ←
                  </button>
                  <button
                    onClick={showNext}
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow"
                    aria-label="次の選手"
                  >
                    →
                  </button>
                </>
              )}
            </div>
            
            {/* プロフィール詳細 */}
            <div className="p-4 bg-white space-y-3 text-sm sm:text-base text-gray-700">
              <h3 className="text-center text-lg sm:text-xl font-semibold mb-2">
                {renderNameWithRuby(modalItems[currentIndex])}
              </h3>

              {/* 詳細情報を条件により出し分け */}
              {(() => {
                const item = modalItems[currentIndex] as Member | Staff;

                // スタッフかどうかで表示項目を切替
                const isStaff = (item as Staff).role !== undefined;

                if (isStaff) {
                  const staff = item as Staff;
                  return (
                    <div className="space-y-1">
                      <p>
                        <span className="font-medium text-gray-600">役職:</span> {staff.role}
                        {staff.grade && ` (${staff.grade}年)`}
                      </p>
                      {staff.highSchool && (
                        <p>
                          <span className="font-medium text-gray-600">出身高校:</span> {staff.highSchool}
                        </p>
                      )}
                      {staff.university && (
                        <p>
                          <span className="font-medium text-gray-600">出身大学:</span> {staff.university}
                        </p>
                      )}
                      {staff.faculty && staff.department && (
                        <p>
                          <span className="font-medium text-gray-600">学部/学科:</span> {staff.faculty}/{staff.department}
                        </p>
                      )}
                    </div>
                  );
                } else {
                  const member = item as Member;
                  return (
                    <div className="space-y-1">
                      <p>
                        <span className="font-medium text-gray-600">出身:</span> {member.highSchool}
                      </p>
                      <p>
                        <span className="font-medium text-gray-600">学部/学科:</span> {member.faculty}/{member.department}
                      </p>

                      {member.personalBests && member.personalBests.length > 0 && (
                        <div>
                          <p className="font-medium text-gray-600 mb-1">自己ベスト:</p>
                          <ul className="list-disc list-inside space-y-0.5">
                            {member.personalBests.map((pb, idx) => (
                              <li key={idx}>{pb.event}: {pb.time}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}