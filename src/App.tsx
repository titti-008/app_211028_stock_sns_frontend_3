import { FC, useState, useRef, useEffect, ReactElement, useMemo } from 'react';
import { Switch, Link, useHistory, useLocation } from 'react-router-dom';
import * as H from 'history';
import { Drawer, Grid, Box, IconButton, Hidden } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
// import HelpIcon from '@mui/icons-material/Help';
import PublicIcon from '@mui/icons-material/Public';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import GroupIcon from '@mui/icons-material/Group';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { ThemeProvider, Theme, createTheme } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { loggedIn, logoutUser } from './components/api';
import DarkButton from './declareModule/darkButton';
import LoginForm from './components/users/LoginForm';
import HelloWorld from './components/HelloWorld';
import Users from './components/users/Users';
import UserShow from './components/users/UserShow';
import CurrentUserShow from './components/users/CurrentUserShow';
import { ErrorResponse } from './components/Types';
import { Colors } from './hooks/util';
import PrivateRoute from './components/PrivateRoute';
import UnAuthRoute from './components/authenticate/UnAuthRoute';
import NewUsers from './components/users/NewUser';
import EditUser from './components/users/EditUser';
import { SuccessToasts, ErrorToasts } from './components/toast/PrivateToast';
import './App.css';
import ConfigBar from './components/ConfigBar';
import ResetRequestForm from './components/authenticate/ResetRequest';
import ResetPasswordForm from './components/authenticate/ResetPassword';
import Microposts from './components/microposts/Microposts';
import PostBar from './components/microposts/PostBar';
import PostNew from './components/microposts/PostNew';
import {
  BaseCard,
  PrivateAppbar,
  PrivateBox,
} from './components/privateMUI/BaseCard';
import {
  CurrentUserProvider,
  useCurentUserContext,
} from './hooks/CurentUserContext';

