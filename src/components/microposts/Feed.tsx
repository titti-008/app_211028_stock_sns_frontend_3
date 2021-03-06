import React, { FC } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, Grid, IconButton, CircularProgress } from '@mui/material';
import { AxiosResponse } from 'axios';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import {
  // LoginResponse,
  Micropost,
  ErrorResponse,
  MicropostsResponse,
} from '../Types';
import { useAppContext } from '../../hooks/ReduserContext';
import useInteractionObserver from '../../hooks/useIntersectionObserver';
import { NormalText } from '../privateMUI/PrivateTexts';
import IconText from '../privateMUI/IconText';
import { SuccessToasts, ErrorToasts } from '../toast/PrivateToast';
import PrivateImageList from './PrivateImageList';
import { deleteMicropost } from '../api';
import PrivateLoading from '../privateMUI/PrivateLoading';

type PropsType<T> = {
  type: T;
  getMicropost: (
    type: T,
    pageParam?: number | undefined,
  ) => Promise<AxiosResponse<MicropostsResponse, unknown>>;
};

const Feed: FC<PropsType<'myfeed' | number>> = ({ type, getMicropost }) => {
  const queryClient = useQueryClient();

  const { state } = useAppContext();

  const queryKey = `microposts-${type}`;

  const mutation = useMutation(queryKey, deleteMicropost, {
    onSuccess: (res) => {
      void queryClient.invalidateQueries(queryKey);

      // const prevData = queryClient.getQueryData<MicropostsResponse>(queryKey);

      // if (prevData) {
      //   const afterData = prevData.microposts.filter(
      //     (micropost) => micropost.id !== id,
      //   );

      //   queryClient.setQueryData(queryKey, {
      //     ...prevData,
      //     microposts: [...afterData],
      //   });
      // }

      SuccessToasts(res.data.messages);
      void queryClient.invalidateQueries(queryKey);
    },
  });

  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<MicropostsResponse, ErrorResponse, MicropostsResponse>(
    queryKey,
    async ({ pageParam = 1 }: { pageParam?: number }) => {
      const res = await getMicropost(type, pageParam);

      return res.data;
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.nextId ? lastPage.nextId : undefined,
      retry: false,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  );

  const loadMoreButtonRef = React.useRef<HTMLButtonElement>(null!);

  // useInteractionObserver({
  //   target: loadMoreButtonRef,
  //   onIntersect: fetchNextPage,
  //   enabled: hasNextPage,
  // });

  useInteractionObserver(loadMoreButtonRef, {
    freezeOnceVisible: hasNextPage,
  });

  if (status === 'loading') {
    return <PrivateLoading />;
  }

  if (status === 'error' && error) {
    ErrorToasts([error.message]);
  }

  return (
    <>
      {data?.pages.map((page) => (
        <React.Fragment key={page.nextId}>
          {page.microposts.map((micropost: Micropost) => (
            <IconText
              linkTo={`/users/${micropost.user.id}`}
              key={micropost.id}
              name={micropost.user.name}
              date={new Date(micropost.createdAt)}
              distanceToNow
            >
              <NormalText>{micropost.content}</NormalText>
              {micropost.images && <PrivateImageList src={micropost.images} />}

              {state.currentUser?.id === micropost.user.id && (
                <IconButton
                  onClick={() => {
                    const sure =
                      window.confirm('??????????????????????????????????????????????');
                    if (sure) {
                      void mutation.mutate(micropost.id);
                    }
                  }}
                >
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
          {(isFetchingNextPage && <CircularProgress />) ||
            (hasNextPage && <KeyboardArrowDownIcon />)}
        </Button>
      </Grid>
    </>
  );
};

export default Feed;
