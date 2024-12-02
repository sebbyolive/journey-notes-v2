"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const path = usePathname();

  const inApplication = path.startsWith("/app");
  if (inApplication) return;

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-4 sm:py-12 lg:px-8">
        <p className=" text-center text-sm/6 text-gray-600">
          &copy; 2024 JourneyNotes, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
