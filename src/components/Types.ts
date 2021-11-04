export type Data = {
  text: string;
};

export type ApiResponse = {
  text: string;
};

export type UserType = {
  createdAt: Date;
  email: string | null;
  id: number;
  name: string | null;
};

export type CreateUserType = {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
};

/* eslint-disable */
/* eslint-disable */

export type UsersType = Array<UserType>;

export type UsersResponse = UsersType;
