import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "入部案内 | 日本体育大学陸上競技部",
  description: "日本体育大学陸上競技部の入部案内。各ブロック紹介、施設紹介、入部条件など入部を検討している学生向けの情報を掲載しています。",
};

const blocks = [
  {
    name: "短距離ブロック",
    schedule: "月　火　水　金　7:45～\n月　火　水　金　16:40〜\n土　　　　　　　9:30〜",
    holidays: "木　日",
    partTimeJob: "可能",
    facilities: "寮あり　短距離合宿所（男子）　健志台桜寮（女子）",
    atmosphere: "男子、女子共に元気で楽しく練習をしています。100人を超える選手が学年問わず、コミュニケーションを大切にしてみんなで一つの目標に向かって切磋琢磨して日々の練習に励んでいます。",
    message: "目標に向かいブロック関係なく盛り上げ、楽しく真剣に練習しています。選手、マネージャー共にお待ちしています！是非是非日体大陸上競技部へ！",
    color: "bg-blue-50 border-blue-200",
  },
  {
    name: "中距離ブロック",
    schedule: "月　火　水　金　土　朝練習6：30（寮生のみ）本練習16:30～19:00",
    holidays: "木　日",
    partTimeJob: "可能",
    facilities: "寮あり　中距離合宿所（男子）　女子合宿所（女子）　※入寮制限なし",
    atmosphere: "男女・学年関係なく仲が良い　ON・OFFの切り替えができる",
    message: "自分に合った練習ができるので自己ベストを出している人がたくさんいます！\nマネージャー募集中です！",
    color: "bg-sky-50 border-sky-200",
  },
  {
    name: "男子駅伝ブロック",
    schedule: "月　火　水　木　金　土　朝練習6:00～7:30　午後17:00～19:00（木はなし）",
    holidays: "日",
    partTimeJob: "不可",
    facilities: "寮あり　男子駅伝合宿所（入寮制限なし）",
    atmosphere: "箱根駅伝上位を目指して日々、生活練習を送っています。",
    message: "箱根駅伝上位を目指して共に頑張りましょう！",
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    name: "女子駅伝ブロック",
    schedule: "月　火　水　木　金　土　朝練習6:00～7:30　本練習16:40～19:00",
    holidays: "水：本練習なし　　日：1日フリー",
    partTimeJob: "可能（寮則、授業時間厳守）",
    facilities: "基本全寮制（女子駅伝寮）",
    atmosphere: "ONとOFFの切り替えができる。学年を越えて仲が良い。",
    message: "一緒に頑張りましょう！",
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    name: "跳躍ブロック",
    schedule: "月　火　水(ウエイト) 金　土",
    holidays: "木　日",
    partTimeJob: "可能",
    facilities: "寮あり　健志台合宿寮（男子）　健志台桜寮（女子）",
    atmosphere: "学年関係なく、和気あいあいとした雰囲気だが、練習には真剣に取り組むことができる",
    message: "女子棒高跳は木曜日練習があります。OBの先輩方も多く来てくれます。\n初心者の方も大歓迎です！待ってます！",
    color: "bg-purple-50 border-purple-200",
  },
  {
    name: "投擲ブロック",
    schedule: "月　火　水　金　土　平日16:45～21:00　休日9:30～",
    holidays: "木　土",
    partTimeJob: "可能",
    facilities: "寮あり",
    atmosphere: "チーム一丸となり、全員が同じ方向を向き、目標に向かってコツコツ毎日頑張っている。お互いに応援し合える集団である。",
    message: "投擲ブロックでは全員が目標に向けて毎日練習に取り組んでいます。皆さんも日体大投擲ブロックでしか味わえないこと、時間を一緒に過ごして部員と強くなりませんか？未経験者でも強くなりたいという強い気持ちがある方大歓迎です。投擲ブロックとして一緒に頑張りましょう。",
    color: "bg-orange-50 border-orange-200",
  },
  {
    name: "混成ブロック",
    schedule: "月　火　木　金　土　平日17:00～　土祝9:00～",
    holidays: "水（active rest）、日",
    partTimeJob: "可能",
    facilities: "寮あり　健志台合宿寮（男子）健志台桜寮（女子）",
    atmosphere: "毎日笑いが絶えない",
    message: "やる気があれば十分です。日体大混成ブロック一同お待ちしています。",
    color: "bg-pink-50 border-pink-200",
  },
  {
    name: "パラブロック",
    schedule: "土12:00～",
    holidays: "-",
    partTimeJob: "-",
    facilities: "健志台キャンパス、世田谷キャンパス",
    atmosphere: "男子4人(OB2人,OG3人)",
    message: "ブロック費：15万円\n出場予定：4月パラ陸上選手権、10月パラアジア大会",
    achievements: [
      "2016年リオデジャネイロパラリンピックT47女子400m3位",
      "2017年世界ジュニアT47男子100m,400m,走幅跳　優勝",
      "2017年パラ世界陸上T47女子400m 3位",
      "2019年世界ジュニアF38 円盤、砲丸　優勝",
      "2019年パラ世界陸上T63 走幅跳 3位",
      "2021年東京パラリンピック　T47 9位　T63 4位",
      "2022 日本パラ、ジャパンパラ選手権　全員入賞",
      "文部科学大臣賞スポーツ功労賞　受賞者5名",
    ],
    color: "bg-green-50 border-green-200",
  },
  {
    name: "トレーナーブロック",
    schedule: "月　火　水　木（混成担当のみ）金　土",
    holidays: "木、日　（混成担当は水、日）",
    partTimeJob: "可能",
    facilities: "寮なし",
    atmosphere: "個性豊かなメンバーが、毎日全力で選手をサポートしています。",
    message: "経験など一切要りません！必要なのはやる気のみ！\n主な仕事内容：ストレッチ、テーピング、マニュアルコンディショニング、救護活動",
    color: "bg-teal-50 border-teal-200",
  },
];

