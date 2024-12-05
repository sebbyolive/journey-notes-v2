import { createClient } from "@/utils/supabase/client";

export const handleSignOut = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error during sign-out:", error.message);
    throw error;
  }
};
