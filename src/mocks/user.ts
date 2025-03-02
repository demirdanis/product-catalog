import { IMockUser } from "@/types/user";
import bcrypt from "bcryptjs";

export const mockUser: IMockUser = {
  id: "1",
  username: "user",
  fullName: "Demir Danış",
  passwordHash: bcrypt.hashSync("user123", 10),
  roles: ["admin"],
};
