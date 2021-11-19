import { FC, useState, useEffect, useCallback } from 'react';
import { Grid } from '@mui/material';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Micropost } from '../Types';
import { getMicroposts } from '../api';
import { SuccessToasts, ErrorToasts } from '../toast/PrivateToast';
import { NormalText } from '../privateMUI/PrivateTexts';
import IconText from '../privateMUI/IconText';
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
    <Grid
      container
      justifyContent="flex-start"
      alignItems="start"
      height="100%"
    >
      {microposts.length !== 0 ? (
        microposts.map((micropost: Micropost) => (
          <IconText
            linkTo={`/users/${micropost.user.id}`}
            key={micropost.user.id}
            name={micropost.user.name}
          >
            <NormalText>{micropost.content}</NormalText>
            <NormalText>
              {formatDistanceToNow(new Date(micropost.createdAt))}
            </NormalText>
          </IconText>
        ))
      ) : (
        <NormalText>...loading</NormalText>
      )}
    </Grid>
  );
};

export default Microposts;

/* eslint-disable */
/* eslint-disable */
