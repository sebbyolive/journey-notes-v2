"use server";

import { createClient } from "@/utils/supabase/server";

export async function login(
  formData: FormData
): Promise<{ message?: string } | null> {
  const supabase = await createClient();

  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { message: "Invalid input data. Please try again." };
  }
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    if (error.status === 400) {
      return { message: "No account found with this email." };
    }
    return { message: error.message || "Login failed. Please try again." };
  }

  return null;
}

export async function signup(
  formData: FormData
): Promise<{ message?: string } | { success?: string } | null> {
  const supabase = await createClient();

  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { message: "Invalid input data. Please try again." };
  }

  // Attempt to sign up the user
  const {
    error,
    data: { user },
  } = await supabase.auth.signUp({ email, password });

  if (user) {
    return {
      message: "You already have a JourneyNotes account!",
    };
  } else if (error) return { message: error.message };

  return {
    success:
      "Signup successful! Please check your inbox to verify your account.",
  };
}

export async function resetPassword() {}
