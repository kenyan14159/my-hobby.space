import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ImageProtection } from "@/components/ui/image-protection";
import { BackToTop } from "@/components/ui/back-to-top";
import { SkipLink } from "@/components/ui/skip-link";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { generateHakoneEkidenSchema, generateWebSiteSchema } from '@/lib/structured-data-extended';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: '日本体育大学駅伝部 | 公式ホームページ',
    template: '%s | 日本体育大学駅伝部'
  },
  description: '日本体育大学駅伝部の公式サイトです。箱根駅伝、全日本大学駅伝への挑戦、選手紹介、試合結果、記録を掲載しています。',
  keywords: [
    'NSSU',
    'NASU',
    '日本体育大学',
    '日体大',
    '日体',
    '日体駅伝',
    'エッサッサ',
    '陸上競技部',
    '陸上部',
    '駅伝部',
    '大学駅伝',
    '駅伝競走',
    '箱根駅伝',
    '全日本大学駅伝',
    '関東学生陸上競技対校選手権大会',
    '関東インカレ'
  ],
  authors: [{ name: '日本体育大学駅伝部' }],
  creator: '日本体育大学駅伝部',
  publisher: '日本体育大学駅伝部',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://nssu-ekiden.com',
    siteName: '日本体育大学駅伝部',
    title: '日本体育大学駅伝部 | 公式ホームページ',
    description: '日体大駅伝部の公式サイトです。箱根駅伝、全日本大学駅伝への挑戦、選手紹介、試合結果、記録を掲載しています。',
    images: [
      {
        url: 'https://nssu-ekiden.com/wp-content/uploads/2025/02/nssuimageog.jpeg',
        width: 1200,
        height: 630,
        alt: '日本体育大学駅伝部 - 公式ホームページ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '日本体育大学駅伝部 | 公式ホームページ',
    description: '日体大駅伝部の公式サイトです。箱根駅伝、全日本大学駅伝への挑戦、選手紹介、試合結果、記録を掲載しています。',
    images: ['https://nssu-ekiden.com/wp-content/uploads/2025/02/nssuimageog.jpeg'],
  },
  icons: {
    icon: [
      { url: 'https://nssu-ekiden.com/wp-content/uploads/2025/02/nssu16-1.jpg', sizes: '16x16', type: 'image/jpeg' },
      { url: 'https://nssu-ekiden.com/wp-content/uploads/2025/02/nssu32-1.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: 'https://nssu-ekiden.com/wp-content/uploads/2025/02/nssu48-1.jpg', sizes: '48x48', type: 'image/jpeg' },
      { url: 'https://nssu-ekiden.com/wp-content/uploads/2025/02/nssu192.jpg', sizes: '192x192', type: 'image/jpeg' },
    ],
    apple: [
      { url: 'https://nssu-ekiden.com/wp-content/uploads/2025/02/nssu192.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // SportsTeam構造化データ
  const sportsTeamSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsTeam',
    name: '日本体育大学駅伝部',
    alternateName: ['日体大駅伝部', '日体駅伝', 'NSSU駅伝部'],
    url: 'https://nssu-ekiden.com',
    logo: 'https://nssu-ekiden.com/wp-content/uploads/2025/02/nssu192.jpg',
    description: '日本体育大学駅伝部の公式ホームページです。箱根駅伝・全日本大学駅伝への挑戦を続ける選手たちの活動、記録、最新情報を発信しています。',
    sport: '駅伝・陸上競技',
    memberOf: {
      '@type': 'EducationalOrganization',
      name: '日本体育大学',
      url: 'https://www.nittai.ac.jp/'
    },
    location: {
      '@type': 'Place',
      name: '日本体育大学',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'JP',
        addressRegion: '神奈川県',
        addressLocality: '横浜市'
      }
    },
    sameAs: [
      'https://x.com/nssu_ekiden',
      'https://www.instagram.com/nssu_ekiden'
    ]
  };

  // WebSite構造化データ（検索対応）
  const websiteSchema = generateWebSiteSchema();
  
  // 箱根駅伝イベント構造化データ
  const hakoneSchema = generateHakoneEkidenSchema(2026);

  return (
    <html lang="ja" suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://nssu-ekiden.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://nssu-ekiden.com" />
        <link rel="preconnect" href="https://ekiden-results.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://ekiden-results.com" />
        {/* 構造化データ: SportsTeam */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsTeamSchema) }}
        />
        {/* 構造化データ: WebSite（検索対応） */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* 構造化データ: 箱根駅伝イベント */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hakoneSchema) }}
        />
      </head>
      <body className={`${inter.className} no-scrollbar-x antialiased`} suppressHydrationWarning={true}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9TYY2HLEB5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9TYY2HLEB5');
          `}
        </Script>

        <SkipLink />
        <ImageProtection>
          <div className="flex flex-col min-h-screen responsive-container">
            <Navigation />
            <main id="main-content" className="flex-grow responsive-container pt-16" tabIndex={-1}>
              {children}
            </main>
            <BackToTop />
            <Footer />
          </div>
        </ImageProtection>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}