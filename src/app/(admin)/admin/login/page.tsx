import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If already logged in, go to admin
  if (user) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm p-8 rounded-2xl bg-card border border-white/5 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 border border-primary/30 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <span className="text-xl font-mono text-primary font-bold">Σ</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Control Center</h1>
          <p className="text-sm text-muted">Sign in to manage your portfolio</p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
}
