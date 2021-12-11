import { FC, useState, useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { UsersType } from '../Types';
import { getFollowers } from '../api';
import { SuccessToasts, ErrorToasts } from '../toast/PrivateToast';
import { NormalText } from '../privateMUI/PrivateTexts';
import UsersList from './UsersList';
/* eslint-disable */
const Followers: FC<RouteComponentProps<{ id: string }>> = (props) => {
  const [users, setUsers] = useState<UsersType>([] as UsersType);

  const load = useCallback(() => getFollowers(props.match.params.id), [props]);

  useEffect(() => {
    const AxiosGetUsers = async () => {
      try {
        const response = await load();
        console.log('ユーザー一覧のレスポンス', response);
        if (response.status === 200) {
          console.log('response.data.users', response.data.users);
          SuccessToasts(response.data.messages);
          setUsers(response.data.users);
        } else {
          console.log('status200以外のレスポンス発生');
          ErrorToasts(response.data.messages);
        }
      } catch (err) {
        console.log('フォロワーの取得に失敗');
        ErrorToasts(['フォロワーの取得に失敗']);
        console.log(err);
      }
    };

    void AxiosGetUsers();
  }, [load, setUsers]);

  return (
    <>
      <NormalText>フォロワー一覧</NormalText>
      <UsersList users={users} />
    </>
  );
};

export default Followers;
/* eslint-disable */

/* eslint-disable */
