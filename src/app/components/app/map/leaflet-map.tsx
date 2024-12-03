"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useJourneys } from "@/contexts/JourneysContext";
import { type LatLngExpression, type LatLngLiteral } from "leaflet";
import SetNewLocation from "./set-new-location";

export default function LeafletMap() {
  const { journeys } = useJourneys();
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([
    51.51, -0.09,
  ]);

  const markers: LatLngExpression[] = Array.from(
    journeys.map((journey) => [
      parseFloat(journey["latitude"]),
      parseFloat(journey["longitude"]),
    ])
  );

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

        {markers.map((LatLngPos, index) => {
          return <Marker position={LatLngPos} key={index}></Marker>;
        })}
        <SetNewLocation />
      </MapContainer>
    </div>
  );
}
