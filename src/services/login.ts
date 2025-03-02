import { LoginResponse } from "@/types/api/login";
import api from "./api";

export const login = async (username: string, password: string) => {
  return api
    .post<LoginResponse>(`/public/login`, {
      username: username,
      password: password,
    })
    .catch((err) => {
      console.error(err);
    });
};
