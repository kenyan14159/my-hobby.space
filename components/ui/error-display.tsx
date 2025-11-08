"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent } from "./card";

interface ErrorDisplayProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorDisplay({ 
  title = "エラーが発生しました", 
  message, 
  onRetry,
  retryLabel = "再読み込み"
}: ErrorDisplayProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-sky-50 flex flex-col items-center justify-center p-4">
      <Card className="max-w-md w-full border-red-200 shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-red-500" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 mb-6">{message}</p>
          <Button
            onClick={handleRetry}
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            aria-label={retryLabel}
          >
            <RefreshCw className="h-4 w-4 mr-2 inline" aria-hidden="true" />
            {retryLabel}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

