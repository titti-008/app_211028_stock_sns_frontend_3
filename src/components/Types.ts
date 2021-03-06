// import { RouteComponentProps } from 'react-router-dom';
import * as H from 'history';
import { AxiosError } from 'axios';

export type ApiResponse = {
  text: string;
};

// -------- ユーザー ----------

type Id = { id: number };
type Email = { email: string };
type Name = { name: string };
type Password = { password: string };
type PassConf = { passwordConfirmation: string };

type CreatedAt = { createdAt: Date | number };
type Admin = { admin: boolean };
type UserCounts = {
  countMicroposts: number;
  countFollowing: number;
  countFollowers: number;
};
type Follow = {
  isFollower: boolean;
  isFollowing: boolean;
};

type RememberMe = {
  rememberMe: boolean;
};

export type UserType = Id &
  Email &
  Name &
  CreatedAt &
  Admin &
  UserCounts &
  Follow;

export type UsersUser = Id & Name & Admin;
export type UsersType = UsersUser[];

export type CurrentUser = UserType | null;

export type CreateUserType = Email & Name & Password & PassConf;

export type PasswordConfirmationType = Password & PassConf;

export type EditUserType = Id & CreateUserType;

export type ResetPasswordData = Id & Email & Password & PassConf;

export type loginUserType = Email & Password & RememberMe;

// -------- マイクロポスト ----------
type Content = { content: string };
type Images = { images: string[] };
type Page = { nextId: number };

export type Micropost = Id &
  Content &
  CreatedAt &
  Images & {
    user: Id & Name;
  };

// -------- Stocks ----------

export type Stock = Id &
  Name & {
    symbol: string;
    country: string;
    ipoYear: number;
    sector: string;
    industry: string;
    price: number;
    previousClose: number;
    timestamp: Date;
    earningsAnnouncement: string;
  };

export type StockType = { stock: Stock };
export type StocksType = { stocks: Stock[] };

// -------- Earnings ----------

export type EarningType = Id & {
  symbol: string;
  endOfQuarter: Date;
  // date: Date;
  fillingDate: Date;
  revenue: number;
  revenueEstimated: number;
  revenueGrowth: number;
  eps: number;
  epsEstimated: number;
  epsgrowth: number;
  reportedCurrency: number;
  operatingCashFlow: number;
  operatingCashFlowGrowth: number;
  netIncome: number;
  stockPrice: number;
  numberOfShares: number;
  marketCapitalization: number;
};

export type Earnings = {
  earnings: EarningType[];
};

// -------- stockPrice ----------
export type StockPrice = {
  date: Date;
  open: number;
  close: number;
  low: number;
  high: number;
  volume: number;
};

export type StockPrices = {
  stockPrices: StockPrice[];
};

// quote

export type QuoteType = {
  symbol: string;
  price: number;
  changesPercentage: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  priceAvg50: number;
  priceAvg200: number;
  volume: number;
  avgVolume: number;
  exchange: string;
  open: number;
  previousClose: number;
  eps: number;
  pe: number;
  earningsAnnouncement: Date;
  sharesOutstanding: number;
  timestamp: number;
};

// -------- サーバーレスポンス ----------
type User = { user: UserType };
type Users = { users: UsersType };

export type Messages = { messages: string[] };
export type ApiErrorMessage = { 'Error Message': string };
type LoggedIn = { loggedIn: boolean };
type Microposts = { microposts: Micropost[] };

export type UsersResponse = Messages & Users;

export type LoginResponse = LoggedIn & Messages & { user: CurrentUser };

export type ShowUserResponse = User & Messages;

export type MessageResponse = Messages;

export type DeleteUserResponse = Messages & Users;

export type EarningsResponse = Messages & Earnings & StockType;

export type HistoryPropsType = {
  history: H.History;
};

// export type RouteAndIdProps ={

// }

export type ResetEmail = Email;

export type ErrorResponse = AxiosError<Messages>;

export type MicropostsResponse = Messages & Microposts & Page;

export type CreateMicropostResponse = Messages & {
  micropost: Micropost;
};

export type PageType = {
  previousId: number;
  nextId: number;
  data: MicropostsResponse;
};

export type StockPriceResponse = {
  message: string;
  symbol: string;
  historical: StockPrice[];
};

export type StocksResponse = Messages & StocksType;

export type MyStockPrice = {
  data: Stock[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: ApiErrorMessage | null;
};
