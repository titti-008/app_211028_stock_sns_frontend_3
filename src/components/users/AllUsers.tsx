import { FC, useState, useEffect, useCallback } from 'react';
import { UsersType } from '../Types';
import { getUsers } from '../api';
import { SuccessToasts, ErrorToasts } from '../toast/PrivateToast';
import { NormalText } from '../privateMUI/PrivateTexts';
import Users from './UsersList';

const AllUsers: FC = () => {
  const [users, setUsers] = useState<UsersType>([] as UsersType);

  const load = useCallback(() => getUsers(), []);

  useEffect(() => {
    const AxiosGetUsers = async () => {
      try {
        const response = await load();
        console.log('ユーザー一覧のレスポンス', response);
        if (response.status === 200) {
          SuccessToasts(response.data.messages);
          setUsers(response.data.users);
        } else {
          console.log('status200以外のレスポンス発生');
          ErrorToasts(response.data.messages);
        }
      } catch (err) {
        console.log('データの取得に失敗');
        ErrorToasts(['データの取得に失敗']);
        console.log(err);
      }
    };

    void AxiosGetUsers();
  }, [load, setUsers]);

  return (
    <>
      <NormalText>全ユーザー一覧</NormalText>
      <Users users={users} />
    </>
  );
};

export default AllUsers;
/* eslint-disable */

/* eslint-disable */
