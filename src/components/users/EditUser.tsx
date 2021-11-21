import React from 'react';
import { RouteCurrentUserPropsType, ErrorResponse } from '../Types';
import { updateUser } from '../api';
import { SuccessToasts, ErrorToasts } from '../toast/PrivateToast';
import { useUserDataInput } from '../../hooks/util';
import UserDataForm from './UserDataForm';

const EditUser: React.FC<RouteCurrentUserPropsType> = (_props) => {
  /* eslint-disable */
  const { history, currentUser, setCurrentUser } = { ..._props };
  /* eslint-disable */
  const { values, handleChange } = useUserDataInput();

  const userData = {
    id: currentUser ? currentUser.id : 0,
    ...values,
  };

  const submitUpdateUser = async () => {
    try {
      const response = await updateUser(userData);

      if (response.status === 201) {
        SuccessToasts(response.data.messages);

        setCurrentUser(response.data.user);
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
      <h1>ユーザー情報編集</h1>
      <UserDataForm
        values={values}
        handleChange={handleChange}
        onClick={submitUpdateUser}
        submitLabel="編集完了"
      />
    </>
  );
};

export default EditUser;

/* eslint-disable */
/* eslint-disable */
