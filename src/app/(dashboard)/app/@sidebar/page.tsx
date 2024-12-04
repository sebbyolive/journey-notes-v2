"use client";
import { Button } from "@/app/components/ui/button";
import Logo from "@/app/components/ui/logo";
import React, { useState } from "react";
import { useJourneys } from "@/contexts/JourneysContext";
import LoadingSpinner from "@/app/components/ui/loading-spinner";
import CityCountryToggle from "@/app/components/app/sidebar/city-country-toggle";
import { signout } from "@/utils/supabase/actions";
import { useSubmitJourney } from "@/hooks/useSubmitJourney";
import JourneyInputs from "@/app/components/app/sidebar/journey-inputs";
import JourneyItem from "@/app/components/app/sidebar/journey-item";
import CountryItem from "@/app/components/app/sidebar/country-item";

export default function AppSidebar() {
  const { journeys, isLoading, draftJourney, dispatch, refreshJourneys } =
    useJourneys();
  const { showDraftJourney, showCountries, city_name } = draftJourney;
  const [notesError, setNotesError] = useState(false);
  const [showCityInfo, setShowCityInfo] = useState(false);
  const [cityInfo, setCityInfo] = useState({
    title: "Test Title",
    notes: "Test Notes",
    date_visited: "Test Date",
  });

  const invalidLocationSelected = city_name === "invalid location";
  const countries = Array.from(
    new Map(
      journeys.map((journey) => [
        journey.country,
        { country: journey.country, emoji: journey.emoji },
      ])
    ).values()
  );

  return (
    <div className="flex flex-col items-center mt-12 w-full">
      <Logo className="w-72" />
      <p className="mt-12">You have visited...</p>
      <CityCountryToggle />

      {showCityInfo && (
        <div className="flex justify-center flex-col mt-8 items-center bg-white p-4 rounded-lg">
          <h1 className="bg-slate-200 py-2 w-80 rounded-md text-center text-xl">
            Your trip to {cityInfo.title}
          </h1>
          <p className="mt-3">
            📍 You went to {cityInfo.title} on {cityInfo.date_visited} 📍
          </p>
          <div className="self-start mt-3 py-4 px-6 bg-slate-100 w-80">
            <h2 className=" font-bold">Travel Notes:</h2>
            <hr className="h-1px my-2 border-slate-400"></hr>
            <p className="">{cityInfo.notes}</p>
          </div>
          <Button
            className="w-40 mt-4"
            variant={"destructive"}
            onClick={() => setShowCityInfo(false)}
          >
            Close Trip Details
          </Button>
        </div>
      )}

      {!showDraftJourney && (
        <div className="mt-6 max-h-[60vh] overflow-y-scroll w-96">
          <ul className="mt-6">
            {isLoading ? (
              <LoadingSpinner />
            ) : showCountries ? (
              countries.map((item, index) => {
                return (
                  <CountryItem
                    key={index}
                    country={item.country}
                    emoji={item.emoji}
                  />
                );
              })
            ) : (
              journeys.map((journey, index) => {
                return (
                  <JourneyItem
                    journey={journey}
                    key={index}
                    dispatch={dispatch}
                    setShowCityInfo={setShowCityInfo}
                    setCityInfo={setCityInfo}
                    refreshJourneys={refreshJourneys}
                  />
                );
              })
            )}
          </ul>
        </div>
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
