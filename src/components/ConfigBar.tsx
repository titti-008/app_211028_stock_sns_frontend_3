import { FC } from 'react';
import { Grid, Box, AppBar, IconButton } from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import { useColors } from '../hooks/util';
import { NormalText } from './privateMUI/PrivateTexts';
import { LinkContainer, ButtonContainer } from './ConfigContainers';

type PropsType = {
  appBerHeight: number;
  handleLogout: () => void;
  handleDrawerClose: () => void;
};

const ConfigBar: FC<PropsType> = (_props) => {
  const props = _props;
  const colors = useColors();

  return (
    <Grid item height="100%" sx={{ width: '350px' }}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: colors.baseSheet,
          padding: 0,
          margin: 0,
        }}
      >
        <AppBar
          position="static"
          sx={{
            height: `${props.appBerHeight}px`,
            backgroundColor: colors.header,
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="left"
            alignItems="center"
          >
            <Grid item>
              <IconButton color="default" onClick={props.handleDrawerClose}>
                <DehazeIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <NormalText>スタート</NormalText>
            </Grid>
          </Grid>
        </AppBar>

        <Box
          sx={{
            height: `calc(100% - ${props.appBerHeight}px)`,
            overflow: 'scroll',
          }}
        >
          <Grid item width="100%" height="100%">
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              height="100%"

              // wrap="nowrap"
            >
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
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default ConfigBar;
