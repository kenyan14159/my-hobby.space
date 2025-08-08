import type { Metadata } from 'next';
import { getAllNews } from '@/lib/news';

type Params = { params: { year: string; slug: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const fullSlug = `${params.year}/${params.slug}`;
  const item = getAllNews().find((n) => n.slug === fullSlug);

  const title = item ? item.title : 'ニュース';
  const description = item
    ? `${item.title}（${typeof item.date === 'string' ? item.date : ''}）`
    : '日本体育大学駅伝部のニュース';
  const images = item?.image ? [item.image] : [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
    alternates: {
      canonical: `https://nssu-ekiden.com/topics/news/${fullSlug}`,
    },
  };
}

export default function NewsDetailLayoutRoute({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


