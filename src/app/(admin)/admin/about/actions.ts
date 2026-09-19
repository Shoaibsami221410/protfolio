"use server";

import { createClient } from "@/lib/supabase/server";
import { aboutSchema, type AboutInput } from "@/lib/validations/about";
import { revalidatePath } from "next/cache";

export async function updateAboutAction(data: AboutInput) {
  const parsed = aboutSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid form data provided." };
  }

  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { error: "Unauthorized access." };
  }

  // Authorize using the security definer function via a quick rpc or select
  // Actually, RLS handles it. But let's be explicit on the server too.
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) {
    return { error: "Unauthorized access. Admin privileges required." };
  }

  const { error } = await supabase
    .from("about_content")
    .upsert({ id: 1, ...parsed.data })
    .select()
    .single();

  if (error) {
    console.error("Supabase Error:", error);
    return { error: "Failed to update about content. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/about"); // If there is an about page
  
  return { success: true };
}
