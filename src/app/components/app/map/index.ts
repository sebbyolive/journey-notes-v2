"use client";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/app/components/app/map/leaflet-map"), {
  ssr: false,
});

export default Map;
