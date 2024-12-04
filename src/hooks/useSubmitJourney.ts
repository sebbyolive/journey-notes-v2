"use client";

import { createClient } from "@/utils/supabase/client";

export async function useSubmitJourney({
  draftJourney,
  dispatch,
  refreshJourneys,
  setNotesError,
}: any) {
  if (draftJourney.city_name == "invalid location") return;
  if (!draftJourney.notes) {
    setNotesError(!!true);
    return;
  } else {
    setNotesError(!!false);
  }

  const supabase = createClient();

  let journeySubmission = {
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
