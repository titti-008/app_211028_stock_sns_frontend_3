import { FC, useState, useCallback } from 'react';
import { RouteComponentProps } from 'react-router';
import { UserType, Micropost } from '../Types';
import { getUser } from '../api';
import IconText from '../privateMUI/IconText';
import { NormalText } from '../privateMUI/PrivateTexts';

import { ErrorToasts } from '../toast/PrivateToast';
import Feed from '../microposts/Feed';

const UserShow: FC<RouteComponentProps<{ id: string }>> = (props) => {
  const [user, setUser] = useState<UserType>({
    createdAt: new Date(),
    email: 'loading...',
    name: 'loading...',
    id: 0,
    admin: false,
    countMicroposts: 0,
  });
  const [microposts, setMicroposts] = useState<Micropost[]>([]);

  const currentLimit = microposts.length;

  const load = useCallback(
    () => getUser(Number(props.match.params.id), currentLimit),
    [props, currentLimit],
  );

  /* eslint-disable */

  const componetDitMount = async () => {
    try {
      const response = await load();
      if (response.status === 200) {
        setUser(response.data.user);
        setMicroposts([...microposts, ...response.data.microposts]);
        console.log(response.data.messages);
      } else {
        ErrorToasts(response.data.messages);
      }
    } catch (err) {
      console.log('データの取得に失敗');
      console.log(err);
    }
  };

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
      </IconText>
      <Feed microposts={microposts} getFeed={componetDitMount} />
    </>
  );
};

export default UserShow;

/* eslint-disable */
