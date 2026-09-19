import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { HomepageForm } from "./HomepageForm";

export default async function AdminHomepageCMS() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/admin/login");
  }

  // Fetch current homepage content
  const { data: homepageData } = await supabase
    .from("homepage_content")
    .select("*")
    .eq("id", 1)
    .single();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Homepage Manager</h1>
          <p className="text-muted">Edit the content of your public homepage.</p>
        </div>
      </div>

      <HomepageForm initialData={homepageData || null} />
    </div>
  );
}