const App: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // ----------ページ遷移履歴の管理----------------------

  /* eslint-disable */
  const history: H.History = useHistory();
  /* eslint-disable */

  // ----------ダークモードの状態管理----------------------

  const [darkMode, setDarkMode] = useState(
    !!(localStorage.getItem('darkMode') === 'on'),
  );

  const handleDarkModeOn = () => {
    localStorage.setItem('darkMode', 'on');
    setDarkMode(true);
  };

  const handleDarkModeOff = () => {
    localStorage.setItem('darkMode', 'off');
    setDarkMode(false);
  };

  const theme: Theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode],
  );

  // ----------テーマカラーの状態管理----------------------

  const colors = Colors(theme);

  // ---------Drawer開閉の状態管理----------------------
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // ----------カレントユーザー状態管理----------------------

  const { currentUser, setCurrentUser } = useCurentUserContext();

  // const [currentUser, setCurrentUser] = useState<CurrentUser>(() => {
  //   const usersJSON = localStorage.getItem('currentUser');
  //   if (usersJSON) {
  //     return JSON.parse(usersJSON) as CurrentUser;
  //   } else {
  //     return null;
  //   }
  // });

  // useEffect(() => {
  //   localStorage.setItem('currentUser', JSON.stringify(currentUser));
  // }, [currentUser]);

  // ----------ログイン状態管理----------------------

  const [isLogin, setIsLogin] = useState<boolean>(
    localStorage.getItem('isLogin') === 'true',
  );

  useEffect(() => {
    localStorage.setItem('isLogin', JSON.stringify(isLogin));
  }, [isLogin]);

  // ----------ログイン状態の確認通信----------------------
  const location = useLocation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await loggedIn();
        setIsLogin(response.data.loggedIn);
        setCurrentUser(response.data.user);
        if (response.status === 200) {
          console.log(response.data.messages);
        } else {
          ErrorToasts(response.data.messages);
        }
      } catch (err) {
        if ((err as ErrorResponse).response !== undefined) {
          console.log(err);
          console.log('login_response', (err as ErrorResponse).response);
          ErrorToasts([
            'ログイン状態の確認に失敗しました。',
            'データサーバーとの接続に問題がある可能性があります。',
          ]);
        }
      }
    };
    void checkLoginStatus();
  }, [location, isLogin]);

  // ----------ログアウトボタンの処理----------------------
  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      setIsLogin(false);
      setCurrentUser(null);
      if (response.status === 200) {
        SuccessToasts(response.data.messages);
      }
    } catch (err) {
      ErrorToasts(['ログアウトに失敗しました。']);

      console.log(err);
    }
  };

  // ----------コンポーネント----------------------
  return (
    <ThemeProvider theme={theme}>
      <CurrentUserProvider>
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
            <Grid item height="100%" width="100%">
              <Hidden mdUp implementation="js">
                <Drawer
                  anchor="left"
                  variant="temporary"
                  open={open}
                  onClose={handleDrawerClose}
                  sx={{
                    // flexShrink: 0,
                    backgroundColor: colors.baseSheet,
                  }}
                >
                  <ConfigBar
                    handleLogout={handleLogout}
                    handleDrawerClose={handleDrawerClose}
                  />
                </Drawer>
              </Hidden>
            </Grid>
            <BaseCard>
              <PrivateAppbar>
                <Grid item>
                  <IconButton color="default">
                    <DehazeIcon onClick={handleDrawerOpen} />
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
                  <Link to="/current_user">
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
                  <DarkButton
                    darkMode={darkMode}
                    handleDarkModeOn={handleDarkModeOn}
                    handleDarkModeOff={handleDarkModeOff}
                  />
                </Grid>
              </PrivateAppbar>

              <PrivateBox>
                <Switch>
                  <PrivateRoute
                    isLogin={isLogin}
                    exact
                    path="/hello_world"
                    component={HelloWorld}
                  />
                  <PrivateRoute
                    isLogin={isLogin}
                    exact
                    path="/users"
                    render={(): ReactElement => (
                      <Users currentUser={currentUser} />
                    )}
                  />
                  <PrivateRoute
                    isLogin={isLogin}
                    exact
                    path="/users/:id"
                    component={UserShow}
                  />
                  <PrivateRoute isLogin={isLogin} exact path="/current_user">
                    <CurrentUserShow />
                  </PrivateRoute>
                  <PrivateRoute isLogin={isLogin} exact path="/edit_user">
                    <EditUser history={history} />
                  </PrivateRoute>
                  <PrivateRoute isLogin={isLogin} exact path="/">
                    <Microposts />
                  </PrivateRoute>
                  <PrivateRoute isLogin={isLogin} exact path="/microposts/new">
                    <PostNew history={history} />
                  </PrivateRoute>

                  <UnAuthRoute
                    isLogin={isLogin}
                    exact
                    path="/login"
                    render={(): ReactElement => (
                      <LoginForm setIsLogin={setIsLogin} />
                    )}
                  />
                  <UnAuthRoute
                    isLogin={isLogin}
                    exact
                    path="/signup"
                    render={(): ReactElement => <NewUsers history={history} />}
                  />
                  <UnAuthRoute
                    isLogin={isLogin}
                    exact
                    path="/password_resets/new"
                    render={(): ReactElement => (
                      <ResetRequestForm history={history} />
                    )}
                  />
                  <UnAuthRoute
                    isLogin={isLogin}
                    path="/password_resets/:id/edit/email=:email"
                    component={ResetPasswordForm}
                  />
                </Switch>
              </PrivateBox>
            </BaseCard>
            <Hidden mdDown implementation="js">
              <ConfigBar
                handleLogout={handleLogout}
                handleDrawerClose={() => {}}
              />
            </Hidden>
            <Hidden mdDown implementation="js">
              <PostBar history={history} />
            </Hidden>
            <Hidden mdDown implementation="js">
              <PostBar history={history} />
            </Hidden>
          </Grid>
        </Box>
      </CurrentUserProvider>
    </ThemeProvider>
  );
};

export default App;

// tslint:disable-next-line
/* eslint-disable */
/* eslint-disable */
