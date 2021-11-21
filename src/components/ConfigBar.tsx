import { FC } from 'react';
import { Grid, IconButton } from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import { NormalText } from './privateMUI/PrivateTexts';
import { LinkContainer, ButtonContainer } from './ConfigContainers';

import { BaseCard, PrivateAppbar, PrivateBox } from './privateMUI/BaseCard';

type PropsType = {
  handleLogout: () => void;
  handleDrawerClose: () => void;
};

const ConfigBar: FC<PropsType> = (_props) => {
  const props = _props;

  return (
    <BaseCard>
      <PrivateAppbar>
        <Grid item>
          <IconButton color="default" onClick={props.handleDrawerClose}>
            <DehazeIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <NormalText>設定</NormalText>
        </Grid>
      </PrivateAppbar>
      <PrivateBox>
        <ButtonContainer
          handleAction={props.handleLogout}
          linkText="ログアウト"
        >
          <LogoutIcon />
        </ButtonContainer>
        <LinkContainer linkTo="/users" linkText="ユーザー一覧">
          <GroupIcon />
        </LinkContainer>
        <LinkContainer linkTo="/current_user" linkText="プロフィール">
          <AccountCircleIcon />
        </LinkContainer>
      </PrivateBox>
    </BaseCard>
  );
};

export default ConfigBar;
