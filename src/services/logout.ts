import { LogoutResponse } from "@/types/api/logout";
import api from "./api";

export const logout = async () => {
  return api.post<LogoutResponse>(`/secure/logout`).catch((err) => {
    console.error(err);
  });
};
