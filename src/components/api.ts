import axios, { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import {
  CreateUserType,
  loginUserType,
  LoginResponse,
  EditUserType,
  DeleteUserResponse,
  UsersResponse,
  MessageResponse,
  ShowUserResponse,
  ResetEmail,
  ResetPasswordData,
  MicropostsResponse,
  EarningsResponse,
  StockPriceResponse,
  ErrorResponse,
  // StocksResponse,
} from './Types';

const env = process.env.REACT_APP_SERVER_URL ?? ''; // 文字列型であることを強制

export const apiUrl = `${env}/api/v1`;
const usersUrl = `${apiUrl}/users`;
export const micropostsUrl = `${apiUrl}/microposts`;
const relationshipsUrl = `${apiUrl}/relationships`;
const StockUrl = `${apiUrl}/stocks`;

const financialUrl = process.env.REACT_APP_FINANCIAL_URL ?? '';
const apiKey = process.env.REACT_APP_API_KEY ?? '';

export const instance = axios.create({ withCredentials: true });

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

export const loginRequest = (values: { user: loginUserType }) =>
  instance.post<{ user: loginUserType }, AxiosResponse<LoginResponse>>(
    `${apiUrl}/login`,
    {
      user: {
        email: values.user.email,
        password: values.user.password,
        rememberMe: values.user.rememberMe,
      },
    },
  );

export const logoutRequest = () =>
  instance.delete<LoginResponse, LoginResponse, ErrorResponse>(
    `${apiUrl}/logout`,
  );

/// /////////////////////////////////////////////////
export const usePrivateQuery = <T, U>(
  request: () => Promise<T>,
  queryKey: string,
) => {
  const { data, isLoading, isError, error } = useQuery<T, U>(queryKey, request);

  return { data, isLoading, isError, error };
};
/// /////////////////////////////////////////////////

export const useLoggedQuery = () =>
  usePrivateQuery<LoginResponse, ErrorResponse>(
    () =>
      instance.get<LoginResponse, LoginResponse, ErrorResponse>(
        `${apiUrl}/logged_in`,
      ),
    'loginData',
  );

export const useStockPriceQuery = (symbol: string) =>
  usePrivateQuery<StockPriceResponse, ErrorResponse>(
    () =>
      axios.get<StockPriceResponse, StockPriceResponse, ErrorResponse>(
        `${financialUrl}/historical-price-full/${symbol}?apikey=${apiKey}`,
      ),
    `price-${symbol}`,
  );

export const useGetUsers = () =>
  usePrivateQuery<UsersResponse, ErrorResponse>(
    async () =>
      instance.get<UsersResponse, UsersResponse, ErrorResponse>(`${usersUrl}`),
    'allUsers',
  );

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
    `${micropostsUrl}/${type}/${pageParam ?? ''}`,
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

export const deleteMicropost = (id: number) =>
  instance.delete<MessageResponse>(`${micropostsUrl}/${id}`);

export const getEarnings = async (symbol: string) => {
  const response = await instance.get<EarningsResponse>(
    `${StockUrl}/${symbol}`,
  );

  return response.data;
};

export const followStock = ({
  symbol,
  follow,
}: {
  symbol: string;
  follow: boolean;
}) => {
  if (!follow) {
    return instance.post<LoginResponse>(`${apiUrl}/stock_relationships`, {
      id: symbol,
    });
  }

  return instance.delete<LoginResponse>(
    `${apiUrl}/stock_relationships/${symbol}`,
  );
};
// export const getFollowingStocks = async () => {
//   const response = await instance.get<StocksResponse>(
//     `${StockUrl}/my_following_stock`,
//   );

//   return response.data;
// };

/* eslint-disable */
/* eslint-disable */
