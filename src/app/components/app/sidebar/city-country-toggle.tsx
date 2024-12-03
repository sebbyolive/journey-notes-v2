import React from "react";
import { Button } from "../../ui/button";
import { useJourneys } from "@/contexts/JourneysContext";

export default function CityCountryToggle() {
  const { draftJourney, dispatch } = useJourneys();
  const { showCities, showCountries } = draftJourney;

  return (
    <div className="flex mt-4 gap-1">
      <Button
        variant={showCities ? "default" : "outline"}
        onClick={() =>
          dispatch({
            type: "update/changeSidebarUI",
            payload: {
              showCities: true,
              showCountries: false,
              showDraftJourneys: false,
            },
          })
        }
      >
        Show Cities
      </Button>
      <Button
        variant={showCountries ? "default" : "outline"}
        onClick={() =>
          dispatch({
            type: "update/changeSidebarUI",
            payload: {
              showCities: false,
              showCountries: true,
              showDraftJourneys: false,
            },
          })
        }
      >
        Show Countries
      </Button>
    </div>
  );
}
