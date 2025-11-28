import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AttendanceAPI } from "../api/endpoints";
import type {
  Attendance,
  CheckInRequest,
  CheckOutRequest,
  GeneratePinRequest,
  UpdateStatusRequest,
} from "../api/types";

const ATTENDANCE_QUERY_KEY = ["attendance"] as const;

export function useMyAttendance(limit?: number) {
  return useQuery<Attendance[]>({
    queryKey: [...ATTENDANCE_QUERY_KEY, "my", limit],
    queryFn: () => AttendanceAPI.getMyAttendance(limit),
  });
}

export function useAttendanceByShift(shift_id: number) {
  return useQuery<Attendance[]>({
    queryKey: [...ATTENDANCE_QUERY_KEY, "shift", shift_id],
    queryFn: () => AttendanceAPI.getByShift(shift_id),
    enabled: !!shift_id,
  });
}

export function useAttendanceById(id: number) {
  return useQuery<Attendance>({
    queryKey: [...ATTENDANCE_QUERY_KEY, id],
    queryFn: () => AttendanceAPI.getById(id),
    enabled: !!id,
  });
}

export function useCheckIn() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (payload: CheckInRequest) => AttendanceAPI.checkIn(payload),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ATTENDANCE_QUERY_KEY });
    },
  });
}

export function useCheckOut() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (payload: CheckOutRequest) => AttendanceAPI.checkOut(payload),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ATTENDANCE_QUERY_KEY });
    },
  });
}

export function useUpdateAttendanceStatus() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateStatusRequest) =>
      AttendanceAPI.updateStatus(payload),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ATTENDANCE_QUERY_KEY });
    },
  });
}

export function useGeneratePin() {
  return useMutation({
    mutationFn: (payload: GeneratePinRequest) =>
      AttendanceAPI.generatePin(payload),
  });
}

