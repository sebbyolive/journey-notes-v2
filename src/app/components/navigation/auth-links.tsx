"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import SignOutButton from "../auth/signout-button";
import { Button } from "../ui/button";

const AuthLinks = () => {
  const supabase = createClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication state
  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
    };

    checkAuthStatus();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => setIsAuthenticated(!!session)
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="flex gap-4">
      {isAuthenticated ? (
        <div className="flex items-center justify-center gap-4">
          <Link href="/app">
            <Button className="btn-primary">Go to App</Button>
          </Link>
          <SignOutButton />
        </div>
      ) : (
        <Link href="/login">
          <button className="btn-secondary">Login</button>
        </Link>
      )}
    </div>
  );
};

export default AuthLinks;
