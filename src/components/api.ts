import axios, { AxiosResponse } from 'axios';
import {
  CreateUserType,
  loginUserType,
  LoginResponse,
  LogoutResponse,
  EditUserType,
  DeleteUserResponse,
  UsersResponse,
  MessageResponse,
  ShowUserResponse,
  ResetEmail,
  ResetPasswordData,
  MicropostsResponse,
  EarningsResponse,
} from './Types';

const env = process.env.REACT_APP_SERVER_URL ?? ''; // 文字列型であることを強制

const apiUrl = `${env}/api/v1`;
const usersUrl = `${apiUrl}/users`;
export const micropostsUrl = `${apiUrl}/microposts`;
const relationshipsUrl = `${apiUrl}/relationships`;
const StockUrl = `${apiUrl}/stocks`;

export const instance = axios.create({ withCredentials: true });

export const getUsers = (): Promise<AxiosResponse<UsersResponse, unknown>> =>
  instance.get<UsersResponse>(`${usersUrl}`);

export const getFollowers = (
  id: string,
): Promise<AxiosResponse<UsersResponse, unknown>> =>
  instance.get<UsersResponse>(`${usersUrl}/${id}/followers`);

export const getFollowing = (
  id: string,
): Promise<AxiosResponse<UsersResponse, unknown>> =>
  instance.get<UsersResponse>(`${usersUrl}/${id}/following`);

export const createUserRelationship = (
  userId: number,
): Promise<AxiosResponse<ShowUserResponse, unknown>> =>
  instance.post<ShowUserResponse>(`${relationshipsUrl}`, { id: userId });

export const deleteUserRelationship = (
  userId: number,
): Promise<AxiosResponse<ShowUserResponse, unknown>> =>
  instance.delete<ShowUserResponse>(`${relationshipsUrl}/${userId}`);

export const getUser = async (id: number) => {
  const response = await instance.get<ShowUserResponse>(`${usersUrl}/${id}`);

  return response.data;
};

export const createUser = (
  values: CreateUserType,
): Promise<AxiosResponse<MessageResponse, unknown>> =>
  instance.post<MessageResponse>(`${usersUrl}`, {
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
): Promise<AxiosResponse<DeleteUserResponse, unknown>> =>
  instance.delete<DeleteUserResponse>(`${usersUrl}/${id}`);

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

export const ResetRequest = (
  values: ResetEmail,
): Promise<AxiosResponse<MessageResponse, unknown>> =>
  instance.post<MessageResponse>(`${apiUrl}/password_resets`, {
    password_reset: { email: values.email },
  });

export const ResetPassword = (
  values: ResetPasswordData,
): Promise<AxiosResponse<LoginResponse, unknown>> =>
  instance.patch<LoginResponse>(`${apiUrl}/password_resets/${values.id}`, {
    id: values.id,
    email: values.email,
    user: {
      password: values.password,
      password_confirmation: values.passwordConfirmation,
    },
  });

// export const getMicroposts = (
//   userId: number,
//   currentLimit: number,
// ): Promise<AxiosResponse<MicropostsResponse, any>> =>
//   instance.get<MicropostsResponse>(`${micropostsUrl}`, {
//     params: {
//       user_id: userId,
//       current_limit: currentLimit,
//     },
//   });

export const getMyFeed = (
  type: 'myfeed' | number,
  pageParam?: number | undefined,
) => {
  const res = instance.get<MicropostsResponse>(
    `${micropostsUrl}/${type}/${pageParam}`,
  );
  return res;
};

// export const queryGetMicroposts = async (
//   userId: number,
//   currentLimit: number,
// ) => {
//   const response = await getMicroposts(userId, currentLimit);
//   return response.data;
// };

// export const getMyFeed = (
//   userId: number,
//   currentLimit: number,
// ): Promise<AxiosResponse<MicropostsResponse, any>> =>
//   instance.get<MicropostsResponse>(`${micropostsUrl}/myfeed`, {
//     params: {
//       user_id: userId,
//       current_limit: currentLimit,
//     },
//   });

// export const getTestFeed = async (userId: number, { pageParam = 0 }) => {
//   const response = await instance.get<MicropostsResponse>(
//     `${micropostsUrl}/testfeed/${pageParam}`,
//     {
//       params: {
//         user_id: userId,
//       },
//     },
//   );

//   return response.data;
// };

// export const queryGetMyFeed = async (userId: number, currentLimit: number) => {
//   const response = await getMicroposts(userId, currentLimit);
//   return response.data;
// };

export const createMicropost = (
  params: FormData,
): Promise<AxiosResponse<MessageResponse, unknown>> =>
  instance.post<MessageResponse>(micropostsUrl, params, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });

export const deleteMicropost = (
  id: number,
): Promise<AxiosResponse<MessageResponse, unknown>> =>
  instance.delete<MessageResponse>(`${micropostsUrl}/${id}`);

export const textStockApi = async () => {
  const base_uri = 'https://www.alphavantage.co/query';
  const apiKey = process.env.API_ACCESS_KEY;

  const response = axios.post<unknown>(base_uri, {
    function: 'TIME_SERIES_DAILY',
    symbol: 'tsla',
    datatype: 'json',
    apikey: apiKey,
  });

  return response;
};

export const getEarnings = async (symbol: string) => {
  const response = await instance.get<EarningsResponse>(
    `${StockUrl}/${symbol}`,
  );

  return response.data;
};

/* eslint-disable */
/* eslint-disable */
