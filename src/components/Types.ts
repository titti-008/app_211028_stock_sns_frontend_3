import { RouteProps } from 'react-router-dom';
import * as H from 'history';
import { AxiosError } from 'axios';

export type Data = {
  text: string;
};

export type ApiResponse = {
  text: string;
};

export type UserType = {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
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
};

export type UsersType = Array<UserType>;

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

export type ErrorResponse = AxiosError<{
  messages: string[];
}>;
