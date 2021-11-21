import { FC, useState } from 'react';
import { loginUserType, RouteUserPropsType } from '../Types';
import { loginUser } from '../api';
import { SuccessToasts, ErrorToasts } from '../toast/PrivateToast';
import { NormalForm, RememberCheckBox } from '../privateMUI/PrivateForms';
import { NormalText } from '../privateMUI/PrivateTexts';
import { SubmitButton, LinkButton } from '../privateMUI/PrivateBottuns';

// toast.configure(); // トーストを10秒間保持する設定

const LoginForm: FC<RouteUserPropsType> = ({ ...props }) => {
  const { currentUser, setCurrentUser, setIsLogin } = { ...props };

  const [values, setvalues] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  console.log('RememberMe', values.rememberMe);

  const handleChange =
    (key: keyof loginUserType) =>
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
    <>
      <NormalText>
        <h1>Log in</h1>
        <p>ログイン状態:{currentUser ? 'ログイン済み' : '未ログイン'}</p>
      </NormalText>

      <NormalForm
        value={values.email}
        handleChange={handleChange('email')}
        label="Email"
        error={false}
        isPassword={false}
        errorText="エラー"
      />
      <LinkButton
        linkTo="/password_resets/new"
        label="パスワードを忘れた場合"
      />
      <NormalForm
        value={values.password}
        handleChange={handleChange('password')}
        label="password"
        error={false}
        isPassword
        errorText="エラー"
      />

      <RememberCheckBox handleChange={handleChange('rememberMe')} />

      <SubmitButton
        onClick={handleLoginUser}
        label="ログイン"
        disabled={false}
      />
      <LinkButton linkTo="/signup" label="新規登録はこちら" />
    </>
  );
};

export default LoginForm;
/* eslint-disable */
/* eslint-disable */
