import React from "react";
import { Button } from "../../ui/button";

export default function JourneyItem({ journey }: any) {
  const { city_name, notes } = journey;

  return (
    <div className="flex w-full items-center justify-between mt-1.5 bg-slate-200 rounded-lg py-0.5 pl-3">
      <p>{city_name}</p>

      <Button className="font-bold text-red-900" variant="ghost">
        ✕
      </Button>
    </div>
  );
}
