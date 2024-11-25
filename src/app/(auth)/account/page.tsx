"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export default function Account() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const { data } = await supabase.auth.getUser();

      if (data) {
        setUser(data.user);
      }
    };
    checkLoggedIn();
  }, []);

  return <div>Email: {user?.email}</div>;
}
