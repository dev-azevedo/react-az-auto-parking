export type User = {
  id: number;
  fullName: string;
  email: string;
  isAdmin: boolean;
  token: string;
};

export type ResponseApi = {
  statusCode: number;
  isSuccess: boolean;
  data: User;
  message: string | null;
};

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  signed: boolean;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
};

export type SignInProps = {
  email: string;
  password: string;
};
