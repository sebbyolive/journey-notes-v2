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
  refreshJourneys: () => Promise<void>;
};

export type Journey = {
  created_at: string;
  city_name: string;
  user_id: string;
  country: string;
  emoji: string;
  latitude: string;
  longitude: string;
  date_visited: string;
  notes: string;
  id?: string;
  showDraftJourney?: boolean;
  showCities?: boolean;
  showCountries?: boolean;
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
  showDraftJourney: false,
  showCities: true,
  showCountries: false,
};

export type DraftJourneyAction =
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
    }
  | {
      type: "update/changeSidebarUI";
      payload: {
        showCities: boolean;
        showCountries: boolean;
        showDraftJourneys: boolean;
      };
    }
  | {
      type: "submit/submitDraftJourney";
      payload?: Partial<Journey>;
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
    case "update/date_visited":
      return {
        ...state,
        date_visited: action.payload.date_visited,
      };
    case "update/changeSidebarUI":
      return {
        ...state,
        showCities: action.payload.showCities,
        showCountries: action.payload.showCountries,
        showDraftJourney: action.payload.showDraftJourneys,
      };
    case "submit/submitDraftJourney":
      return {
        ...state,
        ...initialDraftJourneyState,
      };
    default:
      throw new Error(`Unknown action type: ${action}`);
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

  const fetchJourneys = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("journeys").select("*");
    if (error) {
      console.error(error.message);
    } else {
      setJourneys(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchJourneys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshJourneys = async () => {
    await fetchJourneys();
  };

  return (
    <JourneysContext.Provider
      value={{ journeys, isLoading, draftJourney, dispatch, refreshJourneys }}
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
