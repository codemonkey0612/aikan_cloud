import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";
import type { UserRole } from "../types/roles";

export interface AuthTokenPayload extends jwt.JwtPayload {
  sub: string;
  role: UserRole;
  email?: string | null;
  type?: "access" | "refresh";
}

export interface RefreshTokenPayload extends jwt.JwtPayload {
  sub: string;
  tokenId: string; // リフレッシュトークンのID（DB内のID）
  type: "refresh";
}

/**
 * アクセストークンを生成（15分）
 */
export const signAccessToken = (payload: AuthTokenPayload): string => {
  const options: SignOptions = {
    expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(
    { ...payload, type: "access" },
    env.jwtSecret as jwt.Secret,
    options
  );
};

/**
 * リフレッシュトークンを生成（30日）
 */
export const signRefreshToken = (userId: string, tokenId: string): string => {
  const payload: RefreshTokenPayload = {
    sub: userId,
    tokenId,
    type: "refresh",
  };

  const options: SignOptions = {
    expiresIn: env.jwtRefreshExpiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, env.jwtRefreshSecret as jwt.Secret, options);
};

/**
 * アクセストークンを検証
 */
export const verifyAccessToken = (token: string): AuthTokenPayload => {
  const decoded = jwt.verify(token, env.jwtSecret as jwt.Secret);

  if (typeof decoded === "string") {
    throw new Error("Invalid token payload");
  }

  const payload = decoded as AuthTokenPayload;
  if (payload.type && payload.type !== "access") {
    throw new Error("Invalid token type");
  }

  return payload;
};

/**
 * リフレッシュトークンを検証
 */
export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  const decoded = jwt.verify(token, env.jwtRefreshSecret as jwt.Secret);

  if (typeof decoded === "string") {
    throw new Error("Invalid token payload");
  }

  const payload = decoded as RefreshTokenPayload;
  if (payload.type !== "refresh") {
    throw new Error("Invalid token type");
  }

  return payload;
};

// 後方互換性のため
export const signAuthToken = signAccessToken;
export const verifyAuthToken = verifyAccessToken;
