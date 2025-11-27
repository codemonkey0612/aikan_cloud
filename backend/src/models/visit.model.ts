import { db } from "../config/db";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export interface VisitRow extends RowDataPacket {
  id: number;
  shift_id: number;
  resident_id: number | null;
  visited_at: string;
  note: string | null;
}

export type VisitInput = Omit<VisitRow, "id">;

export const getAllVisits = async () => {
  const [rows] = await db.query<VisitRow[]>("SELECT * FROM visits");
  return rows;
};

export const getVisitById = async (id: number) => {
  const [rows] = await db.query<VisitRow[]>(
    "SELECT * FROM visits WHERE id = ?",
    [id]
  );
  return rows[0] ?? null;
};

export const createVisit = async (data: VisitInput) => {
  const { shift_id, resident_id, visited_at, note } = data;

  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO visits (shift_id, resident_id, visited_at, note)
     VALUES (?, ?, ?, ?)`,
    [shift_id, resident_id, visited_at, note]
  );

  return getVisitById(result.insertId);
};

export const updateVisit = async (id: number, data: Partial<VisitInput>) => {
  const fields = Object.keys(data) as (keyof VisitInput)[];

  if (!fields.length) {
    return getVisitById(id);
  }

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => data[field]);

  await db.query(
    `UPDATE visits SET ${setClause} WHERE id = ?`,
    [...values, id]
  );

  return getVisitById(id);
};

export const deleteVisit = async (id: number) => {
  await db.query("DELETE FROM visits WHERE id = ?", [id]);
};

