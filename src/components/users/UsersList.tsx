import { FC } from 'react';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { UsersUser, UsersType, ErrorResponse } from '../Types';
import { SuccessToasts, ErrorToasts } from '../toast/PrivateToast';
import { deleteUser } from '../api';

import { SubmitButton } from '../privateMUI/PrivateBottuns';

import IconText from '../privateMUI/IconText';
import { useAppContext } from '../../hooks/ReduserContext';
import PrivateLoading from '../privateMUI/PrivateLoading';

type PropsType = {
  users: UsersType;
};
const Users: FC<PropsType> = ({ users }) => {
  const { state } = useAppContext();
  const { currentUser } = state;

  const handleDeleteUser = async (id: number) => {
    try {
      const response = await deleteUser(id);
      if (response.status === 200) {
        SuccessToasts(response.data.messages);
        // setUsers(response.data.users);
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
      {users?.length !== 0 ? (
        users?.map((user: UsersUser) => (
          <IconText
            linkTo={`/users/${user.id}`}
            key={user.id}
            name={user.name}
            distanceToNow
          >
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
        <PrivateLoading />
      )}
    </>
  );
};

export default Users;
/* eslint-disable */

/* eslint-disable */
