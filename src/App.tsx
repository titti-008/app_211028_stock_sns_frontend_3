import { FC, useEffect, useRef, ReactElement } from 'react';
import { Switch, Link, useHistory } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import * as H from 'history';
import { Drawer, Grid, Box, IconButton, Hidden } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { useQueryClient } from 'react-query';
import SendIcon from '@mui/icons-material/Send';
import GroupIcon from '@mui/icons-material/Group';
import DehazeIcon from '@mui/icons-material/Dehaze';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import { LoginResponse } from './components/Types';
import { useLoggedQuery } from './components/api';
import DarkButton from './declareModule/darkButton';
import LoginForm from './components/users/LoginForm';
import HelloWorld from './components/HelloWorld';
import AllUsers from './components/users/AllUsers';
import UserShow from './components/users/UserShow';
import Followers from './components/users/Followers';
import Following from './components/users/Following';
import { Colors } from './hooks/util';
import PrivateRoute from './components/router/PrivateRoute';
import UnAuthRoute from './components/router/UnAuthRoute';
import NewUsers from './components/users/NewUser';
import EditUser from './components/users/EditUser';
import { ErrorToasts } from './components/toast/PrivateToast';
import './App.css';
import ConfigBar from './components/ConfigBar';
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
  const containerRef = useRef<HTMLDivElement>(null);
  // const queryClient = useQueryClient();
  // const queryKey = `loginData`;

  // const userData = queryClient.getQueryData<LoginResponse>(queryKey);

  // ----------ページ遷移履歴の管理----------------------

  const history = useHistory() as H.History;

  // ----------カレントユーザー状態管理----------------------

  const { state, dispatch } = useAppContext();

  // // ----------テーマカラーの状態管理----------------------
  const colors = Colors(state.theme);

  // ----------ログイン状態の確認通信----------------------

  // const location = useLocation() as H.Location

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
    if (!state.isLogin) {
      history.push('/login');
    }
  }, [dispatch, data, history, state.isLogin]);

  if (!data) {
    return <div>データがありません</div>;
  }

  if (isLoading) {
    return <PrivateLoading />;
  }

  // useEffect(() => {
  //   dispatch({ type: 'closeDrawer' });
  //   const checkLoginStatus = async () => {
  //     try {
  //       const response = await loggedIn();
  //       dispatch({
  //         type: 'saveUser',
  //         setUser: response.data.user,
  //         isLogin: response.state.isLogin,
  //       });
  //       if (response.status === 200) {
  //         console.log(response.data.messages);
  //       } else {
  //         ErrorToasts(response.data.messages);
  //       }
  //     } catch (err) {
  //       if ((err as ErrorResponse).response !== undefined) {
  //         console.log(err);
  //         console.log('login_response', (err as ErrorResponse).response);
  //         ErrorToasts([
  //           'ログイン状態の確認に失敗しました。',
  //           'データサーバーとの接続に問題がある可能性があります。',
  //         ]);
  //       }
  //     }
  //   };
  //   void checkLoginStatus();
  // }, [location, dispatch]);

  // ----------コンポーネント----------------------
  return (
    <>
      <Box
        ref={containerRef}
        sx={{
          width: '100%',
          height: '100vh',
          backgroundColor: colors.baseGround,
          margin: 0,
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          columnSpacing={{ xs: 0, sm: 0, md: 1 }}
          paddingY={{ xs: 0, sm: 0, md: 1 }}
          alignItems="flex-start"
          height="100%"
          wrap="nowrap"
          overflow="scroll"
        >
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

          <BaseCard>
            <PrivateAppbar>
              <Grid item>
                <IconButton
                  color="default"
                  onClick={() => dispatch({ type: 'OpenDrawer' })}
                >
                  <DehazeIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Link to="/signup">
                  <IconButton color="default">
                    <PersonAddIcon />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item>
                {state.currentUser && (
                  <Link to={`/users/${state.currentUser.id}`}>
                    <IconButton color="default">
                      <AccountCircleIcon />
                    </IconButton>
                  </Link>
                )}
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
                <Link to="/hello_world">
                  <IconButton color="default">
                    <PublicIcon />
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
              <Grid item>
                <DarkButton />
              </Grid>
            </PrivateAppbar>

            <PrivateBox>
              {isLoading ? (
                <PrivateLoading />
              ) : (
                <Switch>
                  <PrivateRoute
                    exact
                    path="/hello_world"
                    component={HelloWorld}
                  />
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
                    path="/stocks/:symbol"
                    component={StockBoard}
                  />
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
                </Switch>
              )}
            </PrivateBox>
          </BaseCard>
          {state.isLogin && (
            <Hidden mdDown implementation="js">
              <ConfigBar />
            </Hidden>
          )}
          <ReactQueryDevtools />
        </Grid>
      </Box>
    </>
  );
};

export default App;
