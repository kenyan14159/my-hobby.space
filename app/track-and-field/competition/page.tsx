import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BackToTop } from "@/components/ui/back-to-top";
import { Calendar, MapPin, Download, ExternalLink, AlertCircle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { TrackFieldQuickAccess } from "@/components/track-field-quick-access";

export default function CompetitionPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* パンくず */}
      <div className="mb-6">
        <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '陸上競技部', href: '/track-and-field' }, { label: '日体大競技会' }]} />
      </div>
      
      <AnimatedPageHeader
        title="日体大競技会"
        subtitle="NSSU Track and Field Meet"
      />
      
      {/* クイックアクセスボタン */}
      <TrackFieldQuickAccess />
      
      {/* ヒーロー画像＋バナー情報 */}
      <div className="relative mb-12 rounded-lg overflow-hidden mt-8">
        <AspectRatio ratio={21 / 9}>
          <Image
            src="https://nssu-ekiden.works/wp-content/uploads/2025/02/favorite282.jpg"
            alt="日体大競技会"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">日体大競技会</h2>
              <p className="text-lg md:text-xl mb-4 drop-shadow">2025年度 年間6回開催・エントリー受付中</p>
              <Button size="lg" asChild>
                <a href="https://nishi-nans21v.com/" target="_blank" rel="noopener noreferrer">
                  エントリーはこちら <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </AspectRatio>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <Alert className="mb-8 border-blue-600 bg-blue-50">
          <Info className="h-5 w-5 text-blue-600" />
          <AlertTitle className="text-blue-800 font-bold">重要なお知らせ</AlertTitle>
          <AlertDescription className="text-blue-800">
            <ul className="list-disc list-inside space-y-2">
              <li>年度明けについて初回ログイン時に団体更新をお願い致します。尚、登録選手は学年やJAAF IDが変わる関係で再登録が必要となります。</li>
              <li><strong>2025年4月よりエントリー方法が変更</strong>されました。NISHIのエントリーシステム「nans21v」を使用します。</li>
              <li><strong>第150回競技会より、2次レースを事前エントリーのみ</strong>とします。詳細は競技会要項をご覧ください。</li>
            </ul>
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
                  <span>2025年3月22日(土)・23日(日)</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2">第149回日本体育大学陸上競技会</h3>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                  <span>2025年4月19日(土)・20日(日)</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2">第150回日本体育大学陸上競技会</h3>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                  <span>2025年5月17日(土)・18日(日)</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2">第151回日本体育大学陸上競技会</h3>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                  <span>2025年6月21日(土)・22日(日)</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2">第152回日本体育大学陸上競技会</h3>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                  <span>2025年9月27日(土)・28日(日)</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2">第153回日本体育大学陸上競技会</h3>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                  <span>2025年10月18日(土)・19日(日)</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2">2025年度日体大選手権</h3>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                  <span>2025年11月1日(土)・2日(日)</span>
                </div>
              </div>
            </div>
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
              <div className="space-y-3">
                <Alert className="border-red-600 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800 text-xs">
                    <strong className="text-sm">【重要】駐車申請について</strong>
                    <ul className="list-disc list-inside mt-1.5 space-y-0.5 text-xs">
                      <li>申請フォームや期日は各競技会要項をご確認ください</li>
                      <li>Googleアカウントにログインの上申請し、証明書として回答を保存してください</li>
                      <li>毎競技会ごと要項に記載の期日までの受け入れとします</li>
                      <li><strong>期日以降の申請はいかなる場合にも受け入れません</strong></li>
                      <li>エントリーと駐車申請は別で申請が必要です</li>
                    </ul>
                  </AlertDescription>
                </Alert>
                
                <p className="text-xs text-muted-foreground">
                  駐車可能台数は各所属【1台まで】とします。満車になることがありますが、その際はご了承ください。<br />
                  車両は<strong className="text-blue-600">正門</strong>から入構ください。
                </p>
                
                <Button variant="outline" size="sm" className="w-full justify-start text-xs" asChild>
                  <a href="https://nssu-ekiden.works/wp-content/uploads/2025/03/日体大競技会駐車について.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="h-3 w-3 mr-2" />
                    駐車について(詳細PDF)
                  </a>
                </Button>
              </div>
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
                <a href="https://nssu-ekiden.works/wp-content/uploads/2025/03/日体大競技会に参加するには.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  競技会に参加するには
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="https://nssu-ekiden.works/wp-content/uploads/2025/03/日体大競技会振り込みに関して.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  お振込みに関して
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="https://nssu-ekiden.works/wp-content/uploads/2025/02/証明書の発行に関して.pdf" target="_blank" rel="noopener noreferrer">
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
                    <Alert className="mb-4 border-amber-600 bg-amber-50">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                      <AlertDescription className="text-amber-800">
                        <strong>2025年4月よりエントリー方法が変更されました。</strong><br />
                        NISHIのエントリーシステム「nans21v」を使用します。
                      </AlertDescription>
                    </Alert>
                    <p className="mb-4">
                      エントリーは以下のサイトから行ってください。
                    </p>
                    <Button className="mt-2" asChild>
                      <a href="https://nishi-nans21v.com/" target="_blank" rel="noopener noreferrer">
                        エントリーサイト（nans21v）へ <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-bold mb-2">2次レースについて</h3>
                    <Alert className="border-blue-600 bg-blue-50">
                      <Info className="h-5 w-5 text-blue-600" />
                      <AlertDescription className="text-blue-800">
                        <strong>第150回競技会より、2次レースを事前エントリーのみとします。</strong><br />
                        詳細は競技会要項をご覧ください。
                      </AlertDescription>
                    </Alert>
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
                  
                  <div className="mt-6">
                    <h3 className="font-bold mb-3">ナンバー（アスリートビブス）について</h3>
                    <Alert className="border-purple-600 bg-purple-50">
                      <Info className="h-5 w-5 text-purple-600" />
                      <AlertDescription className="text-purple-900">
                        <div className="space-y-3">
                          <p className="font-bold">アスリートビブスに記載するナンバーは以下の通りです：</p>
                          
                          <div className="bg-white p-3 rounded border border-purple-200">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-purple-200">
                                  <th className="text-left py-2 px-2">ナンバー範囲</th>
                                  <th className="text-left py-2 px-2">カテゴリー</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-purple-100">
                                  <td className="py-2 px-2 font-mono">1000～1999</td>
                                  <td className="py-2 px-2">小・中学</td>
                                </tr>
                                <tr className="border-b border-purple-100">
                                  <td className="py-2 px-2 font-mono">2000～2999</td>
                                  <td className="py-2 px-2">高校</td>
                                </tr>
                                <tr className="border-b border-purple-100">
                                  <td className="py-2 px-2 font-mono">3000～4999</td>
                                  <td className="py-2 px-2">大学</td>
                                </tr>
                                <tr>
                                  <td className="py-2 px-2 font-mono">5000～6999</td>
                                  <td className="py-2 px-2">一般</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="font-bold text-sm">【重要事項】</p>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              <li>エントリー時に入力する番号は、各カテゴリーの指定された範囲内で参加者の任意で設定する</li>
                              <li>ナンバーは任意だが、<strong>必ず4桁の数字</strong>を入力すること</li>
                              <li><strong>4桁全て違う数字を入力</strong>すること（連番は不可）<br />
                              <span className="text-red-700">例：1234 → ❌不可</span></li>
                              <li>同所属内で同一のナンバーが発生しないようにすること</li>
                              <li>入力されたナンバーは変更となる場合があるため、<strong>確定したナンバーはスタートリストで確認</strong>すること</li>
                            </ul>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
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
                    <a href="https://nssu-ekiden.works/wp-content/uploads/2025/03/日体大競技会取材申請.pdf" target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-2" />
                      取材申請について
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="https://nssu-ekiden.works/wp-content/uploads/2025/03/日体大競技会取材申請ファイル.xlsx" target="_blank" rel="noopener noreferrer">
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
                    <span className="font-medium">メールアドレス:</span>{" "}
                    <a 
                      href="mailto:nittai-honbu@d02.itscom.net" 
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      nittai-honbu@d02.itscom.net
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
      <BackToTop />
    </div>
  );
}