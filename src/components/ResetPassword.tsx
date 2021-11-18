import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { CreateUserType, ErrorResponse } from './Types';
import { ResetPassword } from './api';
import { SuccessToasts, ErrorToasts } from './toast/PrivateToast';
import { PasswordForm } from './privateMUI/PrivateForms';
import { SubmitButton } from './privateMUI/PrivateBottuns';
import { NormalText } from './privateMUI/PrivateTexts';

const ResetPasswordForm: React.FC<
  RouteComponentProps<{ id: string; email: string }>
> = ({ ...props }) => {
  type Params = {
    id: string;
    email: string;
  };
  const params = useParams<Params>();

  console.log('params', params);
  console.log('props', props);

  const [values, setvalues] = useState({
    id: params.id,
    email: decodeURIComponent(params.email),
    password: '',
    passwordConfirmation: '',
  });

  const handleChange =
    (key: keyof CreateUserType) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setvalues({ ...values, [key]: event.target.value });
    };

  const handleResetPassword = async () => {
    try {
      const response = await ResetPassword(values);

      if (response.status === 200) {
        // props.setCurrentUser(response.data.user);
        SuccessToasts(response.data.messages);
        /* eslint-disable */
        props.history.push('/current_user');
        /* eslint-disable */
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
      <NormalText>パスワード再設定</NormalText>
      <PasswordForm
        value={values.password}
        handleChange={handleChange('password')}
        label="password"
      />
      <PasswordForm
        value={values.passwordConfirmation}
        handleChange={handleChange('passwordConfirmation')}
        label="password(確認用)"
      />
      <NormalText>email:{values.email}</NormalText>
      <NormalText>token:{values.id}</NormalText>
      <NormalText>password:{values.password}</NormalText>
      <NormalText>passConf{values.passwordConfirmation}</NormalText>

      <SubmitButton onClick={handleResetPassword} label="パスワード変更" />
    </Grid>
  );
};

export default ResetPasswordForm;

// /* eslint-disable */
// // const { currentUser, setCurrentUser, setIsLogin } = { ...props };
// /* eslint-disable */
