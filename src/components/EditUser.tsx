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

// import { Redirect } from 'react-router-dom';
import { Colors } from '../util';
import { CreateUserType, RouteCurrentUserPropsType } from './Types';
import { updateUser } from './api';
import PasswordForm from './form/PrivateForms';

const EditUser: React.FC<RouteCurrentUserPropsType> = (props) => {
  /* eslint-disable */
  const { currentUser, setCurrentUser, history } = { ...props };
  /* eslint-disable */

  const theme = useTheme();

  const colors = Colors(theme);

  const [values, setvalues] = useState({
    id: currentUser ? currentUser.id : 0,
    email: currentUser ? currentUser.email : '',
    name: currentUser ? currentUser.name : '',
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

  const submitUpdateUser = async () => {
    try {
      console.log('values');
      console.log(values);
      const response = await updateUser(values);

      if (response.status === 200) {
        console.log(response);
        setCurrentUser(response.data.user);
        console.log('ユーザー情報編集完了');
        history.push('/current_user');
      } else {
        console.log('status200以外のレスポンス');
        console.log(response);
      }
    } catch (err) {
      console.log('user編集失敗');
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
            <h1>ユーザー情報編集</h1>
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
            password={values.passwordConfirmation}
            handleChange={handleChange('passwordConfirmation')}
          />
        </Grid>
        <Grid item>
          <Button onClick={submitUpdateUser} variant="outlined">
            編集完了
          </Button>
        </Grid>
      </Typography>
    </Grid>
  );
};

export default EditUser;

/* eslint-disable */
/* eslint-disable */
