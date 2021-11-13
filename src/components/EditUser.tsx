import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import { CreateUserType, RouteCurrentUserPropsType } from './Types';
import { updateUser } from './api';
import { PasswordForm, NormalForm } from './privateMUI/PrivateForms';

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
