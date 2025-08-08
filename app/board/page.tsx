"use client";

import { useState, useEffect } from "react";
import { 
  BulletinBoardForm,
  PostsList,
  TermsModal,
  ReportModal,
  ImageModal,
  NotificationContainer
} from "@/components/bulletin-board";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function BulletinBoardPage() {
  const [showTerms, setShowTerms] = useState(false);
  const [reportingPost, setReportingPost] = useState<{ id: number; number: number } | null>(null);
  const [imageModalSrc, setImageModalSrc] = useState<string>("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handlePostSubmitted = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleOpenReport = (postId: number, postNumber: number) => {
    setReportingPost({ id: postId, number: postNumber });
  };

  const handleCloseReport = () => {
    setReportingPost(null);
  };

  const handleOpenImage = (src: string) => {
    setImageModalSrc(src);
  };

  const handleCloseImage = () => {
    setImageModalSrc("");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '掲示板' }]} />
      </div>
      <header className="text-center mb-10">
        <h1 className="text-4xl font-black text-sky-800 mb-2">
          駅伝匿名掲示板
        </h1>
        <p className="text-lg text-sky-700">
          日本体育大学駅伝部を応援しよう！
        </p>
      </header>

      <BulletinBoardForm 
        onPostSubmitted={handlePostSubmitted}
        onShowTerms={() => setShowTerms(true)}
      />

      <PostsList 
        refreshTrigger={refreshTrigger}
        onOpenReport={handleOpenReport}
        onOpenImage={handleOpenImage}
      />

      <TermsModal 
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
      />

      <ReportModal 
        isOpen={!!reportingPost}
        postInfo={reportingPost}
        onClose={handleCloseReport}
      />

      <ImageModal 
        src={imageModalSrc}
        isOpen={!!imageModalSrc}
        onClose={handleCloseImage}
      />

      <NotificationContainer />
    </div>
  );
} 