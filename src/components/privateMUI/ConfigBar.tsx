import { FC } from 'react';
import { Grid, IconButton } from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import { NormalText } from './PrivateTexts';
import { LinkContainer, DarkButtonContainer } from './ConfigContainers';
import { BaseCard, PrivateAppbar, PrivateBox } from './BaseCard';
import { useAppContext } from '../../hooks/ReduserContext';
import SearchSymbol from '../earnings/SearchSymbol';
import MyFollowingStocks from '../stock/MyFollowingStocks';
import LogoutButton from '../authenticate/LogoutButton';

const ConfigBar: FC = () => {
  const { state, dispatch } = useAppContext();

  return (
    <BaseCard width={300}>
      <PrivateAppbar>
        <Grid item>
          <IconButton
            color="default"
            onClick={() => dispatch({ type: 'closeDrawer' })}
          >
            <DehazeIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <NormalText>設定</NormalText>
        </Grid>
      </PrivateAppbar>

      <PrivateBox>
        <DarkButtonContainer />

        <LinkContainer linkTo="/users" linkText="ユーザー一覧">
          <GroupIcon />
        </LinkContainer>

        <LinkContainer
          linkTo={`/users/${state.currentUser ? state.currentUser.id : ''}`}
          linkText="プロフィール"
        >
          <AccountCircleIcon />
        </LinkContainer>

        <LogoutButton />

        <SearchSymbol />

        <MyFollowingStocks />
      </PrivateBox>
    </BaseCard>
  );
};

export default ConfigBar;
/* eslint-disable */
