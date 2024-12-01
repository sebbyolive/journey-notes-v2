"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

// LOGIN

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error.message);
    return;
  }

  revalidatePath("/login");
}

// SIGN UP
export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return;
  }

  revalidatePath("/");
}

// SIGN OUT

export async function signout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error during signout:", error.message);
    return;
  }

  revalidatePath("/");
}
