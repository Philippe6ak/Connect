import { useQuery } from "@tanstack/react-query";
import { getInviteInfo } from "../api/api";
import { queryKeys } from "../lib/queryKeys";

// data: { university, country_code } | null (invalid token) | undefined (not loaded)
export function useInviteInfo(token) {
  return useQuery({
    queryKey: queryKeys.inviteInfo(token),
    queryFn: () => getInviteInfo(token),
    enabled: !!token,
    retry: false, // an invalid token won't become valid by retrying
    staleTime: 5 * 60_000,
  });
}
