import axios, { AxiosResponse } from 'axios';
import { UsersResponse, UsersType, UserType, CreateUserType } from './Types';

const env = process.env.REACT_APP_SERVER_URL ?? ''; // 文字列型であることを強制

export const usersUrl = `${env}/api/v1/users`;

export const getUsers = (): Promise<AxiosResponse<UsersType, any>> =>
  axios.get<UsersResponse>(`${usersUrl}`);

export const getUser = (id: string): Promise<AxiosResponse<UserType, any>> =>
  axios.get<UserType>(`${usersUrl}/${id}`);

export const createUser = (
  values: CreateUserType,
): Promise<AxiosResponse<UserType, any>> =>
  axios.post<UserType>(`${usersUrl}`, {
    user: {
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.passwordConfirmation,
    },
  });

export const deleteUser = (
  id: number,
): Promise<AxiosResponse<UsersType, any>> =>
  axios.delete<UsersType>(`${usersUrl}/${id}`);

export const updateUser = (
  id: number,
  user: UserType,
): Promise<AxiosResponse<UserType, any>> =>
  axios.post<UserType>(`${usersUrl}/${id}`, user);
