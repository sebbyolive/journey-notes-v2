"use client";

import { useEffect } from "react";
import { createEmojiFromCountryCode } from "@/lib/createEmojiFromCountryCode";

export function useReverseGeocoding(
  lat: number | null,
  lng: number | null,
  dispatch: (action: any) => void
): void {
  const BASE_URL = "https://nominatim.openstreetmap.org/reverse?";
  // lat=51.5074&lon=-0.1278&format=json -- example of url ending for reference

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch(`${BASE_URL}lat=${lat}&lon=${lng}&format=json`);

        if (!res) throw new Error("That isn't a valid location");

        const data = await res.json();

        if (!data.address) {
          if (data.error == "Unable to geocode") {
            dispatch({
              type: "update/location",
              payload: {
                city_name: "invalid location",
                country: "",
                emoji: "",
                showDraftJourney: true,
                showCities: false,
                showCountries: false,
              },
            });
          }
        }

        if (data.address) {
          dispatch({
            type: "update/location",
            payload: {
              city_name: data.address.city // some places didn't have city or name
                ? data.address.city
                : data.name
                ? data.name
                : data.address.country, // last chance!
              country: data.address.country,
              latitude: data.lat,
              longitude: data.lon,
              emoji: createEmojiFromCountryCode(data.address.country_code),
              showDraftJourney: true,
              showCities: false,
              showCountries: false,
            },
          });
        }
      } catch (error) {
        console.log((error as Error).message);
      }
    };

    fetchLocation();
  }, [lat, lng]);

  return;
}
