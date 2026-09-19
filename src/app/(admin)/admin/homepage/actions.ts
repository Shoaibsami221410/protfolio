"use server";

import { createClient } from "@/lib/supabase/server";
import { homepageSchema, type HomepageInput } from "@/lib/validations/homepage";
import { revalidatePath } from "next/cache";

export async function updateHomepageAction(data: HomepageInput) {
  // 1. Validate Input
  const parsed = homepageSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid form data provided." };
  }

  const supabase = await createClient();

  // 2. Authorize
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { error: "Unauthorized access." };
  }

  const { data: adminData, error: adminError } = await supabase
    .from("admin_users")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (adminError || !adminData) {
    return { error: "Unauthorized access. Admin privileges required." };
  }

  // 3. Upsert Content
  const { error } = await supabase
    .from("homepage_content")
    .upsert({ id: 1, ...parsed.data })
    .select()
    .single();

  if (error) {
    console.error("Supabase Error:", error);
    return { error: "Failed to update homepage content. Please try again." };
  }

  // 4. Revalidate cache for the public homepage
  revalidatePath("/");
  
  return { success: true };
}
