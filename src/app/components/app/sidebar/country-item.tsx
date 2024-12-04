import React from "react";

export default function CountryItem({
  country,
  emoji,
}: {
  country: string;
  emoji: string;
}) {
  return (
    <div className="flex flex-col w-full items-center justify-between mt-1.5 bg-slate-200 rounded-lg py-6 px-6">
      <p className="text-4xl">{emoji}</p>{" "}
      <p className="font-semibold">{country}</p>
    </div>
  );
}
