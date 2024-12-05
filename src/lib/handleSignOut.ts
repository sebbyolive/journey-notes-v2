import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export const handleSignOut = async () => {
  const supabase = createClient();
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  } catch (error) {
    console.error("Sign out failed:", (error as Error).message);
    throw error;
  }

  redirect("/");
};
