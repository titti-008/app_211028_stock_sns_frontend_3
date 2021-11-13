import { RouteProps } from 'react-router-dom';
import * as H from 'history';

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
  password: string | null;
  passwordConfirmation: string | null;
};

export type loginUserType = {
  email: string;
  password: string;
};

export type UsersType = Array<UserType>;

export type UsersResponse = UsersType;

export type RouteUserPropsType = {
  currentUser: CurrentUser;
  setCurrentUser: (currentUser: CurrentUser) => void;
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
  currentUser: CurrentUser;
};

export type RouteCurrentUserPropsType = {
  currentUser: CurrentUser;
  setCurrentUser: (currentUser: CurrentUser) => void;
  history: H.History;
};

export type ErrorResponse = {
  messages: string[];
};

/* eslint-disable */
/* eslint-disable */
