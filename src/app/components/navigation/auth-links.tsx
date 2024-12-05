"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { handleSignOut } from "@/lib/handleSignOut";

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
        <>
          <Link href="/app">
            <button className="btn-primary">Go to App</button>
          </Link>
          <button
            className="btn-secondary"
            onClick={async () => {
              handleSignOut();
              setIsAuthenticated(false);
            }}
          >
            Sign Out
          </button>
        </>
      ) : (
        <Link href="/login">
          <button className="btn-secondary">Login</button>
        </Link>
      )}
    </div>
  );
};

export default AuthLinks;
