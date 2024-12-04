import { useMap, Marker, Popup } from "react-leaflet";
import { type MarkerPropTypes } from "./leaflet-map";

export default function AutomoveMarker({
  position,
  title,
  date_visited,
}: MarkerPropTypes) {
  const map = useMap();

  const handleClick = () => {
    map.setView(position, 12);
  };

  return (
    <Marker position={position} eventHandlers={{ click: handleClick }}>
      <Popup>
        You visited {title} on {date_visited}!
      </Popup>
    </Marker>
  );
}
