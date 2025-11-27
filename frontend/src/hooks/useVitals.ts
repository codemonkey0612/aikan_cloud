import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/vitals";
import type { VitalRecord } from "../api/types";

const VITALS_QUERY_KEY = ["vitals"] as const;
const getVitalsQueryKey = (params?: Record<string, unknown>) =>
  ["vitals", params ?? null] as const;

export function useVitals(params?: Record<string, unknown>) {
  return useQuery<VitalRecord[]>({
    queryKey: getVitalsQueryKey(params),
    queryFn: () => api.getVitals(params).then((res) => res.data),
  });
}

export function useCreateVital() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<VitalRecord>) =>
      api.createVital(data).then((res) => res.data),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: VITALS_QUERY_KEY }),
  });
}

export function useUpdateVital() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<VitalRecord> }) =>
      api.updateVital(id, data).then((res) => res.data),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: VITALS_QUERY_KEY }),
  });
}

export function useDeleteVital() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.deleteVital(id),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: VITALS_QUERY_KEY }),
  });
}

