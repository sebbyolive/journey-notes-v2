import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function LeafletMap() {
  const position: [number, number] = [51.505, -0.09];

  if (typeof window == "undefined") {
    return;
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={12}
        className="rounded-sm"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>A simple popup. Easily customizable.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
