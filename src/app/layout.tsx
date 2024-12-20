import type { Metadata } from "next";

import "./globals.css";
import MainNavigation from "./components/navigation/main-navigation";
import Footer from "./components/navigation/footer";

export const metadata: Metadata = {
  title: "JourneyNotes",
  description: "Track your Travels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <MainNavigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
