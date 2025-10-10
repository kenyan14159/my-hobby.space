import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ImageProtection } from "@/components/ui/image-protection";
import { BackToTop } from "@/components/ui/back-to-top";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
  const isDevelopment = process.env.NODE_ENV === 'development';
  const jsonLd = {
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
      'https://nssu-ekiden.com'
    ]
  };

  return (
    <html lang="ja" suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://nssu-ekiden.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://nssu-ekiden.com" />
        <link rel="preconnect" href="https://ekiden-results.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://ekiden-results.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} no-scrollbar-x`} suppressHydrationWarning={true}>
        <ImageProtection>
          <div className="flex flex-col min-h-screen responsive-container">
            <Navigation />
            <main className="flex-grow responsive-container pt-16">
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