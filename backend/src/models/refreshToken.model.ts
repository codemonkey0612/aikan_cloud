import { db } from "../config/db";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export interface RefreshTokenRow extends RowDataPacket {
  id: number;
  user_id: number;
  token: string;
  expires_at: Date;
  revoked: number;
  created_at: Date;
}

export interface CreateRefreshTokenInput {
  user_id: number;
  token: string;
  expires_at: Date;
}

/**
 * リフレッシュトークンを作成
 */
export const createRefreshToken = async (data: CreateRefreshTokenInput) => {
  const { user_id, token, expires_at } = data;
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO refresh_tokens (user_id, token, expires_at)
     VALUES (?, ?, ?)`,
    [user_id, token, expires_at]
  );
  return getRefreshTokenById(result.insertId);
};

/**
 * リフレッシュトークンをIDで取得
 */
export const getRefreshTokenById = async (id: number) => {
  const [rows] = await db.query<RefreshTokenRow[]>(
    "SELECT * FROM refresh_tokens WHERE id = ?",
    [id]
  );
  return rows[0] ?? null;
};

/**
 * リフレッシュトークンをトークン文字列で取得
 */
export const getRefreshTokenByToken = async (token: string) => {
  const [rows] = await db.query<RefreshTokenRow[]>(
    "SELECT * FROM refresh_tokens WHERE token = ? AND revoked = 0",
    [token]
  );
  return rows[0] ?? null;
};

/**
 * ユーザーのすべてのリフレッシュトークンを取得
 */
export const getRefreshTokensByUserId = async (user_id: number) => {
  const [rows] = await db.query<RefreshTokenRow[]>(
    "SELECT * FROM refresh_tokens WHERE user_id = ? AND revoked = 0",
    [user_id]
  );
  return rows;
};

/**
 * リフレッシュトークンを無効化（ログアウト時など）
 */
export const revokeRefreshToken = async (token: string) => {
  await db.query(
    "UPDATE refresh_tokens SET revoked = 1 WHERE token = ?",
    [token]
  );
};

/**
 * ユーザーのすべてのリフレッシュトークンを無効化
 */
export const revokeAllRefreshTokensByUserId = async (user_id: number) => {
  await db.query(
    "UPDATE refresh_tokens SET revoked = 1 WHERE user_id = ?",
    [user_id]
  );
};

/**
 * 期限切れのリフレッシュトークンを削除（クリーンアップ）
 */
export const deleteExpiredRefreshTokens = async () => {
  await db.query(
    "DELETE FROM refresh_tokens WHERE expires_at < NOW() OR revoked = 1"
  );
};

/**
 * リフレッシュトークンを削除（トークンローテーション時）
 */
export const deleteRefreshToken = async (token: string) => {
  await db.query("DELETE FROM refresh_tokens WHERE token = ?", [token]);
};

