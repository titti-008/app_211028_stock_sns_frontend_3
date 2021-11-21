import { FC, useState, useEffect, useCallback } from 'react';
import { RouteComponentProps } from 'react-router';
import { UserType, Micropost } from '../Types';
import { getUser } from '../api';
import IconText from '../privateMUI/IconText';
import { NormalText } from '../privateMUI/PrivateTexts';

import { SuccessToasts, ErrorToasts } from '../toast/PrivateToast';
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
          setMicroposts(response.data.microposts);
          SuccessToasts(response.data.messages);
        } else {
          ErrorToasts(response.data.messages);
        }
      } catch (err) {
        console.log('データの取得に失敗');
        console.log(err);
      }
    };
    void componetDitMount();
  }, [setUser, load]);

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
      <Feed microposts={microposts} />
    </>
  );
};

export default UserShow;

/* eslint-disable */
/* eslint-disable */
