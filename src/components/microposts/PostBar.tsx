import { FC } from 'react';
import { Grid, IconButton } from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { HistoryPropsType } from '../Types';

import { NormalText } from '../privateMUI/PrivateTexts';
import PostNew from './PostNew';
import IconText from '../privateMUI/IconText';
import { useAppContext } from '../../hooks/ReduserContext';

import { BaseCard, PrivateAppbar, PrivateBox } from '../privateMUI/BaseCard';

const PostBar: FC<HistoryPropsType> = ({ history }) => {
  const { state } = useAppContext();

  return (
    <BaseCard width={250}>
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
          linkTo={`/users/${
            state.currentUser?.id ? state.currentUser?.id : ''
          }`}
          key={state.currentUser?.id ? state.currentUser?.id : 0}
          name={state.currentUser?.name ? state.currentUser?.name : ''}
          date={
            new Date(
              state.currentUser?.createdAt
                ? state.currentUser?.createdAt
                : new Date(),
            )
          }
          distanceToNow
        >
          <NormalText>{state.currentUser?.email}</NormalText>
          <NormalText>
            管理者権限: {state.currentUser?.admin ? 'あり' : 'なし'}
          </NormalText>
          <NormalText>投稿数:{state.currentUser?.countMicroposts}件</NormalText>
        </IconText>

        <PostNew history={history} />
      </PrivateBox>
    </BaseCard>
  );
};

export default PostBar;
