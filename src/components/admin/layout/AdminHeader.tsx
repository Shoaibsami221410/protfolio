"use client";

import { Menu, LogOut, Bell } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AdminHeader({ 
  toggleSidebar 
}: { 
  toggleSidebar: () => void 
}) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      router.push("/admin/login");
      router.refresh();
    }
  };

  return (
    <header className="h-16 bg-[#0a0510]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-muted hover:text-white transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium text-white/80 hidden sm:block">
          Welcome back, Shoaib
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-muted hover:text-white hover:bg-white/5 transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border border-[#0a0510]"></span>
        </button>
        
        <div className="h-5 w-px bg-white/10 mx-1"></div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
