"use client";

import { createClient } from "@/utils/supabase/client";

export default async function useDeleteJourney({ id }: { id: string }) {
  const supabase = createClient();

  const response = await supabase.from("journeys").delete().eq("id", 1);
}
