export type TAuthContext = {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  signed: boolean;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
};

export type TUser = {
  id: number;
  fullName: string;
  email: string;
  isAdmin: boolean;
  token: string;
};

export type TResponseApi = {
  statusCode: number;
  isSuccess: boolean;
  data: any;
  message: string | null;
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
