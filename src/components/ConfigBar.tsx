import { FC } from 'react';
import { Grid, IconButton } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import DehazeIcon from '@mui/icons-material/Dehaze';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import { NormalText } from './privateMUI/PrivateTexts';
import { LinkContainer, ButtonContainer } from './ConfigContainers';
import { LoginResponse, ErrorResponse } from './Types';
import { logoutRequest } from './api';
import { BaseCard, PrivateAppbar, PrivateBox } from './privateMUI/BaseCard';
import { useAppContext } from '../hooks/ReduserContext';
import { SuccessToasts, ErrorToasts } from './toast/PrivateToast';
import SearchSymbol from './earnings/SearchSymbol';
import MyFollowingStocks from './stock/MyFollowingStocks';

type PropsType = {
  handleDrawerClose: () => void;
};

const ConfigBar: FC<PropsType> = (_props) => {
  const props = _props;
  const { state, dispatch } = useAppContext();

  // ----------ログアウトボタンの処理----------------------

  const queryClient = useQueryClient();
  const queryKey = `loginData`;

  const mutation = useMutation<LoginResponse, ErrorResponse>(logoutRequest, {
    onSuccess: (res) => {
      SuccessToasts(res.messages);
      dispatch({
        type: 'saveUser',
        setUser: null,
        isLogin: res.loggedIn,
      });
      const prevData = queryClient.getQueryData<LoginResponse>(queryKey);
      if (prevData) {
        queryClient.setQueryData<LoginResponse>(queryKey, res);
      }
    },

    onError: (err) => {
      ErrorToasts(err.response?.data.messages);
    },
  });

  // const handleLogout = async () => {
  //   try {
  //     const response = await logoutUser();

  //     if (response.status === 200) {
  //       dispatch({
  //         type: 'saveUser',
  //         setUser: null,
  //         isLogin: response.data.loggedIn,
  //       });
  //       SuccessToasts(response.data.messages);
  //     }
  //   } catch (err) {
  //     ErrorToasts(['ログアウトに失敗しました。']);

  //     console.log(err);
  //   }
  // };

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
        <ButtonContainer
          handleAction={() => mutation.mutate()}
          linkText="ログアウト"
          isLoading={mutation.isLoading}
        >
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
        <SearchSymbol />
        <MyFollowingStocks />
      </PrivateBox>
    </BaseCard>
  );
};

export default ConfigBar;
