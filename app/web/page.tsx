import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const webLinks = [
  {
    name: "駅伝リザルト",
    url: "https://www.ekiden-results.com/",
    description: "実業団、大学、高校、中学駅伝の結果",
    icon: <ExternalLink className="w-5 h-5 text-blue-500" />,
  },
  {
    name: "スコアリングテーブル",
    url: "https://www.ekiden-results.com/information/scoring-table.html",
    description: "陸上競技スコアリングテーブル",
    icon: <ExternalLink className="w-5 h-5 text-blue-500" />,
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
            {webLinks.map((link) => (
              <Card key={link.url} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="flex flex-col items-start gap-4 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    {link.icon}
                    <span className="font-semibold text-lg text-sky-800">{link.name}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{link.description}</p>
                  <Button asChild variant="link" className="p-0 h-auto text-blue-600">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                      サイトを見る <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 