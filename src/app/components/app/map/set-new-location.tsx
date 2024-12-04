"use client";

import { useState } from "react";
import { useMapEvents } from "react-leaflet";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useJourneys } from "@/contexts/JourneysContext";
import { useReverseGeocoding } from "@/hooks/useReverseGeocoding";

export default function SetNewLocation(): React.ReactElement | null {
  const search = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const { dispatch, draftJourney } = useJourneys();

  useReverseGeocoding(lat, lng, dispatch);

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setLat(lat);
      setLng(lng);

      const newParams = new URLSearchParams(search.toString());
      newParams.set("lat", String(lat));
      newParams.set("lng", String(lng));
      router.push(`${path}?${newParams}`);
    },
  });

  return null;
}
