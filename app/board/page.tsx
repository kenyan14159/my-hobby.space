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
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";

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
      <AnimatedPageHeader 
        title="駅伝匿名掲示板"
        subtitle="Anonymous Bulletin Board"
      />

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