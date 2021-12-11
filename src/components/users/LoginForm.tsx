import { FC, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { loginUserType, LoginResponse, HistoryPropsType } from '../Types';
import { loginRequest } from '../api';
import { SuccessToasts } from '../toast/PrivateToast';
import { NormalForm, RememberCheckBox } from '../privateMUI/PrivateForms';
import { NormalText } from '../privateMUI/PrivateTexts';
import { SubmitButton, LinkButton } from '../privateMUI/PrivateBottuns';
import { useAppContext } from '../../hooks/ReduserContext';

const LoginForm: FC<HistoryPropsType> = ({ history }) => {
  const [values, setvalues] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const disable = values.email.length === 0 || values.password.length === 0;

  const { dispatch } = useAppContext();

  console.log('RememberMe', values.rememberMe);

  const handleChange =
    (key: keyof loginUserType) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setvalues({ ...values, [key]: event.target.value });
    };

  const queryClient = useQueryClient();
  const queryKey = `loginData`;

  const mutation = useMutation(loginRequest, {
    onSuccess: (res) => {
      SuccessToasts(res.data.messages);
      dispatch({
        type: 'saveUser',
        setUser: res.data.user,
        isLogin: res.data.loggedIn,
      });
      const prevData = queryClient.getQueryData<LoginResponse>(queryKey);
      if (prevData) {
        queryClient.setQueryData<LoginResponse>(queryKey, res.data);
      }

      history.push('/');
    },
  });

  // const handleLoginUser = async () => {
  //   try {
  //     const response = await loginUser(values);
  //     if (response.status === 200) {
  //       dispatch({
  //         type: 'saveUser',
  //         setUser: response.data.user,
  //         isLogin: response.data.loggedIn,
  //       });
  //       SuccessToasts(response.data.messages);
  //     } else if (response.status === 202) {
  //       ErrorToasts(response.data.messages);
  //     }
  //   } catch (err: unknown) {
  //     console.log('ログイン失敗');
  //     console.log(err);
  //   }
  // };

  const data = queryClient.getQueryData<LoginResponse>(queryKey);

  return (
    <>
      <NormalText>
        <h1>Log in</h1>
        <p>ログイン状態:{data?.user ? 'ログイン済み' : '未ログイン'}</p>
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
        disabled={false}
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
        onClick={() => mutation.mutate({ user: values })}
        label="ログイン"
        disabled={disable}
        isLoading={false}
      />
      <LinkButton linkTo="/signup" label="新規登録はこちら" disabled={false} />
    </>
  );
};

export default LoginForm;
