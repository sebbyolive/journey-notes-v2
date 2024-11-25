"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { handleLogin, handleSignup } from "@/utils/auth/actions";
import { redirectUser } from "@/utils/auth/redirectUser";
import { supabase } from "@/utils/supabase/client";

export default function Login() {
  redirectUser("/app", true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pageType, setPageType] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const data = {
    email: email,
    password: password,
  };

  const router = useRouter();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const { data } = await supabase.auth.getUser();
      if (data) {
        console.log(data);
        router.push("/app");
      }
    };

    checkLoggedIn();
  }, [supabase, router]);

  return (
    <main>
      <div>
        <h1>{pageType === "login" ? "Login" : "Signup"}</h1>
        <form
          onSubmit={
            pageType === "login"
              ? () => handleLogin(data)
              : () => handleSignup(data)
          }
        >
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {pageType === "login" ? (
            <button type="submit">Login</button>
          ) : (
            <button type="submit">Signup</button>
          )}
        </form>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
        {pageType === "login" ? (
          <p>
            Don't have an account?{" "}
            <button onClick={() => setPageType("signup")}>Signup</button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button onClick={() => setPageType("login")}>Login</button>
          </p>
        )}
      </div>
    </main>
  );
}
