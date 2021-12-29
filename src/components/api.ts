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
  StocksResponse,
  Stock,
  ApiErrorMessage,
} from './Types';

const env = process.env.REACT_APP_SERVER_URL ?? ''; // 文字列型であることを強制

export const apiUrl = `${env}/api/v1`;
const usersUrl = `${apiUrl}/users`;
export const micropostsUrl = `${apiUrl}/microposts`;
const relationshipsUrl = `${apiUrl}/relationships`;
const StockUrl = `${apiUrl}/stocks`;

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
  instance.delete<LoginResponse, AxiosResponse<LoginResponse>, ErrorResponse>(
    `${apiUrl}/logout`,
  );

/// /////////////////////////////////////////////////
const usePrivateQuery = <T, U>(request: () => Promise<T>, queryKey: string) => {
  const { data, isLoading, isError, error } = useQuery<T, U>(queryKey, request);

  return { data, isLoading, isError, error };
};
/// /////////////////////////////////////////////////

export const useLoggedQuery = () =>
  usePrivateQuery<AxiosResponse<LoginResponse>, AxiosResponse<ErrorResponse>>(
    () =>
      instance.get<LoginResponse, AxiosResponse<LoginResponse>, ErrorResponse>(
        `${apiUrl}/logged_in`,
      ),
    'loginData',
  );

export const useStockPriceQuery = (symbol: string, day: string) =>
  usePrivateQuery<AxiosResponse<StockPriceResponse>, ErrorResponse>(
    () =>
      axios.get<
        StockPriceResponse,
        AxiosResponse<StockPriceResponse>,
        ErrorResponse
      >(`${apiUrl}/stocks/stock_historical?symbol=${symbol}&day=${day}`),
    `price-${symbol}-${day}`,
  );

export const MyStocksPriceNow = () => {
  // バックエンドからフォローしている株式を取得→それらのシンボルをつないでURLにしてAPIで一括株価情報検索
  const request = async () => {
    const backendStockRes = await instance.get<
      StocksResponse,
      AxiosResponse<StocksResponse>,
      ErrorResponse
    >(`${StockUrl}/my_following_stock`);

    return backendStockRes.data.stocks;
  };

  const { data, isLoading, isError, error } = useQuery<
    Stock[],
    ApiErrorMessage
  >(`myStocks-price`, request);

  return { data, isLoading, isError, error };
};

export const useGetUsers = () =>
  usePrivateQuery<AxiosResponse<UsersResponse>, ErrorResponse>(
    async () =>
      instance.get<UsersResponse, AxiosResponse<UsersResponse>, ErrorResponse>(
        `${usersUrl}`,
      ),
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

export const getMyFeed = (
  type: 'myfeed' | number,
  pageParam?: number | undefined,
) => {
  const res = instance.get<
    MicropostsResponse,
    AxiosResponse<MicropostsResponse>,
    ErrorResponse
  >(`${micropostsUrl}/${type}/${pageParam ?? ''}`);

  return res;
};

export const createMicropost = async (params: FormData) => {
  const response = await instance.post<MicropostsResponse>(
    micropostsUrl,
    params,
    {
      headers: {
        'content-type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};

export const deleteMicropost = (id: number) =>
  instance.delete<MessageResponse>(`${micropostsUrl}/${id}`);

export const getEarnings = async (symbol: string) => {
  const response = await instance.get<EarningsResponse>(
    `${StockUrl}/${symbol}`,
  );

  return response.data;
};

export const followStock = ({ symbol }: { symbol: string }) =>
  instance.post<StocksResponse, AxiosResponse<StocksResponse>>(
    `${apiUrl}/stock_relationships`,
    {
      id: symbol,
    },
  );

export const unfollowStock = ({ symbol }: { symbol: string }) =>
  instance.delete<StocksResponse, AxiosResponse<StocksResponse>, ErrorResponse>(
    `${apiUrl}/stock_relationships/${symbol}`,
  );
