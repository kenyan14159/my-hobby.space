import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const webLinks = [
  {
    name: "陸上競技部",
    url: "/track-and-field",
    description: "日本体育大学 陸上競技部の公式ページ",
    icon: <ExternalLink className="w-5 h-5 text-purple-500" />,
    image: "https://nssu-ekiden.com/wp-content/uploads/2025/02/nssu192.jpg",
    isInternal: true,
  },
  {
    name: "駅伝リザルト",
    url: "https://www.ekiden-results.com/",
    description: "実業団、大学、高校、中学駅伝の結果",
    icon: <ExternalLink className="w-5 h-5 text-blue-500" />,
    image: "https://ekiden-results.com/WordPress/wp-content/uploads/2025/10/cropped-ekiden1.png",
    isInternal: false,
  },
  {
    name: "スコアリングテーブル",
    url: "https://ekiden-results.com/information/scoring-table/",
    description: "陸上競技スコアリングテーブル",
    icon: <ExternalLink className="w-5 h-5 text-blue-500" />,
    image: "https://ekiden-results.com/WordPress/wp-content/uploads/2025/10/ekiden3.png",
    isInternal: false,
  },
];

export default function WebPage() {
  return (
    <div className="bg-gradient-to-br from-white to-sky-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <AnimatedPageHeader
          title="Webサイト集"
        />
        <div className="mt-6 mb-2">
          <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: 'Webサイト集' }]} />
        </div>


        {/* 関連リンク集 */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-sky-900 mb-6 text-center">関連リンク</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webLinks.map((link) => {
              const CardWrapper = link.isInternal ? Link : 'a';
              const cardProps = link.isInternal 
                ? { href: link.url }
                : { href: link.url, target: "_blank", rel: "noopener noreferrer" };
              
              return (
                <CardWrapper key={link.url} {...cardProps} className="block group">
                  <Card className="hover:shadow-lg transition-shadow duration-200 overflow-hidden h-full cursor-pointer">
                    {/* 画像 */}
                    <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                      <Image
                        src={link.image}
                        alt={link.name}
                        fill
                        loading="lazy"
                        quality={80}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
                      />
                    </div>
                    <CardContent className="flex flex-col items-start gap-4 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        {link.icon}
                        <span className="font-semibold text-lg text-sky-800 group-hover:text-blue-600 transition-colors">{link.name}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{link.description}</p>
                      <div className="text-blue-600 text-sm font-medium flex items-center gap-1">
                        サイトを見る <ExternalLink className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </CardWrapper>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 