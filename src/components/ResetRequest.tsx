import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { ResetPasswordPropsType } from './Types';
import { ResetRequest } from './api';
import { SuccessToasts, ErrorToasts } from './toast/PrivateToast';
import { NormalForm } from './privateMUI/PrivateForms';
import { NormalText } from './privateMUI/PrivateTexts';
import { SubmitButton, LinkButton } from './privateMUI/PrivateBottuns';

const ResetRequestForm: React.FC<ResetPasswordPropsType> = ({ ...props }) => {
  /* eslint-disable */
  const [values, setvalues] = useState({
    email: '',
  });
  /* eslint-disable */

  const handleChange =
    (key: keyof { email: string }) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setvalues({ ...values, [key]: event.target.value });
    };

  const handleResetRequest = async () => {
    try {
      const response = await ResetRequest(values);

      if (response.status === 200) {
        SuccessToasts(response.data.messages);
        props.history.push('/login');
      } else if (response.status === 202) {
        ErrorToasts(response.data.messages);
      }
    } catch (err: unknown) {
      console.log('サーバーとの通信に問題があります。');
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
        <h1>パスワード再設定</h1>
        <p>再設定用のメールアドレスを入力してください</p>
      </NormalText>

      <NormalForm
        value={values.email}
        handleChange={handleChange('email')}
        label="Email"
      />

      <SubmitButton onClick={handleResetRequest} label="再設定メール送信" />
      <LinkButton linkTo="/signup" label="新規登録はこちら" />
    </Grid>
  );
};

export default ResetRequestForm;
/* eslint-disable */
/* eslint-disable */
