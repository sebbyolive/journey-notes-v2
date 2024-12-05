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
      return {
        message: "Account doesn't exist or login credentials are incorrect",
      };
    }
    return { message: error.message || "Login failed. Please try again." };
  }

  return null;
}

interface SignupParams {
  email: string;
  password: string;
}

interface SignupResponse {
  message?: string;
  success?: string;
}

export async function signup({
  email,
  password,
}: SignupParams): Promise<SignupResponse | null> {
  const supabase = await createClient();

  if (!email || !password) {
    return {
      message: "Invalid input data. Please try again.",
      success: undefined,
    };
  }

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { message: error.message, success: undefined };
  }

  return { message: undefined, success: "true" };
}
