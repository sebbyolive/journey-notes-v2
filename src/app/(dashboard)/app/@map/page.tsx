import Map from "@/app/components/app/map";

import React from "react";
import "leaflet/dist/leaflet.css";

const MapPage: React.FC = () => {
  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <Map />
      </div>
    </>
  );
};

export default MapPage;
