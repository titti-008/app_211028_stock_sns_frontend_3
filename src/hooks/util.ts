import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
// import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { CreateUserType } from '../components/Types';
// PasswordConfirmationType

type ColorsType = {
  baseGround: string;
  baseSheet: string;
  paper: string;
  header: string;
  text: string;
  errorText: string;
  icon: string;
};

export const Colors = (theme: Theme): ColorsType => {
  // ダークモードのとき
  const colors = {
    baseGround: '#262F40',
    baseSheet: '#293345',
    paper: '#34373B',
    header: '#192f60',
    text: '#D4DEFC',
    errorText: '#E04E27',
    icon: '#99BDFF',
  };

  if (theme.palette?.mode === 'light') {
    // lightモードのとき
    colors.baseGround = '#BDC6DE';
    colors.baseSheet = '#DFE6ED';
    colors.paper = '#DBE7F5';
    colors.header = '#F6FFFF';
    colors.text = '#3C4A63';
    colors.errorText = '#E04E27';
    colors.icon = '#85A4DE';
  }

  return colors;
};

export const useColors = () => {
  const theme = useTheme();

  return Colors(theme);
};

export const range = (start: number, end: number): Array<number> =>
  [...Array<number>(end - start).keys()].map((n) => n + start);

// export const dateFormat = (date: Date): string => formatDistanceToNow(date);

export const useCheckPassword = (password: string, confirmation: string) => {
  // 数字、大文字英字、小文字英字を少なくとも1つ以上含み8~24文字である正規表現
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{8,24}$/;

  const notMatchRegex = !regex.test(password);
  const isBlank = password.length === 0;
  const notMatch = password !== confirmation;
  const isPassError = notMatchRegex || notMatch;
  const isDisablePassword = isPassError || isBlank;
  const passErrorMessage = notMatchRegex
    ? '数字、大文字英字、小文字英字を少なくとも1つ以上含む8~24字にしてください'
    : 'パスワードが一致しません。';

  return { isPassError, passErrorMessage, isDisablePassword };
};

export const useCheckName = (name: string) => {
  const isLong = name.length > 20;
  const isBlank = name.length === 0;
  const isNameError = isLong || isBlank;
  const isDisableName = isNameError || isBlank;
  const nameErrorMessage = isLong
    ? '名前は20文字以内にしてください'
    : '名前を入力してください';

  return { isNameError, nameErrorMessage, isDisableName };
};

export const useCheckEmail = (email: string) => {
  const isLong = email.length > 255;
  const isBlank = email.length === 0;
  const isEmailError = isLong || isBlank;
  const isDisableEmail = isEmailError || isBlank;
  const emailErrorMessage = isLong
    ? 'メールアドレスはは255文字以内のものしか使えません'
    : 'メールアドレスを入力してください';

  return { isEmailError, emailErrorMessage, isDisableEmail };
};

export const useUserDataInput = () => {
  const initInput = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };
  const [values, setvalues] = useState(initInput);

  const handleChange =
    (key: keyof CreateUserType) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setvalues({ ...values, [key]: event.target.value });
    };

  return { values, handleChange };
};
