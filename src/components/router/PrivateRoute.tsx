import React from 'react';

import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useLoginContext } from '../../hooks/ReduserContext';

// ----------PrivateRouteコンポーネントの作成(ログイン状態によるリダイレクト)----------------------
const PrivateRoute: React.FC<RouteProps> = ({ ...props }) => {
  /* eslint-disable */
  const { path } = props;
  /* eslint-disable */

  const { state } = useLoginContext();
  const { isLogin } = state;

  console.log(isLogin ? 'ログイン済み' : 'ログインできていない');

  if (isLogin) {
    /* eslint-disable */
    return <Route {...props} />;
    /* eslint-disable */
  } else {
    console.log(`ログインいていないユーザーは${path}へはアクセスできません`);
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;
