"use client";
import { Button } from "@/app/components/ui/button";
import Logo from "@/app/components/ui/logo";
import React, { useState } from "react";
import { useJourneys } from "@/contexts/JourneysContext";
import LoadingSpinner from "@/app/components/ui/loading-spinner";
import CityCountryToggle from "@/app/components/app/sidebar/city-country-toggle";
import { signout } from "@/utils/supabase/actions";

export default function AppSidebar() {
  const { journeys, isLoading } = useJourneys();
  const [showCountries, setShowCountries] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center mt-12">
      <Logo className="w-72" />
      <p className="mt-12">You have visited...</p>
      <CityCountryToggle
        setShowCountries={setShowCountries}
        showCountries={showCountries}
      />
      <ul className="mt-6">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          journeys.map((journey, index) => {
            return <li key={index}>{journey["id"]}</li>;
          })
        )}
      </ul>

      <Button
        className="absolute bottom-12"
        variant={"ghost"}
        onClick={signout}
      >
        Sign Out of App
      </Button>
    </div>
  );
}
