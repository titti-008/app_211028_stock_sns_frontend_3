import React, { FC } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { CircularProgress, Button, Grid, IconButton } from '@mui/material';
import { AxiosResponse } from 'axios';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useInfiniteQuery } from 'react-query';
import useInteractionObserver from '../../hooks/useIntersectionObserver';
import { Micropost, ErrorResponse, MicropostsResponse } from '../Types';
import { NormalText } from '../privateMUI/PrivateTexts';
import IconText from '../privateMUI/IconText';
import { SuccessToasts, ErrorToasts } from '../toast/PrivateToast';
import PrivateImageList from './PrivateImageList';
import { useAppContext } from '../../hooks/ReduserContext';
import { deleteMicropost } from '../api';

type PropsType<T> = {
  type: T;
  getMicropost: (
    type: T,
    pageParam?: number | undefined,
  ) => Promise<AxiosResponse<MicropostsResponse, unknown>>;
};

/* eslint-disable */

const Feed: FC<PropsType<'myfeed' | number>> = ({ type, getMicropost }) => {
  const { state } = useAppContext();
  const { currentUser } = state;

  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<MicropostsResponse, ErrorResponse, MicropostsResponse>(
    'microposts',
    async ({ pageParam = 1 }: { pageParam?: number }) => {
      const res = await getMicropost(type, pageParam);

      return res.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
    },
  );

  const loadMoreButtonRef = React.useRef<HTMLButtonElement>(null);

  useInteractionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'error' && error) {
    ErrorToasts([error.message]);
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
      {data?.pages.map((page) => (
        <React.Fragment key={page.nextId}>
          {page.microposts.map((micropost: Micropost) => (
            <IconText
              linkTo={`/users/${micropost.user.id}`}
              key={micropost.user.id}
              name={micropost.user.name}
              date={new Date(micropost.createdAt)}
            >
              <NormalText>{micropost.content}</NormalText>
              {micropost.images && <PrivateImageList src={micropost.images} />}

              {currentUser?.id === micropost.user.id && (
                <IconButton onClick={() => handleDelete(micropost.id)}>
                  <DeleteForeverIcon />
                </IconButton>
              )}
            </IconText>
          ))}
        </React.Fragment>
      ))}

      <Grid item width="100%" paddingTop={1}>
        <Button
          ref={loadMoreButtonRef}
          sx={{ width: '100%', height: 50 }}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {
            /* eslint-disable */
            isFetchingNextPage ? (
              <CircularProgress />
            ) : hasNextPage ? (
              <KeyboardArrowDownIcon />
            ) : (
              <></>
            )
          }
        </Button>
      </Grid>
    </>
  );
};

export default Feed;

/* eslint-disable */
