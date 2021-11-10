import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { LoginRouteProps } from './Types';

// ----------PrivateRouteコンポーネントの作成(ログイン状態によるリダイレクト)----------------------
const PrivateRoute: React.FC<LoginRouteProps> = ({ ...props }) => {
  /* eslint-disable */
  const { currentUser, path } = props;
  /* eslint-disable */

  console.log(currentUser ? 'ログイン済み' : 'ログインできていない');

  if (currentUser) {
    /* eslint-disable */
    return <Route {...props} />;
    /* eslint-disable */
  } else {
    console.log(`ログインいていないユーザーは${path}へはアクセスできません`);
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;
