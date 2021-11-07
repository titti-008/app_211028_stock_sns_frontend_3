export type Data = {
  text: string;
};

export type ApiResponse = {
  text: string;
};

export type UserType = {
  createdAt: Date;
  email: string | null;
  id: number;
  name: string | null;
};

export type CreateUserType = {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
};

export type loginUserType = {
  email: string;
  password: string;
};

/* eslint-disable */
/* eslint-disable */

export type UsersType = Array<UserType>;

export type UsersResponse = UsersType;

export type RouteUserPropsType = {
  loginState: boolean;
  handleLogin: (user: UserType) => void;
};

export type RouteCurrentUserPropsType = {
  loginState: boolean;
  currentUser: UserType;
};

export type LoginResponse = {
  loggedIn: boolean;
  user: UserType;
};

export type LogoutResponse = {
  loggedIn: boolean;
  message: string;
};
