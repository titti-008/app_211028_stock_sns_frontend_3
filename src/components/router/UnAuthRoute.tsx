import React from 'react';

import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAppContext } from '../../hooks/ReduserContext';

// ----------PrivateRouteコンポーネントの作成(ログイン状態によるリダイレクト)----------------------
const UnAuthRoute: React.FC<RouteProps> = ({
  exact,
  path,
  component,
  render,
}) => {
  const { state } = useAppContext();

  console.log(state.isLogin ? 'ログイン済み' : 'ログインできていない');

  if (state.isLogin) {
    console.log([
      `ログイン済みのユーザーは${
        typeof path === 'string' ? path : ''
      }へはアクセスできません`,
    ]);

    return <Redirect to="/" />;
  }

  return (
    <Route exact={exact} path={path} component={component} render={render} />
  );
};

export default UnAuthRoute;
