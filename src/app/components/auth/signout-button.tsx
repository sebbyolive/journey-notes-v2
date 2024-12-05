"use client";

import { handleSignOut } from "@/lib/handleSignOut";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";

const SignOutButton = () => {
  const router = useRouter();

  const onSignOut = async () => {
    try {
      await handleSignOut();
      router.push("/"); // Redirect after sign-out
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <Button onClick={onSignOut} variant={"destructive"}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
