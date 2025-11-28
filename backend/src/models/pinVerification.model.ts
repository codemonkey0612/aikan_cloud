import { db } from "../config/db";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export type PinPurpose = "CHECK_IN" | "CHECK_OUT" | "STATUS_UPDATE";

export interface PinVerificationRow extends RowDataPacket {
  id: number;
  user_id: number;
  pin: string;
  purpose: PinPurpose;
  attendance_id: number | null;
  expires_at: string;
  used: number;
  created_at: string;
}

export interface CreatePinVerificationInput {
  user_id: number;
  pin: string;
  purpose: PinPurpose;
  attendance_id?: number | null;
  expires_at: Date;
}

export const getPinVerificationById = async (id: number) => {
  const [rows] = await db.query<PinVerificationRow[]>(
    "SELECT * FROM pin_verifications WHERE id = ?",
    [id]
  );
  return rows[0] ?? null;
};

export const getPinVerificationByPin = async (pin: string) => {
  const [rows] = await db.query<PinVerificationRow[]>(
    "SELECT * FROM pin_verifications WHERE pin = ? AND used = 0 AND expires_at > NOW()",
    [pin]
  );
  return rows[0] ?? null;
};

export const getActivePinByUser = async (
  user_id: number,
  purpose: PinPurpose
) => {
  const [rows] = await db.query<PinVerificationRow[]>(
    "SELECT * FROM pin_verifications WHERE user_id = ? AND purpose = ? AND used = 0 AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1",
    [user_id, purpose]
  );
  return rows[0] ?? null;
};

export const createPinVerification = async (
  data: CreatePinVerificationInput
) => {
  const { user_id, pin, purpose, attendance_id, expires_at } = data;
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO pin_verifications (user_id, pin, purpose, attendance_id, expires_at)
     VALUES (?, ?, ?, ?, ?)`,
    [user_id, pin, purpose, attendance_id ?? null, expires_at]
  );
  return getPinVerificationById(result.insertId);
};

export const markPinAsUsed = async (pin: string) => {
  await db.query(
    "UPDATE pin_verifications SET used = 1 WHERE pin = ?",
    [pin]
  );
};

export const deleteExpiredPins = async () => {
  await db.query(
    "DELETE FROM pin_verifications WHERE expires_at < NOW() AND used = 1"
  );
};

