"use server";

import { createClient } from "@/lib/supabase/server";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { redirect } from "next/navigation";

export async function loginAction(data: LoginInput) {
  // 1. Validate Input Server-Side
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid form data provided." };
  }

  const supabase = await createClient();

  // 2. Authenticate with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (authError) {
    return { error: authError.message };
  }

  if (!authData.user) {
    return { error: "An unknown error occurred during authentication." };
  }

  // 3. Authorize via public.admin_users table
  const { data: adminData, error: adminError } = await supabase
    .from("admin_users")
    .select("role, is_active")
    .eq("user_id", authData.user.id)
    .single();

  if (adminError || !adminData || !adminData.is_active) {
    // If they aren't in the admin_users table or are inactive, log them out immediately
    await supabase.auth.signOut();
    return { error: "Unauthorized access. You do not have active administrative privileges." };
  }

  // 4. Success -> Redirect to dashboard
  redirect("/admin");
}
