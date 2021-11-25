import { FC } from 'react';
// import { CircularProgress } from '@mui/material';
// import { useQuery } from 'react-query';
// import { Micropost } from '../Types';
// import { queryGetMicroposts } from '../api';
// import { ErrorToasts } from '../toast/PrivateToast';
import Feed from './Feed';
// import { Micropost } from '../Types';
import { queryGetMicroposts } from '../api';

import { useLoginContext } from '../../hooks/ReduserContext';

const Microposts: FC = () => {
  const { state } = useLoginContext();
  const { currentUser } = state;

  const userId = currentUser ? currentUser?.id : 0;

  return (
    <>
      <Feed userId={userId} getQuery={queryGetMicroposts} />
    </>
  );
};
// getFeed={loadMicroPosts}

export default Microposts;

/* eslint-disable */
/* eslint-disable */

/* eslint-disable */

/* eslint-disable */
