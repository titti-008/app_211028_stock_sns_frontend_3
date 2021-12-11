import { FC } from 'react';
import { AxiosResponse } from 'axios';
import { CircularProgress } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useMutation, useQueryClient } from 'react-query';
import { LoginResponse, ErrorResponse } from '../Types';
import { ButtonContainer } from '../ConfigContainers';
import { logoutRequest } from '../api';
import { useAppContext } from '../../hooks/ReduserContext';
import { SuccessToasts, ErrorToasts } from '../toast/PrivateToast';

const LogoutButton: FC = () => {
  const { dispatch } = useAppContext();

  // ----------ログアウトボタンの処理----------------------

  const queryClient = useQueryClient();
  const queryKey = `loginData`;

  const mutation = useMutation<AxiosResponse<LoginResponse>, ErrorResponse>(
    'loginData',
    logoutRequest,
    {
      onSuccess: (res) => {
        SuccessToasts(res.data.messages);
        dispatch({
          type: 'saveUser',
          setUser: null,
          isLogin: res.data.loggedIn,
        });
        const prevData = queryClient.getQueryData<LoginResponse>(queryKey);
        if (prevData) {
          queryClient.setQueryData<LoginResponse>(queryKey, res.data);
        }
      },

      onError: (err) => {
        ErrorToasts(err.response?.data.messages);
      },
    },
  );

  if (mutation.isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <ButtonContainer
        handleAction={() => mutation.mutate()}
        linkText="ログアウト"
        isLoading={false}
      >
        <LogoutIcon />
      </ButtonContainer>
    </>
  );
};

export default LogoutButton;
