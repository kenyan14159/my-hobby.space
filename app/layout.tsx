import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ImageProtection } from "@/components/ui/image-protection";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: '日本体育大学駅伝部公式 - ホームページ',
    template: '%s | 日本体育大学駅伝部'
  },
  description: '日本体育大学陸上競技部男子駅伝ブロックの公式ウェブサイト。箱根駅伝出場を目指す選手たちの活動、記録、最新情報をお届けします。',
  keywords: ['日本体育大学', '駅伝部', '箱根駅伝', '陸上競技', '大学駅伝', 'NSSU', '日体大'],
  authors: [{ name: '日本体育大学陸上競技部男子駅伝ブロック' }],
  creator: '日本体育大学陸上競技部男子駅伝ブロック',
  publisher: '日本体育大学陸上競技部男子駅伝ブロック',
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
    title: '日本体育大学駅伝部公式 - ホームページ',
    description: '日本体育大学陸上競技部男子駅伝ブロックの公式ウェブサイト。箱根駅伝出場を目指す選手たちの活動、記録、最新情報をお届けします。',
    images: [
      {
        url: 'https://nssu-ekiden.com/wp-content/uploads/2025/02/nssuimageog.jpeg',
        width: 1200,
        height: 630,
        alt: '日本体育大学駅伝部',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '日本体育大学駅伝部公式 - ホームページ',
    description: '日本体育大学陸上競技部男子駅伝ブロックの公式ウェブサイト。箱根駅伝出場を目指す選手たちの活動、記録、最新情報をお届けします。',
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
    google: 'your-google-verification-code', // Google Search Consoleで取得したコードに置き換えてください
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsTeam',
    name: '日本体育大学陸上競技部男子駅伝ブロック',
    alternateName: '日体大駅伝部',
    url: 'https://nssu-ekiden.com',
    logo: 'https://nssu-ekiden.com/wp-content/uploads/2025/02/nssu192.jpg',
    description: '日本体育大学陸上競技部男子駅伝ブロックの公式ウェブサイト。箱根駅伝出場を目指す選手たちの活動、記録、最新情報をお届けします。',
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
        {/* 画像ホストへの接続最適化 */}
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
            <main className="flex-grow responsive-container">
              {children}
            </main>
            <Footer />
          </div>
        </ImageProtection>
      </body>
    </html>
  );
}