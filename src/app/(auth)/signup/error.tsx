"use client";
import { SignupForm } from "@/app/components/auth/signup-form";

export default function ErrorPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <div className="flex flex-col justify-center items-center">
        <SignupForm />
        <h1 className="text-red-700">
          Please enter a valid email and password combination.
        </h1>
      </div>
    </div>
  );
}
