"use client";
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { signup } from "@/utils/supabase/actions";

export function SignupForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.set("email", email);
    formData.set("password", password);

    const result = await signup(formData);

    if (!result) {
      setError("An unknown error occurred. Please try again.");
      return;
    }
    if ("message" in result && result.message) {
      setError(result.message);
    } else if ("success" in result && result.success) {
      setSuccess(true); // Safely access success
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Signup to JourneyNotes</CardTitle>
        <CardDescription>
          Enter your email below to create your JourneyNotes account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="seb@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {success && (
              <div className="text-green-500 text-sm">
                Signup successful! Please check your email to continue.
              </div>
            )}
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account? {""}
          <Link href="/login" className="underline">
            Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
