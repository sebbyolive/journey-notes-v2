"use client";

import { DraftJourneyAction, Journey } from "@/contexts/JourneysContext";
import { createClient } from "@/utils/supabase/client";

export async function submitJourney({
  draftJourney,
  dispatch,
  refreshJourneys,
  setNotesError,
}: {
  draftJourney: Partial<Journey>;
  dispatch: (action: DraftJourneyAction) => void;
  refreshJourneys: () => Promise<void>;
  setNotesError: (value: boolean) => void;
}) {
  if (draftJourney.city_name == "invalid location") return;
  if (!draftJourney.notes) {
    setNotesError(!!true);
    return;
  } else {
    setNotesError(!!false);
  }

  const supabase = createClient();

  const journeySubmission = {
    city_name: draftJourney.city_name,
    user_id: "",
    country: draftJourney.country,
    emoji: draftJourney.emoji,
    latitude: draftJourney.latitude,
    longitude: draftJourney.longitude,
    date_visited: draftJourney.date_visited,
    notes: draftJourney.notes,
  };

  const { error, data } = await supabase.auth.getUser();

  if (error) console.log(error.message);

  if (data) {
    journeySubmission.user_id = data.user?.id as string;

    const { error } = await supabase.from("journeys").insert(journeySubmission);

    if (error) console.log(error.message);

    dispatch({
      type: "submit/submitDraftJourney",
    });

    await refreshJourneys();
  }
}
