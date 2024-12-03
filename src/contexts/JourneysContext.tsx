"use client";
import {
  useContext,
  createContext,
  useState,
  useEffect,
  useReducer,
  Dispatch,
} from "react";
import { createClient } from "@/utils/supabase/client";

type JourneysContextProps = {
  journeys: Journey[];
  isLoading: boolean;
  draftJourney: Journey;
  dispatch: Dispatch<DraftJourneyAction>;
};

type Journey = {
  created_at: string;
  city_name: string;
  user_id: string;
  country: string;
  emoji: string;
  latitude: string;
  longitude: string;
  date_visited: string;
  notes: string;
};

const initialDraftJourneyState: Journey = {
  created_at: "",
  city_name: "",
  user_id: "",
  country: "",
  emoji: "",
  latitude: "",
  longitude: "",
  date_visited: "",
  notes: "",
};

type DraftJourneyAction =
  | {
      type: "update/location";
      payload: Partial<Journey>;
    }
  | {
      type: "update/notes";
      payload: { notes: string };
    }
  | {
      type: "update/date_visited";
      payload: { date_visited: string };
    };

const draftJourneyReducer = (
  state: Journey,
  action: DraftJourneyAction
): Journey => {
  switch (action.type) {
    case "update/location":
      return {
        ...state,
        ...action.payload,
      };
    case "update/notes":
      return {
        ...state,
        notes: action.payload.notes,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const JourneysContext = createContext<JourneysContextProps | undefined>(
  undefined
);

export function JourneysProvider({ children }: { children: React.ReactNode }) {
  const [draftJourney, dispatch] = useReducer(
    draftJourneyReducer,
    initialDraftJourneyState
  );

  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    setIsLoading(true);
    const fetchJourneys = async () => {
      const { data, error } = await supabase.from("journeys").select("*");

      if (error) {
        console.error(error.message);
        setIsLoading(false);
        return;
      }

      setJourneys(data || []);
      setIsLoading(false);
    };
    fetchJourneys();
  }, []);

  return (
    <JourneysContext.Provider
      value={{ journeys, isLoading, draftJourney, dispatch }}
    >
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
