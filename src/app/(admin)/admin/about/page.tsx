import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AboutForm } from "./AboutForm";

export default async function AdminAboutCMS() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/admin/login");
  }

  // Fetch current about content
  const { data: aboutData } = await supabase
    .from("about_content")
    .select("*")
    .eq("id", 1)
    .single();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">About Section Manager</h1>
          <p className="text-muted">Edit your professional background and biography.</p>
        </div>
      </div>

      <AboutForm initialData={aboutData || null} />
    </div>
  );
}
