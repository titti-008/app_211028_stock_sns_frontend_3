import { FC, useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { CircularProgress, Button, Grid, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import InfiniteScroll from 'react-infinite-scroller';
import { useQuery } from 'react-query';
import { Micropost, MicropostsResponse } from '../Types';
import { NormalText } from '../privateMUI/PrivateTexts';
import IconText from '../privateMUI/IconText';
import { SuccessToasts, ErrorToasts } from '../toast/PrivateToast';

import PrivateImageList from './PrivateImageList';
import { useLoginContext } from '../../hooks/ReduserContext';
// import { Micropost } from '../Types';
import { deleteMicropost } from '../api';

type PropsType = {
  userId: number;
  getQuery: (
    userId: number,
    MicropostsLimit: number,
  ) => Promise<MicropostsResponse>;
};

const Feed: FC<PropsType> = ({ userId, getQuery }) => {
  const { state } = useLoginContext();
  const { currentUser } = state;

  const [microposts, setMicroposts] = useState<Micropost[]>([]);

  const { data, isLoading, isError, refetch } = useQuery('getMicroposts', () =>
    getQuery(userId, microposts.length),
  );

  useEffect(() => {
    if (data?.microposts) {
      setMicroposts((prevMicropots) => [...prevMicropots, ...data.microposts]);
    }
  }, [data]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    ErrorToasts(data?.messages);

    return <div>エラー</div>;
  }

  const handleDelete = async (id: number) => {
    const sure = window.confirm('本当に削除してもよろしいですか?');
    if (sure) {
      try {
        const response = await deleteMicropost(id);
        console.log('Micropost一覧のレスポンス', response);
        if (response.status === 200) {
          SuccessToasts(response.data.messages);
        } else {
          console.log('status200以外のレスポンス発生');
          ErrorToasts(response.data.messages);
        }
      } catch (err) {
        console.log('データの取得に失敗');
        ErrorToasts(['データの取得に失敗']);
        console.log(err);
      }
    }
  };

  return (
    <>
      {/* <InfiniteScroll loadMore={() => props.getFeed()} hasMore> */}
      {microposts.length !== 0 ? (
        microposts.map((micropost: Micropost) => (
          <IconText
            linkTo={`/users/${micropost.user.id}`}
            key={micropost.user.id}
            name={micropost.user.name}
            date={new Date(micropost.createdAt)}
          >
            <NormalText>{micropost.content}</NormalText>
            {micropost.images && <PrivateImageList src={micropost.images} />}

            {currentUser?.id === micropost.user.id ? (
              <IconButton onClick={() => handleDelete(micropost.id)}>
                <DeleteForeverIcon />
              </IconButton>
            ) : (
              <></>
            )}
          </IconText>
        ))
      ) : (
        <NormalText>no data</NormalText>
      )}
      {/* </InfiniteScroll> */}
      <Grid item width="100%" paddingTop={1}>
        <Button sx={{ width: '100%', height: 50 }} onClick={() => refetch}>
          <KeyboardArrowDownIcon />
        </Button>
      </Grid>
    </>
  );
};

export default Feed;

/* eslint-disable */
/* eslint-disable */
/* eslint-disable */

/* eslint-disable */
