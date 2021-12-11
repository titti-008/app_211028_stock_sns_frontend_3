import React from 'react';

import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { LoginResponse } from '../Types';
import { ErrorToasts } from '../toast/PrivateToast';

// ----------PrivateRouteコンポーネントの作成(ログイン状態によるリダイレクト)----------------------
const UnAuthRoute: React.FC<RouteProps> = ({ ...props }) => {
  /* eslint-disable */
  const { path } = props;
  /* eslint-disable */
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<LoginResponse>(`loginData`);

  console.log(userData?.loggedIn ? 'ログイン済み' : 'ログインできていない');

  if (userData?.loggedIn) {
    ErrorToasts([`ログイン済みのユーザーは${path}へはアクセスできません`]);

    return <Redirect to="/" />;
  }

  /* eslint-disable */
  return <Route {...props} />;
  /* eslint-disable */
};

export default UnAuthRoute;
