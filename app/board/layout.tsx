export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-br from-sky-50 to-sky-100 min-h-screen">
      {children}
    </div>
  );
} 