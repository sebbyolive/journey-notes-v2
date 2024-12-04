"use client";
import { Button } from "@/app/components/ui/button";
import Logo from "@/app/components/ui/logo";
import React, { useState } from "react";
import { useJourneys } from "@/contexts/JourneysContext";
import LoadingSpinner from "@/app/components/ui/loading-spinner";
import CityCountryToggle from "@/app/components/app/sidebar/city-country-toggle";
import { signout } from "@/utils/supabase/actions";
import JourneyInputs from "@/app/components/app/sidebar/journey-inputs";
import { useSubmitJourney } from "@/hooks/useSubmitJourney";
import JourneyItem from "@/app/components/app/sidebar/journey-item";

export default function AppSidebar() {
  const { journeys, isLoading, draftJourney, dispatch, refreshJourneys } =
    useJourneys();
  const { showDraftJourney, showCountries, city_name } = draftJourney;
  const [notesError, setNotesError] = useState(false);

  const invalidLocationSelected = city_name === "invalid location";
  const countries: string[] = Array.from(
    new Set(journeys.map((journey) => journey.country))
  );

  return (
    <div className="flex flex-col items-center mt-12">
      <Logo className="w-72" />
      <p className="mt-12">You have visited...</p>
      <CityCountryToggle />
      {!showDraftJourney && (
        <ul className="mt-6">
          {isLoading ? (
            <LoadingSpinner />
          ) : showCountries ? (
            countries.map((country, index) => {
              return <li key={index}>{country}</li>;
            })
          ) : (
            journeys.map((journey, index) => {
              return (
                <JourneyItem
                  journey={journey}
                  key={index}
                  dispatch={dispatch}
                />
              );
            })
          )}
        </ul>
      )}

      <div className="flex flex-col absolute bottom-12 justify-center gap-6">
        <h2>Click on the map to add a new journey! 😄</h2>
        <Button variant={"ghost"} onClick={signout}>
          Sign Out of App
        </Button>
      </div>

      {showDraftJourney && (
        <div className="text-center w-full mt-12">
          <h1 className="text-green-700">Add a New Journey</h1>
          {invalidLocationSelected ? (
            <p className="text-red-700 font-bold">INVALID LOCATION SELECTED</p>
          ) : (
            <h2>{city_name}</h2>
          )}
          <div className="flex flex-col gap-2">
            <JourneyInputs notesError={notesError} />
            <p className="mt-2">
              {draftJourney.date_visited &&
                `Travel Date: ${draftJourney.date_visited}`}
            </p>

            <Button
              onClick={() =>
                useSubmitJourney({
                  draftJourney,
                  dispatch,
                  refreshJourneys,
                  setNotesError,
                })
              }
              className="mx-auto bg-green-500 mt-2"
              variant="outline"
            >
              Submit Journey
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
