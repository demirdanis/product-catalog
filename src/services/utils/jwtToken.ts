import { NextApiRequest, NextApiResponse } from "next";

import { IJWTToken } from "@/types/jwtToken";
import { NextRequest } from "next/server";
import { authTokenCookieName } from "@/contants/auth";
import jwt from "jsonwebtoken";
import { loginUrl } from "@/contants/urls";
import { mockUser } from "@/mocks/user";
import { parse } from "cookie";

const SECRET_KEY = process.env.JWT_SECRET || "";

export const getDecodedToken = (token: string): IJWTToken | null => {
  try {
    return jwt.decode(token) as IJWTToken | null;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

export const creteToken = () => {
  const now = Math.floor(Date.now() / 1000);

  const tokenContent: IJWTToken = {
    userId: mockUser.id,
    fullName: mockUser.fullName,
    exp: now + 7 * 24 * 60 * 60, // 7 day
    iat: now,
    roles: mockUser.roles,
  };

  return jwt.sign(tokenContent, SECRET_KEY);
};

export const getTokenFromNextApiRequest = (
  req: NextApiRequest
): string | undefined => {
  const cookies = parse(req.headers.cookie || "");
  return cookies.token;
};

export const getTokenFromNextRequest = (
  request: NextRequest
): string | undefined => {
  return request.cookies.get(authTokenCookieName)?.value;
};

export const isValidToken = (token?: string) => {
  if (!token) return false;

  const decodedToken = getDecodedToken(token);

  if (!decodedToken) return false;

  if (decodedToken.exp * 1000 < Date.now()) return false;

  return true;
};

export const validateTokenAndRedirect = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const token = getTokenFromNextApiRequest(req);

  if (!isValidToken(token)) {
    res.writeHead(302, { Location: loginUrl });
    res.end();
    return false;
  }

  return true;
};
