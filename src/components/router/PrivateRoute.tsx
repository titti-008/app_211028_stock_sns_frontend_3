import React from 'react';

import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAppContext } from '../../hooks/ReduserContext';

// ----------PrivateRouteコンポーネントの作成(ログイン状態によるリダイレクト)----------------------
const PrivateRoute: React.FC<RouteProps> = ({ ...props }) => {
  const { path } = props;
  /* eslint-disable */

  const { state } = useAppContext();
  const { isLogin } = state;

  console.log(isLogin ? 'ログイン済み' : 'ログインできていない');

  if (isLogin) {
    return <Route {...props} />;
  } else {
    console.log(`ログインいていないユーザーは${path}へはアクセスできません`);
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;
/* eslint-disable */
