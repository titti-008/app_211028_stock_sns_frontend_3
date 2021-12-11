import { FC } from 'react';
import { Grid, IconButton } from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { useQueryClient } from 'react-query';
import { HistoryPropsType, LoginResponse } from '../Types';

import { NormalText } from '../privateMUI/PrivateTexts';
import PostNew from './PostNew';
import IconText from '../privateMUI/IconText';

import { BaseCard, PrivateAppbar, PrivateBox } from '../privateMUI/BaseCard';

/* eslint-disable */
const PostBar: FC<HistoryPropsType> = ({ history }) => {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<LoginResponse>(`loginData`);

  return (
    <BaseCard>
      <PrivateAppbar>
        <Grid item>
          <IconButton color="default">
            <DehazeIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <NormalText>スタート</NormalText>
        </Grid>
      </PrivateAppbar>

      <PrivateBox>
        <IconText
          linkTo={`/users/${userData?.user?.id}`}
          key={userData?.user?.id ? userData?.user?.id : 0}
          name={userData?.user?.name ? userData?.user?.name : ''}
          date={
            new Date(
              userData?.user?.createdAt
                ? userData?.user?.createdAt
                : new Date(),
            )
          }
          distanceToNow
        >
          <NormalText>{userData?.user?.email}</NormalText>
          <NormalText>
            管理者権限: {userData?.user?.admin ? 'あり' : 'なし'}
          </NormalText>
          <NormalText>投稿数:{userData?.user?.countMicroposts}件</NormalText>
        </IconText>

        <PostNew history={history} />
      </PrivateBox>
    </BaseCard>
  );
};

export default PostBar;

// const props = _props;
/* eslint-disable */
