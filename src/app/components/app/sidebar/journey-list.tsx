"use client";

import LoadingSpinner from "../../ui/loading-spinner";
import CountryItem from "./country-item";
import JourneyItem from "./journey-item";
import {
  type Journey,
  type DraftJourneyAction,
} from "@/contexts/JourneysContext";

type JourneyListProps = {
  isLoading: boolean;
  showCountries: boolean;
  journeys: Journey[];
  countries: { country: string; emoji: string }[];
  dispatch: React.Dispatch<DraftJourneyAction>;
  setShowCityInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setCityInfo: React.Dispatch<
    React.SetStateAction<{ title: string; notes: string; date_visited: string }>
  >;
  refreshJourneys: () => Promise<void>;
};

export default function JourneyList({
  isLoading,
  showCountries,
  journeys,
  countries,
  dispatch,
  setShowCityInfo,
  setCityInfo,
  refreshJourneys,
}: JourneyListProps) {
  return (
    <div className="mt-6 max-h-[60vh] overflow-y-scroll w-96">
      <ul className="mt-6">
        {isLoading ? (
          <LoadingSpinner />
        ) : showCountries ? (
          countries.map((item, index) => (
            <CountryItem
              key={index}
              country={item.country}
              emoji={item.emoji}
            />
          ))
        ) : (
          journeys.map((journey, index) => (
            <JourneyItem
              journey={journey}
              key={index}
              dispatch={dispatch}
              setShowCityInfo={setShowCityInfo}
              setCityInfo={setCityInfo}
              refreshJourneys={refreshJourneys}
            />
          ))
        )}
      </ul>
    </div>
  );
}
