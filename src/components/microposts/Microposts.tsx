import { FC, useState, useEffect, useCallback } from 'react';
import { Micropost } from '../Types';
import { getMicroposts } from '../api';
import { SuccessToasts, ErrorToasts } from '../toast/PrivateToast';
import Feed from './Feed';

/* eslint-disable */
const Microposts: FC = () => {
  const [microposts, setMicroposts] = useState<Micropost[]>([]);

  const load = useCallback(() => getMicroposts(), []);

  useEffect(() => {
    const loadMicroPosts = async () => {
      try {
        const response = await load();
        console.log('Micropost一覧のレスポンス', response);
        if (response.status === 200) {
          SuccessToasts(response.data.messages);
          setMicroposts(response.data.microposts);
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

    void loadMicroPosts();
  }, [load, setMicroposts]);

  return (
    <>
      <Feed microposts={microposts} />
    </>
  );
};

export default Microposts;

/* eslint-disable */
/* eslint-disable */
