import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import { getMyProfile } from "../api/api";
import { queryKeys } from "../lib/queryKeys";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();

  // undefined = "we haven't heard from Supabase yet", null = "nobody is logged in"
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession); // only set state in here, nothing else
      if (event === "SIGNED_OUT") queryClient.clear();
    });
    return () => subscription.unsubscribe();
  }, [queryClient]);

  const userId = session?.user?.id;

  const profileQuery = useQuery({
    queryKey: queryKeys.profile(userId),
    queryFn: () => getMyProfile(userId),
    enabled: !!userId,
  });

  const value = {
    session,
    user: session?.user ?? null,
    isAuthenticated: !!session,
    role: profileQuery.data?.role ?? null,
    hasProfile: !!profileQuery.data,
    profileError: profileQuery.error,
    // true until we know both "who is logged in" and "what is their role"
    isLoading: session === undefined || (!!userId && profileQuery.isPending),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
