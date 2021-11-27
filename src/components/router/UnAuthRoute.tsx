import React from 'react';

import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAppContext } from '../../hooks/ReduserContext';

// ----------PrivateRouteコンポーネントの作成(ログイン状態によるリダイレクト)----------------------
const UnAuthRoute: React.FC<RouteProps> = ({ ...props }) => {
  /* eslint-disable */
  const { path } = props;
  /* eslint-disable */
  const { state } = useAppContext();
  const { isLogin } = state;

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
