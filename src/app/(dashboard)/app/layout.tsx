"use client";

import React from "react";
import { JourneysProvider } from "@/contexts/JourneysContext";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(
  () => import("@/app/components/app/map/leaflet-map"),
  {
    ssr: false,
    loading: () => <p>...Loading</p>,
  }
);

export default function AppLayout({
  children,
  sidebar,
  map,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  map: React.ReactNode;
}) {
  return (
    <JourneysProvider>
      <div className="grid grid-cols-4 p-6 bg-zinc-50 h-full gap-4">
        <div className="col-span-1 bg-slate-100 rounded-md p-6">{sidebar}</div>
        <div className="col-span-3 bg-slate-500 rounded-md p-1">{map}</div>
      </div>
    </JourneysProvider>
  );
}
