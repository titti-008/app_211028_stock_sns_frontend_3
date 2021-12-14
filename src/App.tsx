import { FC, useEffect, ReactElement } from 'react';
import { Switch, Link, useHistory, useLocation } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import * as H from 'history';
import { Drawer, Grid, IconButton, Hidden } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LoginIcon from '@mui/icons-material/Login';
import SendIcon from '@mui/icons-material/Send';
import GroupIcon from '@mui/icons-material/Group';
import DehazeIcon from '@mui/icons-material/Dehaze';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useLoggedQuery } from './components/api';
import DarkButton from './components/privateMUI/PrivateDarkButton';
import LoginForm from './components/authenticate/LoginForm';
import HelloWorld from './components/admin/HelloWorld';
import AllUsers from './components/users/AllUsers';
import UserShow from './components/users/UserShow';
import Followers from './components/users/Followers';
import Following from './components/users/Following';
import { useColors } from './hooks/useColors';
import PrivateRoute from './components/router/PrivateRoute';
import UnAuthRoute from './components/router/UnAuthRoute';
import BaseGround from './components/privateMUI/BaseGround';
import NewUsers from './components/users/NewUser';
import EditUser from './components/users/EditUser';
import { ErrorToasts } from './components/toast/PrivateToast';
import './App.css';
import ConfigBar from './components/privateMUI/ConfigBar';
import ResetRequestForm from './components/authenticate/ResetRequest';
import ResetPasswordForm from './components/authenticate/ResetPassword';
import MyFeed from './components/microposts/MyFeed';
import PostBar from './components/microposts/PostBar';
import PostNew from './components/microposts/PostNew';
import {
  BaseCard,
  PrivateAppbar,
  PrivateBox,
} from './components/privateMUI/BaseCard';
import { useAppContext } from './hooks/ReduserContext';
import StockBoard from './components/earnings/StockBoard';
import PrivateLoading from './components/privateMUI/PrivateLoading';

const App: FC = () => {
  // ----------ページ遷移履歴の管理----------------------

  const history = useHistory() as H.History;
  const location = useLocation() as H.Location;

  // ----------カレントユーザー状態管理----------------------

  const { state, dispatch } = useAppContext();

  // // ----------テーマカラーの状態管理----------------------
  const colors = useColors();

  // ----------ログイン状態の確認通信----------------------

  const { data, isLoading, isError, error } = useLoggedQuery();

  if (isError && error) {
    ErrorToasts([
      'ログイン状態の確認に失敗しました。',
      'データサーバーとの接続に問題がある可能性があります。',
    ]);
  }

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'saveUser',
        setUser: data.data.user,
        isLogin: data.data.loggedIn,
      });
    }
  }, [dispatch, data]);

  useEffect(() => {
    dispatch({ type: 'closeDrawer' });
  }, [dispatch, location]);

  if (isLoading) {
    return <PrivateLoading />;
  }

  // ----------コンポーネント----------------------
  return (
    <>
      <BaseGround>
        {state.isLogin && state.currentUser && (
          <>
            <Hidden mdDown implementation="js">
              <PostBar history={history} />
            </Hidden>
            <Hidden mdUp implementation="js">
              <Grid item height="100%" width="100%">
                <Drawer
                  anchor="left"
                  variant="temporary"
                  open={state.drawerIsOpen}
                  onClose={() => dispatch({ type: 'closeDrawer' })}
                  sx={{
                    backgroundColor: colors.baseSheet,
                  }}
                >
                  <ConfigBar />
                </Drawer>
              </Grid>
            </Hidden>
          </>
        )}

        <BaseCard width={400}>
          <PrivateAppbar>
            {state.isLogin ? (
              <>
                <Grid item>
                  <IconButton
                    color="default"
                    onClick={() => dispatch({ type: 'OpenDrawer' })}
                  >
                    <DehazeIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Link to={`/users/${state?.currentUser?.id || ''}`}>
                    <IconButton color="default">
                      <AccountCircleIcon />
                    </IconButton>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/">
                    <IconButton color="default">
                      <HomeIcon />
                    </IconButton>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/microposts/new">
                    <IconButton color="default">
                      <SendIcon />
                    </IconButton>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/users">
                    <IconButton color="default">
                      <GroupIcon />
                    </IconButton>
                  </Link>
                </Grid>
                {state.currentUser?.admin && (
                  <Grid item>
                    <Link to="/hello_world">
                      <IconButton color="default">
                        <AdminPanelSettingsIcon />
                      </IconButton>
                    </Link>
                  </Grid>
                )}
              </>
            ) : (
              <>
                <Grid item>
                  <Link to="/login">
                    <IconButton color="default">
                      <LoginIcon />
                    </IconButton>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup">
                    <IconButton color="default">
                      <PersonAddIcon />
                    </IconButton>
                  </Link>
                </Grid>
              </>
            )}
            <Grid item>
              <DarkButton />
            </Grid>
          </PrivateAppbar>

          <PrivateBox>
            <Switch>
              {state.currentUser?.admin && (
                <PrivateRoute
                  exact
                  path="/hello_world"
                  component={HelloWorld}
                />
              )}
              <PrivateRoute exact path="/users" component={AllUsers} />
              <PrivateRoute exact path="/users/:id" component={UserShow} />
              <PrivateRoute
                exact
                path="/users/:id/followers"
                component={Followers}
              />
              <PrivateRoute
                exact
                path="/users/:id/following"
                component={Following}
              />

              <PrivateRoute
                exact
                path="/edit_user"
                render={() => <EditUser history={history} />}
              />

              <PrivateRoute exact path="/" component={MyFeed} />
              <PrivateRoute
                exact
                path="/microposts/new"
                render={() => <PostNew history={history} />}
              />

              <PrivateRoute
                exact
                path="/stocks/:symbol/:day"
                component={StockBoard}
              />
              <PrivateBox>
                <UnAuthRoute
                  exact
                  path="/login"
                  render={(): ReactElement => <LoginForm history={history} />}
                />

                <UnAuthRoute
                  exact
                  path="/signup"
                  render={(): ReactElement => <NewUsers history={history} />}
                />
                <UnAuthRoute
                  exact
                  path="/password_resets/new"
                  render={(): ReactElement => (
                    <ResetRequestForm history={history} />
                  )}
                />
                <UnAuthRoute
                  path="/password_resets/:id/edit/email=:email"
                  component={ResetPasswordForm}
                />
              </PrivateBox>
            </Switch>
          </PrivateBox>
        </BaseCard>

        {state.isLogin && (
          <Hidden mdDown implementation="js">
            <ConfigBar />
          </Hidden>
        )}

        <ReactQueryDevtools />
      </BaseGround>
    </>
  );
};

export default App;
