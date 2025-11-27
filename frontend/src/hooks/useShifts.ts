import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/shifts";
import type { Shift } from "../api/types";

const SHIFTS_QUERY_KEY = ["shifts"] as const;
const getShiftsQueryKey = (params?: Record<string, unknown>) =>
  ["shifts", params ?? null] as const;

export function useShifts(params?: Record<string, unknown>) {
  return useQuery<Shift[]>({
    queryKey: getShiftsQueryKey(params),
    queryFn: () => api.getShifts(params).then((res) => res.data),
  });
}

export function useCreateShift() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Shift>) =>
      api.createShift(data).then((res) => res.data),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: SHIFTS_QUERY_KEY }),
  });
}

export function useUpdateShift() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Shift> }) =>
      api.updateShift(id, data).then((res) => res.data),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: SHIFTS_QUERY_KEY }),
  });
}

export function useDeleteShift() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.deleteShift(id),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: SHIFTS_QUERY_KEY }),
  });
}

