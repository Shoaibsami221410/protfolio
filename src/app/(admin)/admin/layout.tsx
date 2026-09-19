import { Toaster } from "sonner";
import "@/app/globals.css";

export const metadata = {
  title: "Master Admin Dashboard",
  description: "Portfolio Control Center",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0510] text-foreground font-sans selection:bg-primary/30">
      {children}
      <Toaster theme="dark" position="top-right" />
    </div>
  );
}
