"use client";

import React from "react";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-sky-600 focus:text-white focus:px-4 focus:py-3 focus:rounded-lg focus:shadow-lg focus:font-medium focus:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 transition-all"
    >
      メインコンテンツへスキップ
    </a>
  );
}
