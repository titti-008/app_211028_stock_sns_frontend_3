import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { CreateUserType, RouteUserPropsType } from './Types';
import { loginUser } from './api';
import { SuccessToasts, ErrorToasts } from './toast/PrivateToast';
import { PasswordForm, NormalForm } from './privateMUI/PrivateForms';
import { NormalText } from './privateMUI/PrivateTexts';
// toast.configure(); // トーストを10秒間保持する設定

const LoginForm: React.FC<RouteUserPropsType> = ({ ...props }) => {
  /* eslint-disable */
  const { currentUser, setCurrentUser, setIsLogin } = { ...props };
  /* eslint-disable */

  const [messages, setMessage] = useState<string[]>([]);

  const [values, setvalues] = useState({
    email: '',
    password: '',
  });

  const handleChange =
    (key: keyof CreateUserType) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setvalues({ ...values, [key]: event.target.value });
    };

  const handleLoginUser = async () => {
    try {
      const response = await loginUser(values);
      setCurrentUser(response.data.user);
      setIsLogin(response.data.loggedIn);

      if (response.status === 200) {
        SuccessToasts(response.data.messages);
      } else if (response.status === 202) {
        ErrorToasts(response.data.messages);
      }
    } catch (err: unknown) {
      console.log('ログイン失敗');
      console.log(err);
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      wrap="nowrap"
      sx={{ padding: '10px' }}
    >
      <NormalText>
        <h1>Log in</h1>
        <p>ログイン状態:{currentUser ? 'ログイン済み' : '未ログイン'}</p>
      </NormalText>

      <NormalForm
        value={values.email}
        handleChange={handleChange('email')}
        // infoText="メールアドレスを入力してください。"
        label="Email"
      />
      <PasswordForm
        value={values.password}
        handleChange={handleChange('password')}
        // infoText="パスワードを入力してください。"
        label="password"
      />

      <Grid item marginTop="10px">
        <Button onClick={handleLoginUser} variant="outlined">
          ログイン
        </Button>
      </Grid>
      <Grid item marginTop="10px">
        <Link to="/signup">
          <Button variant="outlined">新規登録はこちら</Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
