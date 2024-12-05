"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthLinks = () => {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const path = usePathname();
  const inApp = path.startsWith("/app");

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        setUser(data.session.user);
      } else {
        setUser(null);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <>
          {!inApp && (
            <Link href="/app">
              <Button variant={"default"}>Go to App</Button>
            </Link>
          )}
          <Button variant={"ghost"}>Sign Out</Button>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
        </>
      )}
    </div>
  );
};

export default AuthLinks;
