import React from 'react';

import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { LoginResponse } from '../Types';

// ----------PrivateRouteコンポーネントの作成(ログイン状態によるリダイレクト)----------------------
const PrivateRoute: React.FC<RouteProps> = ({ ...props }) => {
  const { path } = props;
  /* eslint-disable */

  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<LoginResponse>(`loginData`);

  console.log(userData?.loggedIn ? 'ログイン済み' : 'ログインできていない');

  if (userData?.loggedIn) {
    return <Route {...props} />;
  } else {
    console.log(`ログインいていないユーザーは${path}へはアクセスできません`);
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;
/* eslint-disable */
