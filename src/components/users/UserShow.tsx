import { FC } from 'react';
import { useQuery } from 'react-query';
import { RouteComponentProps } from 'react-router-dom';

import { AxiosError } from 'axios';
// import { format, formatDistanceToNow } from 'date-fns';
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
import PrivateLoading from '../privateMUI/PrivateLoading';

const UserShow: FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const { state } = useAppContext();
  const { currentUser } = state;

  const userId = match.params.id;

  const { data, isLoading, isError, error } = useQuery<
    ShowUserResponse,
    AxiosError
  >('UserShow', () => getUser(Number(userId)));

  if (isLoading) {
    return <PrivateLoading />;
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
        linkTo={`/users/${userId}`}
        key={user.id}
        name={user.name}
        date={new Date(user.createdAt)}
        distanceToNow
      >
        <NormalText>{user.admin ? '管理者権限あり' : ''}</NormalText>
        <NormalText>投稿数:{user.countMicroposts}件</NormalText>
        <NormalText>
          <small>
            <TextButton linkTo={`/users/${userId}/following`} size="small">
              フォロー:{user.countFollowing}人
            </TextButton>

            <TextButton linkTo={`/users/${userId}/followers`} size="small">
              フォロワー:{user.countFollowers}人
            </TextButton>
          </small>
        </NormalText>

        {isCurrentUser && (
          <LinkButton
            linkTo="/edit_user"
            label="ユーザー情報編集"
            disabled={false}
          />
        )}

        {!isCurrentUser && (
          <SubmitButton
            onClick={user.isFollowing ? handleClearFollow : handleFollow}
            label={user.isFollowing ? 'フォロー解除' : 'フォローする'}
            disabled={false}
            isLoading={false}
          />
        )}
      </IconText>
      <Feed type={Number(userId)} getMicropost={getMyFeed} />
    </>
  );
};

export default UserShow;

/* eslint-disable */

/* eslint-disable */
