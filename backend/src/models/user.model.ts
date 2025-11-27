import { db } from "../config/db";
import type { RowDataPacket } from "mysql2";

export const getAllUsers = async () => {
  const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM users");
  return rows;
};

export const getUserById = async (id: number) => {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM users WHERE id = ?",
    [id]
  );
  return rows[0] ?? null;
};

export const createUser = async (data: any) => {
  const { first_name, last_name, email, phone, role } = data;
  const [result]: any = await db.query(
    "INSERT INTO users (first_name, last_name, email, phone, role) VALUES (?, ?, ?, ?, ?)",
    [first_name, last_name, email, phone, role]
  );
  return { id: result.insertId, ...data };
};

export const updateUser = async (id: number, data: any) => {
  const fields = [];
  const values = [];

  for (const key in data) {
    fields.push(`${key} = ?`);
    values.push(data[key]);
  }

  values.push(id);

  await db.query(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`, values);
  return { id, ...data };
};

export const deleteUser = async (id: number) => {
  await db.query("DELETE FROM users WHERE id = ?", [id]);
};
