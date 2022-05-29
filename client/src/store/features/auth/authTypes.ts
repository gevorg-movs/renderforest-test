export interface IAuthState {
  accessToken: string;
  error: string;
  user: IUser;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}
