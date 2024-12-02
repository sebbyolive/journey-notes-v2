"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

type JourneysContextProps = {
  journeys: any[];
  isLoading: boolean;
};

const JourneysContext = createContext<JourneysContextProps | undefined>(
  undefined
);

export function JourneysProvider({ children }: { children: React.ReactNode }) {
  const [journeys, setJourneys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    setIsLoading(true);
    const fetchJourneys = async () => {
      const { data, error } = await supabase.from("journeys").select("*");

      if (error) {
        console.log(error.message);
        return;
      }

      setJourneys(data);
      setIsLoading(false);
    };
    fetchJourneys();
  }, []);

  return (
    <JourneysContext.Provider value={{ journeys, isLoading }}>
      {children}
    </JourneysContext.Provider>
  );
}

export function useJourneys() {
  const context = useContext(JourneysContext);

  if (context === undefined)
    throw new Error("JourneysContext was used outside of its Provider scope");

  return context;
}
