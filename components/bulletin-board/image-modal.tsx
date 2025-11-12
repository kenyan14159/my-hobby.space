"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";

interface ImageModalProps {
  src: string;
  isOpen: boolean;
  onClose: () => void;
  alt?: string;
}

export function ImageModal({ src, isOpen, onClose, alt }: ImageModalProps) {
  if (!src) return null;

  const imageAlt = alt || "掲示板投稿画像 - 日本体育大学駅伝部";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-0 shadow-none">
        <DialogTitle className="sr-only">画像拡大表示</DialogTitle>
        <div className="relative flex items-center justify-center">
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8"
            aria-label="画像を閉じる"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="relative">
            <Image
              src={src}
              alt={imageAlt}
              width={800}
              height={600}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              style={{ width: 'auto', height: 'auto' }}
              sizes="(max-width: 768px) 90vw, 800px"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/400x300/f3f4f6/6b7280?text=画像を読み込めませんでした';
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 