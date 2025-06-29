export type TAuthContext = {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  signed: boolean;
  signIn: (credentials: { email: string; password: string }) => Promise<number>;
  signOut: () => void;
  updateUser: (user: TUser) => void
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export type TUser = {
  id: number;
  fullName: string;
  email: string;
  isAdmin: boolean;
  token: string;
};

export type TSignIn = {
  email: string;
  password: string;
};

export type TJwtPayload = {
  aud: string;
  email: string;
  fullname: string;
  id: string;
  isAdmin: string;
  resetPassword: string;
  iss: string;
  exp: number;
};
