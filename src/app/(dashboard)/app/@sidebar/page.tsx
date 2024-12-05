"use client";

import React, { useState } from "react";
import { useJourneys } from "@/contexts/JourneysContext";
import { submitJourney } from "@/lib/submitJourney";
import Logo from "@/app/components/ui/logo";
import CityCountryToggle from "@/app/components/app/sidebar/city-country-toggle";
import SignOutButton from "@/app/components/auth/signout-button";
import CityInfo from "@/app/components/app/sidebar/city-info";
import JourneyList from "@/app/components/app/sidebar/journey-list";
import JourneyForm from "@/app/components/app/sidebar/journey-form";
import { type Journey } from "@/contexts/JourneysContext";

type CityInfo = {
  title: string;
  notes: string;
  date_visited: string;
};

export default function AppSidebar() {
  const { journeys, isLoading, draftJourney, dispatch, refreshJourneys } =
    useJourneys();
  const { showDraftJourney, city_name, showCountries = false } = draftJourney;

  const [notesError, setNotesError] = useState(false);
  const [showCityInfo, setShowCityInfo] = useState(false);
  const [cityInfo, setCityInfo] = useState<CityInfo>({
    title: "Title",
    notes: "Notes",
    date_visited: "Date",
  });

  const invalidLocationSelected = city_name === "invalid location";
  const countries = getCountries(journeys);

  return (
    <div className="flex flex-col items-center mt-12 w-full">
      <Logo className="w-72" />
      <p className="mt-12">You have visited...</p>
      <CityCountryToggle />

      {showCityInfo && (
        <CityInfo cityInfo={cityInfo} onClose={() => setShowCityInfo(false)} />
      )}

      {!showDraftJourney && (
        <JourneyList
          isLoading={isLoading}
          showCountries={showCountries}
          journeys={journeys}
          countries={countries}
          dispatch={dispatch}
          setShowCityInfo={setShowCityInfo}
          setCityInfo={setCityInfo}
          refreshJourneys={refreshJourneys}
        />
      )}

      <Footer />

      {showDraftJourney && (
        <JourneyForm
          draftJourney={draftJourney}
          invalidLocationSelected={invalidLocationSelected}
          notesError={notesError}
          setNotesError={setNotesError}
          onSubmit={() =>
            submitJourney({
              draftJourney,
              dispatch,
              refreshJourneys,
              setNotesError,
            })
          }
        />
      )}
    </div>
  );
}

function Footer() {
  return (
    <div className="flex flex-col absolute w-40 bottom-12 justify-center gap-6">
      <h2 className="text-center">
        Click on the map to add a new journey!
        <br />
      </h2>
      <SignOutButton />
    </div>
  );
}

function getCountries(journeys: Journey[]) {
  return Array.from(
    new Map(
      journeys.map((journey) => [
        journey.country,
        { country: journey.country, emoji: journey.emoji },
      ])
    ).values()
  );
}
