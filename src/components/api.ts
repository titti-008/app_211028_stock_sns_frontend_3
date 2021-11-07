import axios, { AxiosResponse } from 'axios';
import {
  UsersResponse,
  UsersType,
  UserType,
  CreateUserType,
  loginUserType,
  LoginResponse,
  LogoutResponse,
} from './Types';

const env = process.env.REACT_APP_SERVER_URL ?? ''; // 文字列型であることを強制

const apiUrl = `${env}/api/v1`;
const usersUrl = `${apiUrl}/users`;

const instance = axios.create({ withCredentials: true });

export const getUsers = (): Promise<AxiosResponse<UsersType, unknown>> =>
  instance.get<UsersResponse>(`${usersUrl}`);

export const getUser = (
  id: string,
): Promise<AxiosResponse<UserType, unknown>> =>
  instance.get<UserType>(`${usersUrl}/${id}`);

export const createUser = (
  values: CreateUserType,
): Promise<AxiosResponse<LoginResponse, unknown>> =>
  instance.post<LoginResponse>(`${usersUrl}`, {
    user: {
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.passwordConfirmation,
    },
  });

/* eslint-disable */
export const loginUser = (
  values: loginUserType,
): Promise<AxiosResponse<LoginResponse, unknown>> =>
  instance.post<LoginResponse>(`${apiUrl}/login`, {
    user: {
      email: values.email,
      password: values.password,
    },
  });
/* eslint-disable */
export const logoutUser = (): Promise<AxiosResponse<LogoutResponse, unknown>> =>
  instance.delete<LogoutResponse>(`${apiUrl}/logout`);

export const loggedIn = (): Promise<AxiosResponse<LoginResponse, unknown>> =>
  axios.get<LoginResponse>(`${apiUrl}/logged_in`, { withCredentials: true });

export const deleteUser = (
  id: number,
): Promise<AxiosResponse<UsersType, unknown>> =>
  instance.delete<UsersType>(`${usersUrl}/${id}`);

export const updateUser = (
  id: number,
  user: UserType,
): Promise<AxiosResponse<UserType, unknown>> =>
  instance.post<UserType>(`${usersUrl}/${id}`, user);
