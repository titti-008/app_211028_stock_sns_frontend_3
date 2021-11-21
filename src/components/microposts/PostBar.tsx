import { FC } from 'react';
import { Grid, IconButton } from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { NormalText } from '../privateMUI/PrivateTexts';
import { historyPropsType, CurrentUser } from '../Types';
import PostNew from './PostNew';
import IconText from '../privateMUI/IconText';

import { BaseCard, PrivateAppbar, PrivateBox } from '../privateMUI/BaseCard';

type PropsType = historyPropsType & {
  currentUser: CurrentUser;
};

/* eslint-disable */
const PostBar: FC<PropsType> = ({ history, currentUser }) => (
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
        linkTo={`/users/${currentUser?.id}`}
        key={currentUser ? currentUser?.id : 0}
        name={currentUser ? currentUser?.name : ''}
        date={new Date(currentUser ? currentUser?.createdAt : Date.now())}
      >
        <NormalText>{currentUser?.email}</NormalText>
        <NormalText>
          管理者権限: {currentUser?.admin ? 'あり' : 'なし'}
        </NormalText>
        <NormalText>投稿数:{currentUser?.countMicroposts}件</NormalText>
      </IconText>

      <PostNew history={history} />
    </PrivateBox>
  </BaseCard>
);

export default PostBar;

// const props = _props;
/* eslint-disable */
