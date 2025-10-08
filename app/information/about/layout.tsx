import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '駅伝部について - チーム紹介・歴史・理念',
  description: '日本体育大学陸上競技部男子駅伝ブロックの紹介。チームの歴史、理念、活動方針、箱根駅伝への挑戦について。藤本監督のもと、箱根路復活を目指すチームの軌跡。',
  keywords: [
    '日体大駅伝 歴史',
    '駅伝部 紹介',
    '藤本監督',
    '箱根駅伝 日体大',
    'チーム理念',
    '陸上競技部',
  ],
  openGraph: {
    title: '駅伝部について - チーム紹介・歴史・理念 | 日本体育大学駅伝部',
    description: '日体大駅伝部の歴史、理念、活動方針。箱根駅伝復活を目指すチームの挑戦。',
    url: 'https://nssu-ekiden.com/information/about',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nssu-ekiden.com/information/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
