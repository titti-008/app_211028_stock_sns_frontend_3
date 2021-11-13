import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { LoginRouteProps } from './Types';

// ----------PrivateRouteコンポーネントの作成(ログイン状態によるリダイレクト)----------------------
const UnAuthRoute: React.FC<LoginRouteProps> = ({ ...props }) => {
  /* eslint-disable */
  const { isLogin, path } = props;
  /* eslint-disable */

  console.log(isLogin ? 'ログイン済み' : 'ログインできていない');

  if (isLogin) {
    console.log(`ログイン済みのユーザーは`, path, `へはアクセスできません`);

    return <Redirect to="/" />;
  }

  /* eslint-disable */
  return <Route {...props} />;
  /* eslint-disable */
};

export default UnAuthRoute;
