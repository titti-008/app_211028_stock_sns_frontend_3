// import { RouteProps } from 'react-router-dom';
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

export type loginUserType = Email &
  Password & {
    rememberMe: boolean;
  };

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
export type StockType = {
  stock: Id &
    Name & {
      symbol: string;
      country: string;
      ipoYear: number;
      sector: string;
      industry: string;
    };
};

// -------- Earnings ----------

export type EarningType = Id & {
  symbol: string;
  fiscalDateEnding: Date;
  reportedDate: Date;
  reportedEPS: number;
  estimatedEPS: number;
  surprisePercentage: number;
  reportedCurrency: number;
  totalRevenue: number;
  costOfRevenue: number;
  operatingIncome: number;
  grossProfit: number;
  operatingCashflow: number;
  netIncome: number;
};

export type Earnings = {
  earnings: EarningType[];
};
// -------- サーバーレスポンス ----------
type User = { user: UserType };
type Users = { users: UsersType };

type Messages = { messages: string[] };
type LoggedIn = { loggedIn: boolean };
type Microposts = { microposts: Micropost[] };

export type UsersResponse = Messages & Users;

export type LoginResponse = LoggedIn & Messages & User;

export type LogoutResponse = LoggedIn & Messages;

export type ShowUserResponse = User & Messages;

export type MessageResponse = Messages;

export type DeleteUserResponse = Messages & Users;

export type EarningsResponse = Messages & Earnings & StockType;

export type HistoryPropsType = {
  history: H.History;
};

export type ResetEmail = Email;

export type ErrorResponse = AxiosError<Messages>;

export type MicropostsResponse = Messages & Microposts & Page;

export type PageType = {
  previousId: number;
  nextId: number;
  data: MicropostsResponse;
};
