import { FC, useState, useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { UsersType } from '../Types';
import { getFollowing } from '../api';
import { SuccessToasts, ErrorToasts } from '../toast/PrivateToast';
import { NormalText } from '../privateMUI/PrivateTexts';
import UsersList from './UsersList';

const Following: FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const [users, setUsers] = useState<UsersType>([] as UsersType);

  const load = useCallback(() => getFollowing(match.params.id), [match]);

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
        console.log('ユーザー一覧の取得に失敗');
        ErrorToasts(['ユーザー一覧の取得に失敗']);
        console.log(err);
      }
    };

    void AxiosGetUsers();
  }, [load, setUsers]);

  return (
    <>
      <NormalText>フォローしているユーザー一覧</NormalText>
      <UsersList users={users} />
    </>
  );
};

export default Following;
