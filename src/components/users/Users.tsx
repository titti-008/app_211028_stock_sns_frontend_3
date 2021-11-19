import { FC, useState, useEffect, useCallback } from 'react';
import { Grid } from '@mui/material';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { UsersType, UserType, CurrentUser, ErrorResponse } from '../Types';
import { useColors } from '../../hooks/util';
import { getUsers, deleteUser } from '../api';
import { SubmitButton } from '../privateMUI/PrivateBottuns';
import { SuccessToasts, ErrorToasts } from '../toast/PrivateToast';
import { NormalText } from '../privateMUI/PrivateTexts';
import IconText from '../privateMUI/IconText';

type PropsType = {
  currentUser: CurrentUser;
};

const Users: FC<PropsType> = ({ currentUser }: PropsType) => {
  /* eslint-disable */
  const [users, setUsers] = useState<UsersType>([]);
  /* eslint-disable */
  const colors = useColors();

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
    <Grid
      container
      justifyContent="flex-start"
      alignItems="start"
      height="100%"
    >
      {users.length !== 0 ? (
        users.map((user: UserType) => (
          <IconText linkTo={`/users/${user.id}`} key={user.id} name={user.name}>
            <NormalText>{user.email}</NormalText>
            <NormalText>
              {formatDistanceToNow(new Date(user.createdAt))}
            </NormalText>
            <NormalText>管理者権限: {user.admin ? 'あり' : 'なし'}</NormalText>
            {currentUser?.admin ? (
              <SubmitButton
                label="削除"
                onClick={() => {
                  void handleDeleteUser(user.id);
                }}
              />
            ) : (
              <></>
            )}
          </IconText>
        ))
      ) : (
        <NormalText>...loading</NormalText>
      )}
    </Grid>
  );
};

export default Users;
/* eslint-disable */
