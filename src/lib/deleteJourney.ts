"use client";

import { createClient } from "@/utils/supabase/client";

export async function deleteJourney(id: string, refreshJourneys: () => void) {
  const supabase = createClient();

  const response = await supabase.from("journeys").delete().eq("id", id);

  if (response.error) {
    console.error("Failed to delete journey:", response.error.message);
  } else {
    console.log("Journey deleted successfully");
  }

  refreshJourneys();
}
