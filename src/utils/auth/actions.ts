import { supabase } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

type DataTypeProps = {
  email: string;
  password: string;
};

export const handleLogin = async (data: DataTypeProps) => {
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return error.message;
  }

  redirect("/app");
};

export const handleSignup = async (data: DataTypeProps) => {
  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return error.message;
  }

  redirect("/app");
};
