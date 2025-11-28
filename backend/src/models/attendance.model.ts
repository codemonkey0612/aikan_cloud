import { db } from "../config/db";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export type AttendanceStatus = "PENDING" | "CONFIRMED" | "REJECTED";

export interface AttendanceRow extends RowDataPacket {
  id: number;
  shift_id: number;
  user_id: number;
  check_in_at: string | null;
  check_out_at: string | null;
  check_in_lat: number | null;
  check_in_lng: number | null;
  check_out_lat: number | null;
  check_out_lng: number | null;
  check_in_status: AttendanceStatus;
  check_out_status: AttendanceStatus;
  check_in_pin: string | null;
  check_out_pin: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateAttendanceInput {
  shift_id: number;
  user_id: number;
  check_in_at?: string | null;
  check_in_lat?: number | null;
  check_in_lng?: number | null;
  check_in_status?: AttendanceStatus;
  check_in_pin?: string | null;
}

export interface UpdateAttendanceInput {
  check_out_at?: string | null;
  check_out_lat?: number | null;
  check_out_lng?: number | null;
  check_out_status?: AttendanceStatus;
  check_out_pin?: string | null;
  check_in_status?: AttendanceStatus;
  notes?: string | null;
}

export const getAttendanceById = async (id: number) => {
  const [rows] = await db.query<AttendanceRow[]>(
    "SELECT * FROM attendance WHERE id = ?",
    [id]
  );
  return rows[0] ?? null;
};

export const getAttendanceByShiftId = async (shift_id: number) => {
  const [rows] = await db.query<AttendanceRow[]>(
    "SELECT * FROM attendance WHERE shift_id = ? ORDER BY created_at DESC",
    [shift_id]
  );
  return rows;
};

export const getAttendanceByUserId = async (
  user_id: number,
  limit: number = 50
) => {
  const [rows] = await db.query<AttendanceRow[]>(
    "SELECT * FROM attendance WHERE user_id = ? ORDER BY created_at DESC LIMIT ?",
    [user_id, limit]
  );
  return rows;
};

export const getAttendanceByShiftAndUser = async (
  shift_id: number,
  user_id: number
) => {
  const [rows] = await db.query<AttendanceRow[]>(
    "SELECT * FROM attendance WHERE shift_id = ? AND user_id = ?",
    [shift_id, user_id]
  );
  return rows[0] ?? null;
};

export const createAttendance = async (data: CreateAttendanceInput) => {
  const {
    shift_id,
    user_id,
    check_in_at,
    check_in_lat,
    check_in_lng,
    check_in_status,
    check_in_pin,
  } = data;
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO attendance 
     (shift_id, user_id, check_in_at, check_in_lat, check_in_lng, check_in_status, check_in_pin)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      shift_id,
      user_id,
      check_in_at ?? new Date().toISOString(),
      check_in_lat ?? null,
      check_in_lng ?? null,
      check_in_status ?? "PENDING",
      check_in_pin ?? null,
    ]
  );
  return getAttendanceById(result.insertId);
};

export const updateAttendance = async (
  id: number,
  data: UpdateAttendanceInput
) => {
  const fields = Object.keys(data) as (keyof UpdateAttendanceInput)[];

  if (!fields.length) {
    return getAttendanceById(id);
  }

  const setClause = fields.map((key) => `${key} = ?`).join(", ");
  const values = fields.map((key) => data[key]);

  await db.query(
    `UPDATE attendance SET ${setClause} WHERE id = ?`,
    [...values, id]
  );
  return getAttendanceById(id);
};

export const deleteAttendance = async (id: number) => {
  await db.query("DELETE FROM attendance WHERE id = ?", [id]);
};

