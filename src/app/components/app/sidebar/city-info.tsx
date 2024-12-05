"use client";

import { Button } from "../../ui/button";

type CityInfoProps = {
  cityInfo: {
    title: string;
    date_visited: string;
    notes: string;
  };
  onClose: () => void;
};
export default function CityInfo({ cityInfo, onClose }: CityInfoProps) {
  return (
    <div className="flex justify-center flex-col mt-8 items-center bg-white p-4 rounded-lg">
      <h1 className="bg-slate-200 py-2 w-80 rounded-md text-center text-xl">
        Your trip to {cityInfo.title}
      </h1>
      <p className="mt-3">
        📍 You went to {cityInfo.title} on {cityInfo.date_visited} 📍
      </p>
      <div className="self-start mt-3 py-4 px-6 bg-slate-100 w-80">
        <h2 className="font-bold">Travel Notes:</h2>
        <hr className="h-1px my-2 border-slate-400" />
        <p>{cityInfo.notes}</p>
      </div>
      <Button className="w-40 mt-4" variant="destructive" onClick={onClose}>
        Close Trip Details
      </Button>
    </div>
  );
}
