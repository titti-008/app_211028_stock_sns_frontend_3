import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import {
  CreateUserType,
  RouteCurrentUserPropsType,
  ErrorResponse,
} from './Types';
import { updateUser } from './api';
import { PasswordForm, NormalForm } from './privateMUI/PrivateForms';
import { SuccessToasts, ErrorToasts } from './toast/PrivateToast';

const EditUser: React.FC<RouteCurrentUserPropsType> = (props) => {
  /* eslint-disable */
  const { currentUser, setCurrentUser, history } = { ...props };
  /* eslint-disable */

  const [values, setvalues] = useState({
    id: currentUser ? currentUser.id : 0,
    email: currentUser ? currentUser.email : '',
    name: currentUser ? currentUser.name : '',
    password: '',
    passwordConfirmation: '',
  });

  const handleChange =
    (key: keyof CreateUserType) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setvalues({ ...values, [key]: event.target.value });
    };

  const submitUpdateUser = async () => {
    try {
      const response = await updateUser(values);

      if (response.status === 201) {
        SuccessToasts(response.data.messages);
        setCurrentUser(response.data.user);
        history.push('/current_user');
        console.log('編集完了', response);
      } else {
        console.log('status200以外のレスポンス');
        console.log('編集失敗', response);
        ErrorToasts(response.data.messages);
      }
    } catch (err) {
      if ((err as ErrorResponse).response !== undefined)
        console.log('user編集失敗');
      console.log((err as ErrorResponse).response);
      ErrorToasts([
        'ログイン状態の確認に失敗しました。',
        'データサーバーとの接続に問題がある可能性があります。',
      ]);
      ErrorToasts((err as ErrorResponse).response?.data.messages);
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
      <h1>ユーザー情報編集</h1>
      <NormalForm
        value={values.name}
        handleChange={handleChange('name')}
        // infoText="名前を入力してください。"
        label="name"
      />
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
      <PasswordForm
        value={values.passwordConfirmation}
        handleChange={handleChange('passwordConfirmation')}
        // infoText="パスワードを入力してください(確認用)。"
        label="password(確認用)"
      />
      <Grid item>
        <Button onClick={submitUpdateUser} variant="outlined">
          編集完了
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditUser;

/* eslint-disable */
/* eslint-disable */
