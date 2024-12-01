import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

type LoginProps = {
  email: string;
  password: string;
};

export const handleLogin = async ({ email, password }: LoginProps) => {
  const supabase = createClient();
  const router = useRouter();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
  } else {
    router.push("/");
  }
};
