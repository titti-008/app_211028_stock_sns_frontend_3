import axios, { AxiosResponse } from 'axios';
import {
  UserType,
  CreateUserType,
  loginUserType,
  LoginResponse,
  LogoutResponse,
  EditUserType,
  DeleteResponse,
  UsersResponse,
} from './Types';

const env = process.env.REACT_APP_SERVER_URL ?? ''; // 文字列型であることを強制

const apiUrl = `${env}/api/v1`;
const usersUrl = `${apiUrl}/users`;

const instance = axios.create({ withCredentials: true });

export const getUsers = (): Promise<AxiosResponse<UsersResponse, unknown>> =>
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

export const loginUser = (
  values: loginUserType,
): Promise<AxiosResponse<LoginResponse, unknown>> =>
  instance.post<LoginResponse>(`${apiUrl}/login`, {
    user: {
      email: values.email,
      password: values.password,
      /* eslint-disable */
      remember_me: values.rememberMe,
      /* eslint-disable */
    },
  });

export const logoutUser = (): Promise<AxiosResponse<LogoutResponse, unknown>> =>
  instance.delete<LogoutResponse>(`${apiUrl}/logout`);

export const loggedIn = (): Promise<AxiosResponse<LoginResponse, unknown>> => {
  console.log(`LogdedIn Url: ${apiUrl}/logged_in`);

  return instance.get<LoginResponse>(`${apiUrl}/logged_in`);
};

export const deleteUser = (
  id: number,
): Promise<AxiosResponse<DeleteResponse, unknown>> =>
  instance.delete<DeleteResponse>(`${usersUrl}/${id}`);

export const updateUser = (
  values: EditUserType,
): Promise<AxiosResponse<LoginResponse, unknown>> =>
  instance.patch<LoginResponse>(`${usersUrl}/${values.id}`, {
    user: {
      id: values.id,
      email: values.email,
      name: values.name,
      password: values.password,
      password_confirmation: values.passwordConfirmation,
    },
  });
/* eslint-disable */
/* eslint-disable */
