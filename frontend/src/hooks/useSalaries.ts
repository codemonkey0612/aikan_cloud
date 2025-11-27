import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/salaries";
import type { Salary } from "../api/types";

const SALARIES_QUERY_KEY = ["salaries"] as const;
const getSalariesQueryKey = (params?: Record<string, unknown>) =>
  ["salaries", params ?? null] as const;

export function useSalaries(params?: Record<string, unknown>) {
  return useQuery<Salary[]>({
    queryKey: getSalariesQueryKey(params),
    queryFn: () => api.getSalaries(params).then((res) => res.data),
  });
}

export function useCreateSalary() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Salary>) =>
      api.createSalary(data).then((res) => res.data),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: SALARIES_QUERY_KEY }),
  });
}

export function useUpdateSalary() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Salary> }) =>
      api.updateSalary(id, data).then((res) => res.data),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: SALARIES_QUERY_KEY }),
  });
}

export function useDeleteSalary() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.deleteSalary(id),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: SALARIES_QUERY_KEY }),
  });
}

