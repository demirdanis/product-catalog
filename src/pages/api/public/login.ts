import { LoginRequest, LoginResponse } from "@/types/api/login";
import type { NextApiRequest, NextApiResponse } from "next";

import { authTokenCookieName } from "@/contants/auth";
import bcrypt from "bcryptjs";
import { creteToken } from "@/services/utils/jwtToken";
import { mockUser } from "@/mocks/user";

export default function handler(
  req: NextApiRequest & { body: LoginRequest },
  res: NextApiResponse<LoginResponse>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  if (username !== mockUser.username) {
    return res
      .status(200)
      .json({ success: false, error: "Invalid username or password" });
  }

  const isPasswordValid = bcrypt.compareSync(password, mockUser.passwordHash);
  if (!isPasswordValid) {
    return res
      .status(200)
      .json({ success: false, error: "Invalid username or password" });
  }

  const token = creteToken();

  setTimeout(() => {
    //NOTE: simulate for slow networks
    res.setHeader(
      "Set-Cookie",
      `${authTokenCookieName}=${token}; HttpOnly; Path=/; Secure`
    );

    res.status(200).json({ success: true });
  }, 1000);
}
