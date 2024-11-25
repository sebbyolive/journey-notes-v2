import { supabase } from "../supabase/client";
import { redirect } from "next/navigation";

export async function redirectUser(
  redirectLocation: string,
  redirectUser: boolean
) {
  const { data: user } = await supabase.auth.getUser();

  if (redirectUser ? user : !user) {
    redirect(redirectLocation);
  }

  return;
}
