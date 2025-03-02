export interface ILogin {
  loading?: boolean;
  error?: string;
  onLogin: (credentials: ILoginCredentials) => void;
}

export interface ILoginCredentials {
  username: string;
  password: string;
}
