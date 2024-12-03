"use client";

import { useState, useEffect } from "react";
import { createEmojiFromCountryCode } from "@/lib/createEmojiFromCountryCode";

// NOT NEEDED ANYMORE
// type ReverseGeocodingResult = {
//   address: {
//     city: string;
//     country: string;
//     country_code: string;
//   };
//   lat: string;
//   lon: string;
// };

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
          console.log("Invalid location clicked"); // i.e. water, etc.
          dispatch({
            type: "update/location",
            payload: {
              city_name: "invalid location",
              country: "invalid location",
              emoji: "",
            },
          });
        }

        if (data.address) {
          dispatch({
            type: "update/location",
            payload: {
              city_name: data.address.city,
              country: data.address.country,
              latitude: data.lat,
              longitude: data.lon,
              emoji: createEmojiFromCountryCode(data.address.country_code),
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
