"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useJourneys } from "@/contexts/JourneysContext";
import { latLng, type LatLngExpression, type LatLngLiteral } from "leaflet";
import SetNewLocation from "./set-new-location";
import AutomoveMarker from "./automove-marker";
import { posix } from "path";

export type MarkerPropTypes = {
  position: [number, number];
  title: string;
  date_visited: string;
};

export default function LeafletMap() {
  const { journeys } = useJourneys();
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([
    51.51, -0.09,
  ]);

  const markers: MarkerPropTypes[] = journeys.map((journey) => {
    return {
      position: [Number(journey.latitude), Number(journey.longitude)],
      title: journey.city_name,
      date_visited: journey.date_visited,
    };
  });

  if (typeof window == "undefined") {
    return;
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={mapPosition}
        zoom={12}
        className="rounded-sm"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {markers.map((marker, index) => {
          return (
            <AutomoveMarker
              position={marker.position}
              title={marker.title}
              date_visited={marker.date_visited}
              key={index}
            />
          );
        })}

        <SetNewLocation />
      </MapContainer>
    </div>
  );
}
