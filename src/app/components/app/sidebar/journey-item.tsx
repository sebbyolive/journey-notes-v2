import React from "react";
import { Button } from "../../ui/button";
import { deleteJourney } from "@/lib/deleteJourney";
import { type Journey } from "@/contexts/JourneysContext";
import { type DraftJourneyAction } from "@/contexts/JourneysContext";

type cityItemProps = {
  title: string;
  notes: string;
  date_visited: string;
};

type JourneyItemProps = {
  journey: Journey;
  setCityInfo: React.Dispatch<React.SetStateAction<cityItemProps>>;
  setShowCityInfo: React.Dispatch<React.SetStateAction<boolean>>;
  refreshJourneys: () => void;
  dispatch: React.Dispatch<DraftJourneyAction>;
};

export default function JourneyItem({
  journey,
  setCityInfo,
  setShowCityInfo,
  refreshJourneys,
}: JourneyItemProps) {
  const { city_name, country, emoji, notes, id, date_visited } = journey;

  return (
    <div
      onClick={() => {
        setShowCityInfo(true);
        setCityInfo({
          title: city_name,
          notes: notes,
          date_visited: date_visited,
        });
      }}
      className="flex w-full items-center justify-between mt-1.5 bg-slate-200 rounded-lg py-0.5 pl-3"
    >
      <p>
        {emoji} {city_name}, {country}
      </p>

      <Button
        onClick={async (e) => {
          e.stopPropagation();
          setShowCityInfo(false);
          await deleteJourney(id as string, refreshJourneys);
        }}
        className="font-bold text-red-900 hover:bg-red-300 py-2 px-3 rounded-full mr-2"
        variant="ghost"
      >
        ✕
      </Button>
    </div>
  );
}