const facilities = [
  {
    name: "トレーニングセンター",
    subtitle: "強くなるための機材が揃う",
    description: "日本体育大学には国内屈指のトレーニングマシンを完備されており、施設は基本的に誰でも自由に使用でき毎日たくさんのクラブの選手たちが誰にも負けない屈強な体を作るためトレーニングを行なっています。",
  },
  {
    name: "学生食堂",
    subtitle: "日本一を支える大食堂",
    description: "学生食堂には座席が約500席あり、大勢の方が利用できます。メニューはとても豊富なのに加えて、コンビニや売店も併設しているので食事の選択肢が多く、日頃からたくさんの日体生が通う素晴らしい食堂です。学生食堂の他にも、昨年オープンした体育大とは思えないほどオシャレな「からくさ食堂」や、ご飯おかわりし放題の「選手村」といった計3店の食堂を構えています。",
  },
  {
    name: "スポーツキュアセンター",
    subtitle: "アスリートを完璧にサポート",
    description: "キュアセンターでは怪我の応急処置はもちろん競技復帰までのトータルサポート、試合前のコンディショニング、部活後の身体のケアまで幅広いサポートを受けることができます。また最新の医療器具が完備されており日体生にとってなくてはならない施設です。キャンパスに併設されており通院のしやすさからも多くの支持を集めています。",
  },
  {
    name: "陸上競技場",
    subtitle: "120有余年の歴史と伝統ある競技場",
    description: "日本体育大学陸上競技場の400ｍトラックはブルータータン仕様、ナイター照明付きで、多くの好記録や日本記録が誕生した歴史と伝統ある競技場です。そして毎日300名を超える部員たちが練習しており、今でもその伝統と歴史は引き継がれています。",
  },
];

