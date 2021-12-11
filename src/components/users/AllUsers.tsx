import { FC } from 'react';
import { useGetUsers } from '../api';
import { ErrorToasts } from '../toast/PrivateToast';
import { NormalText } from '../privateMUI/PrivateTexts';
import Users from './UsersList';
import PrivateLoading from '../privateMUI/PrivateLoading';

const AllUsers: FC = () => {
  const { data, isLoading, isError, error } = useGetUsers();

  if (isLoading) {
    return <PrivateLoading />;
  }

  if (isError && error) {
    ErrorToasts([error.message]);
  }

  if (!data) {
    return <div>データがありません</div>;
  }

  return (
    <>
      <NormalText>全ユーザー一覧</NormalText>
      <Users users={data.data.users} />
    </>
  );
};

export default AllUsers;
