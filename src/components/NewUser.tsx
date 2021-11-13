import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { CreateUserType, RouteUserPropsType, ErrorResponse } from './Types';
import { createUser } from './api';
import { SuccessToasts, ErrorToasts } from './toast/PrivateToast';
import { PasswordForm, NormalForm } from './privateMUI/PrivateForms';
import { SubmitButton, LinkButton } from './privateMUI/PrivateBottuns';

const NewUsers: React.FC<RouteUserPropsType> = (_props) => {
  /* eslint-disable */
  const props = _props;
  /* eslint-disable */

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

  const saveUser = async () => {
    try {
      const response = await createUser(values);
      props.setCurrentUser(response.data.user);
      void props.setIsLogin(response.data.loggedIn);

      if (response.status === 201) {
        props.setCurrentUser(response.data.user);
        SuccessToasts(response.data.messages);
      } else if (response.status === 202) {
        ErrorToasts(response.data.messages);
      }
    } catch (err) {
      if ((err as ErrorResponse).response !== undefined)
        console.log('user登録失敗');
      console.log((err as ErrorResponse).response);
      ErrorToasts([
        'ユーザー登録に失敗しました。',
        'データサーバーとの接続に問題がある可能性があります。',
      ]);
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
      <h1>ログイン状態: {props.currentUser ? 'ログイン済み' : '未ログイン'}</h1>
      <NormalForm
        value={values.name}
        handleChange={handleChange('name')}
        // infoText="ユーザー登録 名前を入力してください。"
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
        handleChange={handleChange('password')}
        // infoText="パスワードを入力してください(確認用)。"
        label="password(確認用)"
      />
      <SubmitButton onClick={saveUser} label="ユーザー登録" />
      <LinkButton linkTo="/login" label="登録済みならこちらからログイン" />
    </Grid>
  );
};

export default NewUsers;

// /* eslint-disable */
// // const { currentUser, setCurrentUser, setIsLogin } = { ...props };
// /* eslint-disable */
