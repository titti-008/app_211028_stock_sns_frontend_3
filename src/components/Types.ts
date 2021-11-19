import { RouteProps } from 'react-router-dom';
import * as H from 'history';
import { AxiosError } from 'axios';

export type ApiResponse = {
  text: string;
};

export type UserType = {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  admin: boolean;
};

export type CurrentUser = UserType | null;

export type CreateUserType = {
  email: string;
  name: string;
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

export type loginUserType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type UsersType = Array<UserType>;

export type UsersResponse = {
  users: UsersType;
  messages: string[];
};

export type RouteUserPropsType = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: CurrentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
};

export type LoginResponse = {
  loggedIn: boolean;
  user: UserType;
  messages: string[];
};

export type ShowUserResponse = {
  user: UserType;
  messages: string[];
};

export type MessageResponse = {
  messages: string[];
};

export type DeleteResponse = {
  messages: string[];
  users: UsersType;
};

export type LogoutResponse = {
  loggedIn: boolean;
  messages: string[];
};

export type LoginRouteProps = RouteProps & {
  isLogin: boolean;
};

export type RouteCurrentUserPropsType = {
  currentUser: CurrentUser;
  setCurrentUser: (currentUser: CurrentUser) => void;
  history: H.History;
};

export type ResetPasswordPropsType = {
  history: H.History;
};

export type ResetEmail = {
  email: string;
};

export type ResetPasswordData = {
  id: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type ErrorResponse = AxiosError<{
  messages: string[];
}>;

export type Micropost = {
  user: UserType;
  content: string;
  createdAt: Date;
  id: number;
};

export type MicropostsResponse = {
  microposts: Micropost[];
  messages: string[];
};
