"use client";

import { useState } from "react";
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ListOrdered, FileText, LockKeyhole } from "lucide-react";

// --- データ定義 (箱根駅伝区間分析) ---
const analysisData = [
    {
        title: "第101回箱根駅伝区間分析",
        links: [
            { label: "1区", url: "https://nssu-ekiden.com/wp-content/uploads/2025/02/第101回箱根駅伝区間分析1区.pdf" },
            { label: "2区", url: "https://nssu-ekiden.com/wp-content/uploads/2025/02/第101回箱根駅伝区間分析2区.pdf" },
            { label: "3区", url: "https://nssu-ekiden.com/wp-content/uploads/2025/02/第101回箱根駅伝区間分析3区.pdf" },
            { label: "4区", url: "https://nssu-ekiden.com/wp-content/uploads/2025/02/第101回箱根駅伝区間分析4区.pdf" },
            { label: "5区", url: "https://nssu-ekiden.com/wp-content/uploads/2025/02/第101回箱根駅伝区間分析5区.pdf" },
            { label: "6区", url: "https://nssu-ekiden.com/wp-content/uploads/2025/02/第101回箱根駅伝区間分析6区.pdf" },
            { label: "7区", url: "https://nssu-ekiden.com/wp-content/uploads/2025/02/第101回箱根駅伝区間分析7区.pdf" },
            { label: "8区", url: "https://nssu-ekiden.com/wp-content/uploads/2025/02/第101回箱根駅伝区間分析8区.pdf" },
            { label: "9区", url: "https://nssu-ekiden.com/wp-content/uploads/2025/02/第101回箱根駅伝区間分析9区.pdf" },
            { label: "10区", url: "https://nssu-ekiden.com/wp-content/uploads/2025/02/第101回箱根駅伝区間分析10区.pdf" },
        ]
    },
    {
        title: "第100回箱根駅伝区間分析",
        links: [
            { label: "1区", url: "https://nssu-ekiden.com/wp-content/uploads/2025/02/第100回箱根駅伝1区区間分析.pdf" },
            { label: "2区", url: "https://nssu-ekiden.com/wp-content/uploads/2025/02/第100回箱根駅伝2区区間分析.pdf" },
            { label: "3区", url: "https://nssu-ekiden.com/wp-content/uploads/2025/02/第100回箱根駅伝3区区間分析.pdf" },
            { label: "4区", url: "https://nssu-ekiden.com/wp-content/uploads/2025/02/第100回箱根駅伝4区区間分析.pdf" },
            { label: "5区", url: "https://nssu-ekiden.com/wp-content/uploads/2025/02/第100回箱根駅伝5区区間分析.pdf" },
            { label: "6区", url: "https://nssu-ekiden.com/wp-content/uploads/2025/02/第100回箱根駅伝6区区間分析.pdf" },
            { label: "7区", url: "https://nssu-ekiden.com/wp-content/uploads/2025/02/第100回箱根駅伝7区区間分析.pdf" },
            { label: "8区", url: "https://nssu-ekiden.com/wp-content/uploads/2025/02/第100回箱根駅伝8区区間分析.pdf" },
            { label: "9区", url: "https://nssu-ekiden.com/wp-content/uploads/2025/02/第100回箱根駅伝9区区間分析.pdf" },
            { label: "10区", url: "https://nssu-ekiden.com/wp-content/uploads/2025/02/第100回箱根駅伝10区区間分析.pdf" },
        ]
    }
];

// --- メインコンポーネント ---
export default function HakoneAnalysisPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navButtons: { href: string; label: string; variant?: 'default' | 'outline' }[] = [
        { href: "/limited-content/content", label: "限定コンテンツ", variant: 'outline' },
        { href: "/limited-content/records/", label: "PBランキング", variant: 'outline' },
        { href: "/limited-content/analysis/hakone", label: "箱根駅伝区間分析", variant: 'default' },
        { href: "/limited-content/album", label: "アルバム", variant: 'outline' },
    ];

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === '1010') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('パスワードが違います。');
            setPassword('');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Card className="w-full max-w-sm mx-4">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">㊙ 箱根駅伝区間分析</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handlePasswordSubmit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <p className="text-sm text-muted-foreground">
                                        閲覧するにはパスワードが必要です。
                                    </p>
                                    <Input 
                                        id="password" 
                                        type="password" 
                                        placeholder="パスワードを入力"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {error && <p className="text-sm text-red-500">{error}</p>}
                            </div>
                            <Button className="w-full mt-4" type="submit">
                                <LockKeyhole className="mr-2 h-4 w-4" />
                                認証
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <div className="mb-6">
                    <Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '限定コンテンツ', href: '/limited-content' }, { label: '箱根駅伝区間分析' }]} />
                </div>
                {/* 上部ナビゲーション（形状を統一） */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {navButtons.map(({ href, label, variant }) => (
                            <Link key={href} href={href} passHref>
                                <Button 
                                    variant={variant}
                                    size="sm"
                                    className="text-xs rounded-full px-4"
                                >
                                    {label}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
                        ㊙︎<span className="text-blue-600">箱根駅伝区間分析</span>
                    </h1>
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center text-2xl">
                            <ListOrdered className="mr-3 text-blue-600" />
                            大会別 区間分析レポート
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* 【修正点】defaultValueを削除し、初期状態を閉じる */}
                        <Accordion type="single" collapsible className="w-full">
                            {analysisData.map((item, index) => (
                                <AccordionItem value={`item-${index}`} key={item.title}>
                                    <AccordionTrigger className="text-lg font-semibold">
                                        {item.title}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-2">
                                            {item.links.map((link) => (
                                                <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.label}>
                                                    <Button variant="outline" className="w-full">
                                                        <FileText className="mr-2 h-4 w-4" />
                                                        {link.label}
                                                    </Button>
                                                </a>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>

                {/* 下部ナビゲーション（形状を統一） */}
                <div className="mt-8">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {navButtons.map(({ href, label, variant }) => (
                            <Link key={href} href={href} passHref>
                                <Button 
                                    variant={variant}
                                    size="sm"
                                    className="text-xs rounded-full px-4"
                                >
                                    {label}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}