export default function RecruitmentPage() {
  return (
    <main className="max-w-7xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: "ホーム", href: "/" },
            { label: "陸上競技部", href: "/track-and-field" },
            { label: "入部案内" },
          ]}
        />
      </div>

      <AnimatedPageHeader title="入部案内" />

      {/* 非公式サイト注意書き */}
      <section className="mt-6 mb-8">
        <Card className="p-4 bg-yellow-50 border-2 border-yellow-300">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-700 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-900 mb-2 text-sm">注意事項</h3>
              <p className="text-xs text-gray-700">
                このページの情報は参考情報です。入部に関する最新の詳細情報や正確な条件については、
                必ず陸上競技部に直接お問い合わせいただき、ご確認ください。
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* メッセージセクション */}
      <section className="mt-8 mb-12">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
          <h2 className="text-xl font-bold text-center mb-4 text-blue-900">
            入部を検討している学生へ
          </h2>
          <div className="text-sm text-gray-700 space-y-3">
            <p className="text-center font-semibold">
              人は、経験によって成長します。<br />
              良い経験は挑戦することによってしか得られません。
            </p>
            <p>
              施設紹介に記載されている通り本学には、陸上競技に専念できる環境が十分に揃っています。
              また、陸上部以外にも日本代表として活躍する選手が名を連ね、先生方の指導力や知識、経験は今現在も日本のスポーツ界を支え続けています。
            </p>
            <p>
              日体大陸上競技部は、日本一の部員数を誇る体育会であり、長い歴史と伝統を現在も引き継いでいます。競技力も代表レベルから初心者までと間口が広く、各々が刺激し合い様々なことに挑戦しています。
            </p>
            <p className="text-center font-bold text-sm text-blue-900 pt-3">
              このサイトを見てくれた入部希望者の君。<br />
              環境はもう揃っています。あとは君の挑戦次第で、成長できる大学生活を送れます。<br />
              貴重な大学４年間を、我が部の仲間として共に過ごし、共に挑戦していきましょう。<br />
              競技場で、あなたのことをお待ちしています。
            </p>
          </div>
        </Card>
      </section>

      {/* 各ブロック紹介 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">各ブロック紹介</h2>
        <div className="space-y-4">
          {blocks.map((block, index) => (
            <Card key={index} className={`p-4 ${block.color} border`}>
              <h3 className="text-lg font-bold mb-3">{block.name}</h3>
              <div className="grid md:grid-cols-2 gap-3 mb-3">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1 text-xs">練習日</h4>
                  <p className="text-xs whitespace-pre-line">{block.schedule}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1 text-xs">休日</h4>
                  <p className="text-xs">{block.holidays}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1 text-xs">アルバイト</h4>
                  <p className="text-xs">{block.partTimeJob}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1 text-xs">施設情報</h4>
                  <p className="text-xs">{block.facilities}</p>
                </div>
              </div>
              <div className="mb-2">
                <h4 className="font-semibold text-gray-700 mb-1 text-xs">ブロックの雰囲気</h4>
                <p className="text-xs">{block.atmosphere}</p>
              </div>
              <div className="bg-white/50 p-3 rounded">
                <h4 className="font-semibold text-gray-700 mb-1 text-xs">入部前に伝えたいこと</h4>
                <p className="text-xs whitespace-pre-line">{block.message}</p>
              </div>
              {block.achievements && (
                <div className="mt-3 bg-white/50 p-3 rounded">
                  <h4 className="font-semibold text-gray-700 mb-2 text-xs">主な実績</h4>
                  <ul className="text-xs space-y-0.5 list-disc list-inside">
                    {block.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* 施設紹介 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">施設紹介</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {facilities.map((facility, index) => (
            <Card key={index} className="p-4 bg-gray-50 border border-gray-200">
              <h3 className="text-base font-bold mb-1">{facility.name}</h3>
              <p className="text-xs text-blue-600 font-semibold mb-2">
                〜{facility.subtitle}〜
              </p>
              <p className="text-xs text-gray-700">{facility.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* 部員募集 */}
      <section className="mb-10">
        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border border-orange-200">
          <h2 className="text-2xl font-bold mb-4 text-center">部員募集</h2>
          <div className="space-y-3">
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <h3 className="font-semibold text-gray-700 mb-1 text-sm">活動場所</h3>
                <p className="text-xs">日本体育大学横浜健志台キャンパス陸上競技場</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-1 text-sm">活動日時</h3>
                <div className="text-xs space-y-0.5">
                  <p>短距離・中距離・跳躍・投擲 → 月・火・水・金・土</p>
                  <p>混成 → 月・火・木・金・土</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-1 text-sm">活動時間</h3>
                <div className="text-xs space-y-0.5">
                  <p>授業期間中 → 16時15分～</p>
                  <p>休日・休み期間中 → 9時～</p>
                </div>
              </div>
            </div>
            <div className="bg-white/50 p-3 rounded mt-3">
              <p className="text-xs text-gray-600">
                ※見学、体験は選手かコーチ、先生方に連絡するか声をかけていただき、この時間内にお願いいたします。
              </p>
              <p className="text-xs text-gray-600 mt-1">
                ※ただし新型コロナウイルスの影響により当面の間活動場所が学内でなくなるので、学内での見学はできません。
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* 入部条件 */}
      <section className="mb-10">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
          <h2 className="text-2xl font-bold mb-4 text-center">入部条件</h2>
          <p className="text-center text-sm">
            <strong>男女駅伝ブロック以外のブロックでは、入部基準は基本的に設けておりません。</strong>
          </p>
        </Card>
      </section>

      <div className="text-center text-xs text-gray-500 mt-8 space-y-2">
        <p>※このページの情報は参考情報です。</p>
        <p>詳細やお問い合わせは、必ず陸上競技部に直接ご連絡ください。</p>
      </div>
    </main>
  );
}
