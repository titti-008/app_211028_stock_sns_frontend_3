import { FC, useState, useCallback } from 'react';
import { Micropost } from '../Types';
import { getMicroposts } from '../api';
import { ErrorToasts } from '../toast/PrivateToast';
import Feed from './Feed';

/* eslint-disable */
const Microposts: FC = () => {
  const [microposts, setMicroposts] = useState<Micropost[]>([]);
  const currentLimit = microposts.length;

  const load = useCallback(() => getMicroposts(currentLimit), [currentLimit]);
  console.log('currentLimit', currentLimit);
  const loadMicroPosts = async () => {
    try {
      const response = await load();
      console.log('Micropost一覧のレスポンス', response);
      if (response.status === 200) {
        console.log(response.data);
        setMicroposts([...microposts, ...response.data.microposts]);
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
  // useEffect(() => {
  //   void loadMicroPosts();
  // }, [load, setMicroposts]);

  return (
    <>
      <Feed microposts={microposts} getFeed={loadMicroPosts} />
    </>
  );
};

export default Microposts;

/* eslint-disable */
/* eslint-disable */
