// app/contact/page.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Toaster, toast } from "sonner";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Phone, MapPin, Loader2, FileText } from "lucide-react";
import { useState } from "react";
import { AnimatedPageHeader } from "@/components/ui/animated-page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { InfoQuickAccess } from "@/components/info-quick-access";

// バリデーションスキーマの定義
const formSchema = z.object({
  name: z.string().min(2, { message: "お名前を2文字以上で入力してください。" }),
  email: z.string().email({ message: "有効なメールアドレスを入力してください。" }),
  category: z.string({ required_error: "お問い合わせ種類を選択してください。" }),
  message: z.string().min(10, { message: "お問い合わせ内容を10文字以上で入力してください。" }),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

    async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      console.log('フォーム送信開始:', values);

      // カテゴリーの日本語変換
      const categoryMap: { [key: string]: string } = {
        general: '一般的なお問い合わせ',
        support: 'ご支援・サポーター関連',
        media: '取材・メディア関連',
        other: 'その他'
      };

      const categoryJapanese = categoryMap[values.category] || values.category;

      // Formspreeを使用してメール送信
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('category', categoryJapanese);
      formData.append('message', values.message);
      formData.append('_replyto', values.email);
      formData.append('_subject', `【Webサイトお問い合わせ】${categoryJapanese} - ${values.name}様より`);

      // Formspreeに送信
      const response = await fetch('https://formspree.io/f/mrbyzkrj', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || '送信に失敗しました');
      }

      console.log('Formspree送信成功');
      
      toast.success("お問い合わせが送信されました。ありがとうございます！");
      form.reset();
    } catch (error) {
      console.error('送信エラー:', error);
      
      if (error instanceof Error) {
        toast.error(`送信に失敗しました: ${error.message}`);
      } else {
        toast.error("送信に失敗しました。時間をおいて再度お試しください。");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="min-h-screen bg-gradient-to-br from-white to-sky-50 py-12">
        <motion.div 
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: 'チーム情報', href: '/information' }, { label: 'お問い合わせ' }]} />
          </div>
          <AnimatedPageHeader 
            title="お問い合わせ"
            subtitle="ご質問・ご相談など、お気軽にお問い合わせください。"
          />
          
          {/* クイックアクセスボタン */}
          <InfoQuickAccess />
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <Card className="bg-white/80 border-sky-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-sky-800">お問い合わせフォーム</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>お名前</FormLabel>
                            <FormControl>
                              <Input placeholder="山田 太郎" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>メールアドレス</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="example@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>お問い合わせ種類</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="選択してください" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="general">一般的なお問い合わせ</SelectItem>
                                <SelectItem value="support">ご支援・サポーター関連</SelectItem>
                                <SelectItem value="media">取材・メディア関連</SelectItem>
                                <SelectItem value="other">その他</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>お問い合わせ内容</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="お問い合わせ内容をご記入ください。"
                                className="min-h-[150px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="pt-4">
                        <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-lg py-6" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              送信中...
                            </>
                          ) : (
                            "送信する"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="bg-white/80 border-sky-100 shadow-lg h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-sky-800">連絡先</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-gray-700">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-sky-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">住所</h3>
                      <p className="leading-relaxed">
                        〒227-0035<br />
                        神奈川県 横浜市 青葉区 すみよし台 21-7<br />
                        日本体育大学 駅伝合宿所
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-sky-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">電話番号</h3>
                      <p>045-961-6080</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <FileText className="h-6 w-6 text-sky-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">FAX</h3>
                      <p>045-961-6239</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-sky-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">メールアドレス</h3>
                      <a href="mailto:info@nssuekiden.com" className="text-sky-600 hover:underline">
                        info@nssuekiden.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}