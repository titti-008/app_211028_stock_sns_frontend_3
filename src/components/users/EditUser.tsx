import React from 'react';
import { useQueryClient } from 'react-query';
import { LoginResponse, HistoryPropsType, ErrorResponse } from '../Types';
import { NormalText } from '../privateMUI/PrivateTexts';
import { updateUser } from '../api';
import { SuccessToasts, ErrorToasts } from '../toast/PrivateToast';
import useUserDataInput from '../../hooks/useDataInput';
import UserDataForm from '../../hooks/UserDataForm';

const EditUser: React.FC<HistoryPropsType> = ({ history }) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<LoginResponse>(`loginData`);

  const initInput = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const { values, handleChange } = useUserDataInput(initInput);

  const userData = {
    id: data?.user ? data?.user.id : 0,
    ...values,
  };

  const submitUpdateUser = async () => {
    try {
      const response = await updateUser(userData);

      if (response.status === 201) {
        SuccessToasts(response.data.messages);
        // dispatch({
        //   type: 'saveUser',
        //   setUser: response.data.user,
        //   isLogin: response.data.loggedIn,
        // });
        history.push('/current_user');
        console.log('編集完了', response);
      } else {
        console.log('status200以外のレスポンス');
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
    <>
      <NormalText>ユーザー情報編集</NormalText>
      <UserDataForm
        values={values}
        handleChange={handleChange}
        onClick={submitUpdateUser}
        submitLabel="編集完了"
        PassWordAllowNull
      />
    </>
  );
};

export default EditUser;
