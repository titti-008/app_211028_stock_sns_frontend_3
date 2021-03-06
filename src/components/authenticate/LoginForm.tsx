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

  const handleChange =
    (key: keyof loginUserType) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setvalues({ ...values, [key]: event.target.value });
    };

  const queryClient = useQueryClient();
  const queryKey = `loginData`;

  const mutation = useMutation(queryKey, loginRequest, {
    onSuccess: (res) => {
      history.push('/');
      SuccessToasts(res.data.messages);

      const prevData = queryClient.getQueryData<LoginResponse>(queryKey);
      if (prevData) {
        queryClient.setQueryData<LoginResponse>(queryKey, res.data);
      }

      dispatch({
        type: 'saveUser',
        setUser: res.data.user,
        isLogin: true,
      });
    },
  });

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
        isLoading={mutation.isLoading}
      />
      <LinkButton linkTo="/signup" label="新規登録はこちら" disabled={false} />
    </>
  );
};

export default LoginForm;
