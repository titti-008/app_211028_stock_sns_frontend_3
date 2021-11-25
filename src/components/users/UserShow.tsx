import { FC, useState, useCallback, useEffect } from 'react';
import {
  Grid,
  Button,
  // CircularProgress,
} from '@mui/material';
import { RouteComponentProps, Link } from 'react-router-dom';
import { UserType } from '../Types';
import { getUser, queryGetMicroposts } from '../api';
import IconText from '../privateMUI/IconText';
import { NormalText } from '../privateMUI/PrivateTexts';

import { useLoginContext } from '../../hooks/ReduserContext';
import { ErrorToasts } from '../toast/PrivateToast';
import Feed from '../microposts/Feed';

const UserShow: FC<RouteComponentProps<{ id: string }>> = (props) => {
  const { state } = useLoginContext();
  const { currentUser } = state;

  const [user, setUser] = useState<UserType>({
    createdAt: new Date(),
    email: 'loading...',
    name: 'loading...',
    id: 0,
    admin: false,
    countMicroposts: 0,
    countFollowing: 0,
    countFollowers: 0,
  });

  const isCurrentUser = currentUser?.id === user.id;

  const load = useCallback(
    () => getUser(Number(props.match.params.id)),
    [props],
  );

  useEffect(() => {
    const componetDitMount = async () => {
      try {
        const response = await load();
        if (response.status === 200) {
          setUser(response.data.user);
          console.log(response.data.messages);
        } else {
          ErrorToasts(response.data.messages);
        }
      } catch (err) {
        console.log('データの取得に失敗');
        console.log(err);
      }
    };

    void componetDitMount();
  }, [load]);

  return (
    <>
      <IconText
        linkTo={`/users/${user.id}`}
        key={user.id}
        name={user.name}
        date={new Date(user.createdAt)}
      >
        <NormalText>{user.email}</NormalText>
        <NormalText>管理者権限: {user.admin ? 'あり' : 'なし'}</NormalText>
        <NormalText>投稿数:{user.countMicroposts}件</NormalText>
        <NormalText>
          <small>
            フォロー:{user.countFollowing} フォロワー:{user.countFollowers}
          </small>
        </NormalText>

        {isCurrentUser && (
          <Grid item marginTop="10px">
            <Button variant="outlined">
              <Link to="/edit_user">
                <NormalText>ユーザー情報編集</NormalText>
              </Link>
            </Button>
          </Grid>
        )}
      </IconText>
      <Feed userId={user.id} getQuery={queryGetMicroposts} />
    </>
  );
};

export default UserShow;

/* eslint-disable */

/* eslint-disable */
