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
// import { RouteComponentProps } from 'react-router-dom';

// import { Link } from 'react-router-dom';
// import { CreateUserType } from './Types';
import { Colors } from '../util';
import { CreateUserType, RouteTestUserPropsType } from './Types';
import { loginUser } from './api';

const TestLogin: React.FC<RouteTestUserPropsType> = ({ ...props }) => {
  /* eslint-disable */
  const { isLogin, handleLogin, currentUser } = { ...props };
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

  const handleLoginUser = async () => {
    try {
      const response = await loginUser(values);

      if (response.status === 200) {
        console.log(response);
        handleLogin(response.data.user);
      } else {
        console.log('status200以外のレスポンス');
        console.log(response);
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
            <p>ログイン状態:{isLogin ? 'ログイン済み' : '未ログイン'}</p>
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
          <FormControl variant="standard" margin="normal">
            <InputLabel>Password</InputLabel>
            <Input
              type="password"
              value={values.password}
              onChange={handleChange('password')}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Button onClick={handleLoginUser} variant="outlined">
            ログイン
          </Button>
        </Grid>
        <Grid item>
          <Typography
            sx={{ color: colors.text }}
            style={{ overflowWrap: 'break-word' }}
          >
            currentUser:{currentUser.name},{currentUser.email},{currentUser.id}
          </Typography>
        </Grid>
        <Grid item>
          <Link to="/signup">
            <Button variant="outlined">新規登録はこちら</Button>
          </Link>
        </Grid>
      </Typography>
    </Grid>
  );
};

export default TestLogin;
