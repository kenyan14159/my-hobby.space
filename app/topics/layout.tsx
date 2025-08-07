import { TopicsNavigation } from "@/components/ui/topics-navigation";

export default function TopicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-br from-white to-sky-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        {children}
      </div>
    </div>
  );
}