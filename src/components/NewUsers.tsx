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
import { Colors } from '../util';
import { CreateUserType, RouteUserPropsType } from './Types';
import { createUser } from './api';

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

  // const [errors, setErrors] = userState({

  // })

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

      if (response.status === 201) {
        console.log(response);
        setCurrentUser(response.data.user);

        /* eslint-disable */
        /* eslint-disable */
        window.location.href = `/users/${response.data.user.id}`;
      } else {
        console.log('status200以外のレスポンス');
        console.log(response);
      }
    } catch (err) {
      console.log('user登録失敗');
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
          <FormControl variant="standard" margin="normal">
            <InputLabel>Password</InputLabel>
            <Input
              type="password"
              value={values.password}
              onChange={handleChange('password')}
            />
          </FormControl>
        </Grid>
        <Grid item xs sx={{ width: '100%' }}>
          <Typography
            sx={{ color: colors.text }}
            style={{ overflowWrap: 'break-word' }}
          >
            パスワードを入力してください(確認用)。
          </Typography>
          <FormControl variant="standard" margin="normal">
            <InputLabel>Password(確認)</InputLabel>
            <Input
              type="password"
              value={values.passwordConfirmation}
              onChange={handleChange('passwordConfirmation')}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Button onClick={saveUser} variant="outlined">
            ユーザー登録
          </Button>
        </Grid>
      </Typography>
    </Grid>
  );
};

export default NewUsers;
