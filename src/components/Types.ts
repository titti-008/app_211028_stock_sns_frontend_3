import { RouteProps } from 'react-router-dom';
import * as H from 'history';
import { AxiosError } from 'axios';

// export type userProps = {
//   email: string;
//   name: string;
//   password: string;
//   passwordConfirmation: string;
// };

export type ApiResponse = {
  text: string;
};

export type UserType = {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  admin: boolean;
  countMicroposts: number;
};

export type CurrentUser = UserType | null;

export type CreateUserType = {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
};

export type PasswordConfirmationType = {
  password: string;
  passwordConfirmation: string;
};

export type EditUserType = {
  id: number;
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
};
export type ResetPasswordData = {
  id: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type loginUserType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type UsersResponse = {
  users: UserType[];
  messages: string[];
};

export type RouteUserPropsType = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export type LoginResponse = {
  loggedIn: boolean;
  user: UserType;
  messages: string[];
};

export type ShowUserResponse = {
  user: UserType;
  messages: string[];
  microposts: Micropost[];
};

export type MessageResponse = {
  messages: string[];
};

export type DeleteUserResponse = {
  messages: string[];
  users: UserType[];
};

export type LogoutResponse = {
  loggedIn: boolean;
  messages: string[];
};

export type LoginRouteProps = RouteProps & {
  isLogin: boolean;
};

export type RouteCurrentUserPropsType = {
  history: H.History;
};

export type HistoryPropsType = {
  history: H.History;
};

export type ResetEmail = {
  email: string;
};

export type ErrorResponse = AxiosError<{
  messages: string[];
}>;

export type Micropost = {
  user: UserType;
  content: string;
  createdAt: Date;
  id: number;
  images: string[];
};

export type MicropostsResponse = {
  microposts: Micropost[];
  messages: string[];
};

export type historyPropsType = {
  history: H.History;
};

export type DeletePostResponse = {
  messages: string[];
  microposts: Micropost[];
};
