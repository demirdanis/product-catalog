import { LoginRequest, LoginResponse } from "@/types/api/login";
import type { NextApiRequest, NextApiResponse } from "next";

import { authTokenCookieName } from "@/contants/auth";

export default function handler(
  req: NextApiRequest & { body: LoginRequest },
  res: NextApiResponse<LoginResponse>
) {
  res.setHeader(
    "Set-Cookie",
    `${authTokenCookieName}=; Max-Age=0; path=/; HttpOnly; Secure; SameSite=Strict`
  );
  res.status(200).json({ success: true });
}
