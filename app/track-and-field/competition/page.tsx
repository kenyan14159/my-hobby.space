import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Calendar, MapPin, Download, ExternalLink, AlertCircle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";

export default function CompetitionPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* ヒーロー画像＋タイトル */}
      <div className="relative mb-12 rounded-lg overflow-hidden">
        <AspectRatio ratio={16 / 9}>
          <Image
            src="https://nssu-ekiden.com/wp-content/uploads/2025/02/favorite282.jpg"
            alt="日体大競技会"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">日体大競技会</h1>
              <p className="text-lg md:text-xl mb-4 drop-shadow">2025年度 年間6回開催・エントリー受付中</p>
              <Button size="lg" asChild>
                <a href="http://tf.nssu-athletic.com/" target="_blank" rel="noopener noreferrer">
                  エントリーはこちら <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </AspectRatio>
      </div>
      {/* 下部にもAnimatedPageHeaderで統一感＋変化 */}
      <AnimatedPageHeader
        title="日体大競技会について"
        subtitle="開催日程・会場・エントリー・案内・お問い合わせはこちら"
      />
      <div className="max-w-4xl mx-auto">
        <Alert className="mb-8 border-blue-600 bg-blue-50">
          <Info className="h-5 w-5 text-blue-600" />
          <AlertTitle className="text-blue-800 font-bold">お知らせ</AlertTitle>
          <AlertDescription className="text-blue-800">
            年度明けについて初回ログイン時に団体更新をお願い致します。
            尚、登録選手は学年やJAAF IDが変わる関係で再登録が必要となります。
          </AlertDescription>
        </Alert>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-blue-600">2025年度の競技会の日程</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">第148回日本体育大学陸上競技会</h3>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                  <span>2025年3月22日（土）・23日（日）</span>
                </div>
                <Button variant="outline" className="mt-1" asChild>
                  <a href="https://nssu-ekiden.com/wp-content/uploads/2025/03/148回日体大競技会要項.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-2" />
                    大会要項
                  </a>
                </Button>
              </div>

              <div>
                <h3 className="font-bold mb-2">第149回日本体育大学陸上競技会</h3>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                  <span>2025年4月19日（土）・20日（日）</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2">第150回日本体育大学陸上競技会</h3>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                  <span>2025年5月17日（土）・18日（日）</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2">第151回日本体育大学陸上競技会</h3>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                  <span>2025年6月21日（土）・22日（日）</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2">第152回日本体育大学陸上競技会</h3>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                  <span>2025年9月27日（土）・28日（日）</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2">第153回日本体育大学陸上競技会</h3>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                  <span>2025年10月18日（土）・19日（日）</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2">2025年度日体大選手権</h3>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                  <span>2025年11月1日（土）・2日（日）</span>
                </div>
              </div>
            </div>

            <Alert className="mt-6 border-amber-600 bg-amber-50">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <AlertDescription className="text-amber-800">
                学内工事の関係で、競技会開催中の変更などは、競技会案内にてお知らせ致します。
                競技会が開催される前日や、当日にも更新致しますので、参加される方は随時確認するようお願い致します。
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                開催場所
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>日本体育大学 健志台キャンパス 陸上競技場</p>
              <p className="text-sm text-muted-foreground mt-2">
                〒227-0033<br />
                神奈川県横浜市青葉区鴨志田町1221-1
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                駐車について
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3">駐車申請は、エントリー時にページ内から申請をお願い致します。</p>
              <p className="text-sm text-muted-foreground">
                学内工事により駐車可能な台数が減っているため、各所属【1台まで】の申請とします。
                車両は【東門】からの入構をお願い致します。
              </p>
              <Button variant="outline" className="w-full justify-start mt-4" asChild>
                <a href="https://nssu-ekiden.com/wp-content/uploads/2025/03/日体大競技会駐車について.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  駐車について
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Download className="h-5 w-5 mr-2 text-blue-600" />
                競技会案内
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="https://nssu-ekiden.com/wp-content/uploads/2025/03/日体大競技会に参加するには.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  競技会に参加するには
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="https://nssu-ekiden.com/wp-content/uploads/2025/03/日体大競技会振り込みに関して.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  お振込みに関して
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="https://nssu-ekiden.com/wp-content/uploads/2025/02/証明書の発行に関して.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  記録証の発行について
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-12">
          <section id="entry">
            <h2 className="text-2xl font-bold mb-4">エントリー方法</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">エントリーサイト</h3>
                    <p className="mb-4">
                      エントリーは以下のサイトから行ってください。
                    </p>
                    <Button className="mt-2" asChild>
                      <a href="http://tf.nssu-athletic.com/" target="_blank" rel="noopener noreferrer">
                        エントリーサイトへ <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-bold mb-2">陸協・マスターズ個人登録の方へ</h3>
                    <Alert className="border-blue-600 bg-blue-50">
                      <AlertDescription className="text-blue-800">
                        個人登録の場合、登録陸協名・マスターズ名での団体名重複を防ぐため、団体名を「個人名+〇〇陸協」としてください。
                        必ず個人名が先にくるようにしてください。陸協名のみでの申請の場合、申請を棄却とさせて頂きます。
                      </AlertDescription>
                    </Alert>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-bold mb-2">忘れ物について</h3>
                    <p>忘れ物はこちらまで → <a href="mailto:nittai-honbu@d02.itscom.net" className="text-blue-600 hover:underline">nittai-honbu@d02.itscom.net</a></p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">取材申請について</h2>
            <Card>
              <CardContent className="p-6">
                <p className="mb-4">
                  取材を希望される方は、以下の資料をご確認の上、申請をお願いいたします。
                </p>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="https://nssu-ekiden.com/wp-content/uploads/2025/03/日体大競技会取材申請.pdf" target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-2" />
                      取材申請について
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="https://nssu-ekiden.com/wp-content/uploads/2025/03/日体大競技会取材申請ファイル.xlsx" target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-2" />
                      取材申請ファイル
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">お問い合わせ</h2>
            <Card>
              <CardContent className="p-6">
                <p className="mb-4">
                  日体大競技会に関するお問い合わせは、以下の連絡先までお願いいたします。
                </p>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">メールアドレス:</span> nittai-honbu@d02.itscom.net
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}