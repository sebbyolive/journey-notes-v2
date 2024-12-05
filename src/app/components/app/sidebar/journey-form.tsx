"use client";

import JourneyInputs from "./journey-inputs";
import { Button } from "../../ui/button";
import { type Journey } from "@/contexts/JourneysContext";

type JourneyFormProps = {
  draftJourney: Journey;
  invalidLocationSelected: boolean;
  notesError: boolean;
  setNotesError: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => void;
};

export default function JourneyForm({
  draftJourney,
  invalidLocationSelected,
  notesError,
  onSubmit,
}: JourneyFormProps) {
  return (
    <div className="text-center w-full mt-12">
      <h1 className="text-green-700">Add a New Journey</h1>
      {invalidLocationSelected ? (
        <p className="text-red-700 font-bold">INVALID LOCATION SELECTED</p>
      ) : (
        <h2>{draftJourney.city_name}</h2>
      )}
      <div className="flex flex-col gap-2">
        <JourneyInputs notesError={notesError} />
        <p className="mt-2">
          {draftJourney.date_visited &&
            `Travel Date: ${draftJourney.date_visited}`}
        </p>
        <Button
          onClick={onSubmit}
          className="mx-auto bg-green-500 mt-2"
          variant="outline"
        >
          Submit Journey
        </Button>
      </div>
    </div>
  );
}
