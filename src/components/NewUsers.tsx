import React, { useState } from 'react';
import {
  useTheme,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
} from '@mui/material';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { Colors } from '../util';
import {
  CreateUserType,
  RouteUserPropsType,
  LoginResponse,
  ErrorResponse,
} from './Types';
import { createUser } from './api';
import { SuccessToasts, ErrorToasts } from './toast/PrivateToast';
import PasswordForm from './form/PrivateForms';

const NewUsers: React.FC<RouteUserPropsType> = (props) => {
  /* eslint-disable */
  const { currentUser, setCurrentUser } = { ...props };
  /* eslint-disable */

  const theme = useTheme();

  const colors = Colors(theme);

  const [values, setvalues] = useState({
    email: '',
    name: '',
    password: '',
    passwordConfirmation: '',
  });

  const handleChange =
    (key: keyof CreateUserType) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setvalues({ ...values, [key]: event.target.value });
    };

  // const handleMouseDownPassword = (
  //   event: React.MouseEvent<HTMLButtonElement>,
  // ) => {
  //   event.preventDefault();
  // };

  const saveUser = async () => {
    try {
      const response = await createUser(values);
      console.log(response);
      if (response.status === 200) {
        console.log(response);
        setCurrentUser(response.data.user);
        SuccessToasts(response.data.messages);
      } else if (response.status === 500) {
        console.log('status200以外のレスポンス');

        ErrorToasts(response.data.messages);
      }
    } catch (err) {
      if ((err as AxiosError<ErrorResponse>).response !== undefined)
        console.log('user登録失敗');
      console.log((err as AxiosError<ErrorResponse>).response);
      ErrorToasts([
        'ユーザー登録に失敗しました。',
        'データサーバーとの接続に問題がある可能性があります。',
      ]);
    }
  };

  const a = {} as LoginResponse;

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      wrap="nowrap"
      sx={{ padding: '10px' }}
    >
      <Typography
        sx={{ color: colors.text }}
        style={{ overflowWrap: 'break-word' }}
      >
        <Grid item sx={{ width: '100%' }}>
          <Typography
            sx={{ color: colors.text }}
            style={{ overflowWrap: 'break-word' }}
          >
            <h1>ログイン状態: {currentUser ? 'ログイン済み' : '未ログイン'}</h1>
            <p>ユーザー登録 名前を入力してください。</p>
          </Typography>
          <FormControl variant="standard">
            <InputLabel>name</InputLabel>
            <Input value={values.name} onChange={handleChange('name')} />
          </FormControl>
        </Grid>
        <Grid item xs sx={{ width: '100%' }}>
          <Typography
            sx={{ color: colors.text }}
            style={{ overflowWrap: 'break-word' }}
          >
            メールアドレスを入力してください。
          </Typography>
          <FormControl variant="standard">
            <InputLabel>Email</InputLabel>
            <Input value={values.email} onChange={handleChange('email')} />
          </FormControl>
        </Grid>
        <Grid item xs sx={{ width: '100%' }}>
          <Typography
            sx={{ color: colors.text }}
            style={{ overflowWrap: 'break-word' }}
          >
            パスワードを入力してください。
          </Typography>
          <PasswordForm
            password={values.password}
            handleChange={handleChange('password')}
          />
        </Grid>
        <Grid item xs sx={{ width: '100%' }}>
          <Typography
            sx={{ color: colors.text }}
            style={{ overflowWrap: 'break-word' }}
          >
            パスワードを入力してください(確認用)。
          </Typography>
          <PasswordForm
            password={values.password}
            handleChange={handleChange('passwordConfirmation')}
          />
        </Grid>
        <Grid item>
          <Button onClick={saveUser} variant="outlined">
            ユーザー登録
          </Button>
        </Grid>

        <Grid item marginTop="10px">
          <Link to="/login">
            <Typography
              sx={{ color: colors.text }}
              style={{ overflowWrap: 'break-word' }}
            >
              <Button variant="outlined">
                登録済みの方はこちらからログイン
              </Button>
            </Typography>
          </Link>
        </Grid>
      </Typography>
    </Grid>
  );
};

export default NewUsers;
