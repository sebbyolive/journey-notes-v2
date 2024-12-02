import React from "react";
import { Button } from "../../ui/button";

type CityCountryToggleProps = {
  showCountries: boolean;
  setShowCountries: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CityCountryToggle({
  showCountries,
  setShowCountries,
}: CityCountryToggleProps) {
  return (
    <div className="flex mt-4 gap-1">
      <Button
        variant={showCountries ? "outline" : "default"}
        onClick={() => setShowCountries(false)}
      >
        Show Cities
      </Button>
      <Button
        variant={showCountries ? "default" : "outline"}
        onClick={() => setShowCountries(true)}
      >
        Show Countries
      </Button>
    </div>
  );
}
