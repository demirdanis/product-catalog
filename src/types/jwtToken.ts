export interface IJWTToken {
  userId: string;
  fullName: string;
  exp: number;
  iat: number;
  roles: Roles[];
}

export type Roles = "admin" | "user";
