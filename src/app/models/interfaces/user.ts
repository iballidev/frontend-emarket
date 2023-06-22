export interface User {}
export interface SignupUser {
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
  IsKeepLoggedIn?: boolean;
}
