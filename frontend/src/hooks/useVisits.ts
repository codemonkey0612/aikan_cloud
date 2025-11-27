import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/visits";
import type { Visit } from "../api/types";

const VISITS_QUERY_KEY = ["visits"] as const;
const getVisitsQueryKey = (params?: Record<string, unknown>) =>
  ["visits", params ?? null] as const;

export function useVisits(params?: Record<string, unknown>) {
  return useQuery<Visit[]>({
    queryKey: getVisitsQueryKey(params),
    queryFn: () => api.getVisits(params).then((res) => res.data),
  });
}

export function useCreateVisit() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Visit>) =>
      api.createVisit(data).then((res) => res.data),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: VISITS_QUERY_KEY }),
  });
}

export function useUpdateVisit() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Visit> }) =>
      api.updateVisit(id, data).then((res) => res.data),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: VISITS_QUERY_KEY }),
  });
}

export function useDeleteVisit() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.deleteVisit(id),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: VISITS_QUERY_KEY }),
  });
}

