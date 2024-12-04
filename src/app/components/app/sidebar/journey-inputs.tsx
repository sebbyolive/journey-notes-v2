"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Calendar } from "../../ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Button } from "../../ui/button";
import TextArea from "../../ui/textarea";
import { useJourneys } from "@/contexts/JourneysContext";

export default function JourneyInputs({ notesError }: { notesError: boolean }) {
  const { dispatch, draftJourney } = useJourneys();
  const [date, setDate] = useState<Date>(new Date());
  const formattedDate = date?.toLocaleDateString("en-CA");

  useEffect(() => {
    dispatch({
      type: "update/date_visited",
      payload: { date_visited: formattedDate },
    });
    console.log(formattedDate);
    console.log(draftJourney);
  }, [date]);

  return (
    <div className="flex flex-col gap-2">
      <TextArea
        action={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          dispatch({ type: "update/notes", payload: { notes: e.target.value } })
        }
      />
      {notesError && (
        <p className="text-red-600">
          You must provide a note to submit your journey
        </p>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button>Select Travel Date</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(day) => {
              day && setDate(day);
            }}
            className="rounded-md border shadow [&_[aria-selected='true']]:bg-neutral-800 [&_[aria-selected='true']]:text-neutral-100 [&_[aria-selected='true']]:dark:bg-neutral-800 [&_[aria-selected='true']]:dark:text-neutral-50"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
