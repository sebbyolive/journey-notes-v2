import React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import TextArea from "../../ui/textarea";

export default function JourneyInputs() {
  return (
    <div className="flex flex-col gap-2">
      <TextArea />
      <Popover>
        <PopoverTrigger asChild>
          <Button>Select Travel Date</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar />
        </PopoverContent>
      </Popover>
    </div>
  );
}
