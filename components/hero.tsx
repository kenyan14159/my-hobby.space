"use client";

import React from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { generateGenericAlt } from "@/lib/seo-image-alt";

export function Hero() {
  const controlsTitle = useAnimation();
  const controlsSubtitle = useAnimation();

  // テキストアニメーション用のバリアント
  const textVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  // サブテキストのアニメーション（文字ごとに）
  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  // 文字を一文字ずつに分解して配列に
  const subText = "〜継承を力に、越境を恐れず〜";
  const subTextArray = Array.from(subText);

  // コンポーネントマウント時にアニメーションを開始
  React.useEffect(() => {
    controlsTitle.start("visible");
    controlsSubtitle.start("visible");
  }, [controlsTitle, controlsSubtitle]);

  return (
    <div className="relative overflow-hidden w-full max-w-full">
      {/* モバイルでは高さを調整 */}
      <div className="h-[50vh] sm:h-[60vh] md:h-[80vh] lg:h-screen w-full">
        {/* 背景画像（next/image で最適化） */}
        <div className="absolute inset-0">
          <Image
            src="https://nssu-ekiden.works/wp-content/uploads/2025/02/myfavorite.jpeg"
            alt={generateGenericAlt(
              "チーム一丸となって箱根駅伝出場を目指す選手たち",
              "日本体育大学駅伝部"
            )}
            fill
            priority
            quality={85}
            sizes="100vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
          />
          {/* オーバーレイ（グラデーション） */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        
        {/* コンテンツ */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col items-center justify-center h-full text-center w-full">
            {/* メインタイトル - モバイルでのサイズ調整 */}
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 text-white tracking-wide"
              style={{ 
                textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                fontFamily: "'Noto Serif JP', serif" 
              }}
              initial="hidden"
              animate={controlsTitle}
              variants={textVariants}
            >
              體進
            </motion.h1>
            
            {/* サブテキスト（文字ごとのアニメーション） - モバイルでサイズ調整 */}
            <motion.div 
              className="overflow-hidden"
              initial="hidden"
              animate={controlsSubtitle}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.03,
                    delayChildren: 0.6
                  }
                }
              }}
            >
              <div className="flex justify-center flex-wrap">
                {subTextArray.map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className="text-base sm:text-xl md:text-2xl lg:text-3xl text-white font-medium tracking-wider"
                    style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}