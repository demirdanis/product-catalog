export type Roles = "admin" | "user";

export interface IMockUser {
  id: string;
  username: string;
  fullName: string;
  passwordHash: string;
  roles: Roles[];
}
