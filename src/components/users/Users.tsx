import { FC, useState, useEffect, useCallback } from 'react';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { CircularProgress } from '@mui/material';
import { UsersUser, UsersType, ErrorResponse } from '../Types';
import { getUsers, deleteUser } from '../api';
import { SubmitButton } from '../privateMUI/PrivateBottuns';
import { SuccessToasts, ErrorToasts } from '../toast/PrivateToast';
import IconText from '../privateMUI/IconText';
import { useLoginContext } from '../../hooks/ReduserContext';

/* eslint-disable */
const Users: FC = () => {
  const [users, setUsers] = useState<UsersType>([] as UsersType);
  const { state } = useLoginContext();
  const { currentUser } = state;

  const load = useCallback(() => getUsers(), []);

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
        console.log('データの取得に失敗');
        ErrorToasts(['データの取得に失敗']);
        console.log(err);
      }
    };

    void AxiosGetUsers();
  }, [load, setUsers]);

  const handleDeleteUser = async (id: number) => {
    try {
      const response = await deleteUser(id);
      if (response.status === 200) {
        SuccessToasts(response.data.messages);
        setUsers(response.data.users);
      } else if (response.status === 202) {
        ErrorToasts(response.data.messages);
      }
    } catch (err) {
      if ((err as ErrorResponse).response !== undefined)
        console.log((err as ErrorResponse).response);
      ErrorToasts([
        'ログイン状態の確認に失敗しました。',
        'データサーバーとの接続に問題がある可能性があります。',
      ]);
    }
  };

  return (
    <>
      {users.length !== 0 ? (
        users.map((user: UsersUser) => (
          <IconText linkTo={`/users/${user.id}`} key={user.id} name={user.name}>
            {user.admin && <SupervisorAccountIcon />}
            {currentUser?.admin ? (
              <SubmitButton
                label="削除"
                onClick={() => {
                  void handleDeleteUser(user.id);
                }}
                disabled={false}
              />
            ) : (
              <></>
            )}
          </IconText>
        ))
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Users;
/* eslint-disable */
