import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { LoginRouteProps } from './Types';

// ----------PrivateRouteコンポーネントの作成(ログイン状態によるリダイレクト)----------------------
const PrivateRoute: React.FC<LoginRouteProps> = ({ ...props }) => {
  /* eslint-disable */
  const { isLogin, path } = props;
  /* eslint-disable */

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
