import React, { useState } from 'react';
import {
  useTheme,
  // IconButton,
  Grid,
  // Divider,
  // Avatar,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Colors } from '../util';
import { CreateUserType, RouteUserPropsType } from './Types';
import { loginUser } from './api';
import { SuccessToasts, ErrorToasts } from './toast/PrivateToast';
import PasswordForm from './form/PrivateForms';

// toast.configure(); // トーストを10秒間保持する設定

const LoginForm: React.FC<RouteUserPropsType> = ({ ...props }) => {
  /* eslint-disable */
  const { currentUser, setCurrentUser } = { ...props };
  /* eslint-disable */

  const theme = useTheme();

  const [messages, setMessage] = useState<string[]>([]);

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

  const handleLoginUser = async () => {
    try {
      const response = await loginUser(values);

      if (response.status === 200) {
        console.log(response);
        setCurrentUser(response.data.user);
        SuccessToasts(response.data.messages);
      } else if (response.status === 202) {
        console.log(response.data.messages);

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
      <Typography
        sx={{ color: colors.text }}
        style={{ overflowWrap: 'break-word' }}
      >
        <Grid item sx={{ width: '100%' }}>
          <Typography
            sx={{ color: colors.text }}
            style={{ overflowWrap: 'break-word' }}
          >
            <h1>Log in</h1>
            <p>ログイン状態:{currentUser ? 'ログイン済み' : '未ログイン'}</p>
          </Typography>
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
        <Grid item marginTop="10px">
          <Button onClick={handleLoginUser} variant="outlined">
            ログイン
          </Button>
        </Grid>
        <Grid item marginTop="10px">
          <Link to="/signup">
            <Typography
              sx={{ color: colors.text }}
              style={{ overflowWrap: 'break-word' }}
            >
              <Button variant="outlined">新規登録はこちら</Button>
            </Typography>
          </Link>
        </Grid>
        {messages.length !== 0 ? (
          messages.map((message) => {
            return (
              <Grid item marginTop="10px">
                <Typography
                  sx={{ color: colors.text }}
                  style={{ overflowWrap: 'break-word' }}
                >
                  {message}
                </Typography>
              </Grid>
            );
          })
        ) : (
          <div>なし</div>
        )}
      </Typography>
    </Grid>
  );
};

export default LoginForm;
