import React from 'react';
import { ErrorResponse, HistoryPropsType } from '../Types';
import { createUser } from '../api';
import { SuccessToasts, ErrorToasts } from '../toast/PrivateToast';
import { LinkButton } from '../privateMUI/PrivateBottuns';
import { useUserDataInput } from '../../hooks/util';
import UserDataForm from './UserDataForm';

const NewUsers: React.FC<HistoryPropsType> = (_props) => {
  /* eslint-disable */
  const props = _props;
  /* eslint-disable */
  const initInput = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const { values, handleChange } = useUserDataInput(initInput);

  const saveUser = async () => {
    try {
      const response = await createUser(values);

      if (response.status === 200) {
        SuccessToasts(response.data.messages);
        props.history.push('/current_user');
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
    <>
      <UserDataForm
        values={values}
        handleChange={handleChange}
        onClick={saveUser}
        submitLabel="ユーザー登録"
        PassWordAllowNull={false}
      />
      <LinkButton
        linkTo="/login"
        label="登録済みならこちらからログイン"
        disabled={false}
      />
    </>
  );
};

export default NewUsers;

/* eslint-disable */
/* eslint-disable */
