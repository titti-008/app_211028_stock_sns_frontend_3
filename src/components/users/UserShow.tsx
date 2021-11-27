import { FC } from 'react';
import { useQuery } from 'react-query';
import { RouteComponentProps } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { AxiosError } from 'axios';
import { ShowUserResponse } from '../Types';
import {
  getUser,
  getMyFeed,
  createUserRelationship,
  deleteUserRelationship,
} from '../api';
import IconText from '../privateMUI/IconText';
import {
  LinkButton,
  TextButton,
  SubmitButton,
} from '../privateMUI/PrivateBottuns';
import { NormalText } from '../privateMUI/PrivateTexts';
import { useAppContext } from '../../hooks/ReduserContext';
import { ErrorToasts } from '../toast/PrivateToast';
import Feed from '../microposts/Feed';

const UserShow: FC<RouteComponentProps<{ id: string }>> = (props) => {
  const { state } = useAppContext();
  const { currentUser } = state;

  const { data, isLoading, isError, error } = useQuery<
    ShowUserResponse,
    AxiosError
  >('UserShow', () => getUser(Number(props.match.params.id)));

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError && error) {
    ErrorToasts([error.message]);
  }

  if (!data) {
    return <div>ユーザーがいません</div>;
  }

  const { user, messages } = data;

  console.log(...messages);

  const isCurrentUser = currentUser?.id === data?.user.id;

  const handleFollow = async () => {
    try {
      const response = await createUserRelationship(user.id);
      if (response.status === 200) {
        console.log(response.data.messages);
      } else {
        ErrorToasts(response.data.messages);
      }
    } catch (err) {
      console.log('失敗');
      console.log(err);
    }
  };

  const handleClearFollow = async () => {
    try {
      const response = await deleteUserRelationship(user.id);
      if (response.status === 200) {
        console.log(response.data.messages);
      } else {
        ErrorToasts(response.data.messages);
      }
    } catch (err) {
      console.log('失敗');
      console.log(err);
    }
  };

  return (
    <>
      <IconText
        linkTo={`/users/${data.user.id}`}
        key={user.id}
        name={user.name}
        date={new Date(user.createdAt)}
      >
        <NormalText>{user.email}</NormalText>
        <NormalText>管理者権限: {user.admin ? 'あり' : 'なし'}</NormalText>
        <NormalText>投稿数:{user.countMicroposts}件</NormalText>
        <NormalText>
          <small>
            <TextButton linkTo={`/users/${user.id}/following`} size="small">
              フォロー:{user.countFollowing}
            </TextButton>

            <TextButton linkTo={`/users/${user.id}/followers`} size="small">
              フォロワー:{user.countFollowers}
            </TextButton>
          </small>
        </NormalText>

        {isCurrentUser && (
          <LinkButton linkTo="/edit_user" label="ユーザー情報編集" />
        )}

        {!isCurrentUser && user.isFollowing && (
          <SubmitButton
            onClick={handleClearFollow}
            label="フォロー解除"
            disabled={false}
          />
        )}
        {!isCurrentUser && !user.isFollowing && (
          <SubmitButton
            onClick={handleFollow}
            label="フォロー"
            disabled={false}
          />
        )}
      </IconText>
      <Feed type={user.id} getMicropost={getMyFeed} />
    </>
  );
};

export default UserShow;

/* eslint-disable */

/* eslint-disable */
