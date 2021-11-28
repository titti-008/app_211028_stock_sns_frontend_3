import { FC } from 'react';
import { Grid, IconButton } from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import { NormalText } from './privateMUI/PrivateTexts';
import { LinkContainer, ButtonContainer } from './ConfigContainers';
import { logoutUser } from './api';
import { BaseCard, PrivateAppbar, PrivateBox } from './privateMUI/BaseCard';
import { useAppContext } from '../hooks/ReduserContext';
import { SuccessToasts, ErrorToasts } from './toast/PrivateToast';

type PropsType = {
  handleDrawerClose: () => void;
};

const ConfigBar: FC<PropsType> = (_props) => {
  const props = _props;
  const { state, dispatch } = useAppContext();

  // ----------ログアウトボタンの処理----------------------
  const handleLogout = async () => {
    try {
      const response = await logoutUser();

      if (response.status === 200) {
        dispatch({
          type: 'saveUser',
          setUser: null,
          isLogin: response.data.loggedIn,
        });
        SuccessToasts(response.data.messages);
      }
    } catch (err) {
      ErrorToasts(['ログアウトに失敗しました。']);

      console.log(err);
    }
  };

  return (
    <BaseCard>
      <PrivateAppbar>
        <Grid item>
          <IconButton color="default" onClick={props.handleDrawerClose}>
            <DehazeIcon />
          </IconButton>
        </Grid>
        <Grid item width="300px">
          <NormalText>設定</NormalText>
        </Grid>
      </PrivateAppbar>
      <PrivateBox>
        <ButtonContainer handleAction={handleLogout} linkText="ログアウト">
          <LogoutIcon />
        </ButtonContainer>
        <LinkContainer linkTo="/users" linkText="ユーザー一覧">
          <GroupIcon />
        </LinkContainer>

        <LinkContainer
          linkTo={`/users/${state.currentUser ? state.currentUser.id : ''}`}
          linkText="プロフィール"
        >
          <AccountCircleIcon />
        </LinkContainer>
      </PrivateBox>
    </BaseCard>
  );
};

export default ConfigBar;
