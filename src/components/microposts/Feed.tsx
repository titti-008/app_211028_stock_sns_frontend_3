import { FC } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { CircularProgress, Button, Grid, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InfiniteScroll from 'react-infinite-scroller';
import { Micropost } from '../Types';
import { NormalText } from '../privateMUI/PrivateTexts';
import IconText from '../privateMUI/IconText';
import { SuccessToasts, ErrorToasts } from '../toast/PrivateToast';
import { deleteMicropost } from '../api';
import PrivateImageList from './PrivateImageList';
import { useCurentUserContext } from '../../hooks/CurentUserContext';

type PropsType = {
  microposts: Micropost[];
  getFeed: () => void;
};

const Feed: FC<PropsType> = (_props) => {
  const props = _props;

  const { currentUser } = useCurentUserContext();

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
  /* eslint-disable */
  return (
    <>
      <InfiniteScroll loadMore={() => props.getFeed()} hasMore>
        {props.microposts.length !== 0 ? (
          props.microposts.map((micropost: Micropost) => (
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
          <CircularProgress />
        )}
      </InfiniteScroll>
      <Grid item width="100%" paddingTop={1}>
        <Button sx={{ width: '100%', height: 50 }}>
          <KeyboardArrowDownIcon onClick={props.getFeed} />
        </Button>
      </Grid>
    </>
  );
};

export default Feed;

/* eslint-disable */

/* eslint-disable */
