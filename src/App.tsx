import { FC, useState, useMemo, useRef, useEffect, ReactElement } from 'react';
import { Switch, Link, useHistory, useLocation } from 'react-router-dom';
import * as H from 'history';
import { Drawer, AppBar, Grid, Box, IconButton } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import DehazeIcon from '@mui/icons-material/Dehaze';
import HomeIcon from '@mui/icons-material/Home';
// import HelpIcon from '@mui/icons-material/Help';
import PublicIcon from '@mui/icons-material/Public';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { loggedIn, logoutUser } from './components/api';
import DarkButton from './declareModule/darkButton';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import HelloWorld from './components/HelloWorld';
import { Users } from './components/Users';
import UserShow from './components/UserShow';
import CurrentUserShow from './components/CurrentUserShow';
import { ErrorResponse, CurrentUser } from './components/Types';
import { Colors } from './hooks/util';
import PrivateRoute from './components/PrivateRoute';
import UnAuthRoute from './components/UnAuthRoute';
import NewUsers from './components/NewUser';
import EditUser from './components/EditUser';
import './App.css';

import { SuccessToasts, ErrorToasts } from './components/toast/PrivateToast';

// ----------App----------------------
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

  // ----------ログイン状態管理,カレントユーザー状態管理----------------------

  const initUser = {
    id: 0,
    email: '...loading',
    name: '...loading',
    createdAt: new Date(),
  };
  const [currentUser, setCurrentUser] = useState<CurrentUser>(initUser);

  const [isLogin, setIsLogin] = useState<boolean>(
    localStorage.getItem('isLogin') === 'true',
  );

  useEffect(() => {
    localStorage.setItem('isLogin', JSON.stringify(isLogin));
  }, [isLogin]);

  // ----------ログイン状態の確認通信----------------------
  const location = useLocation();

  useEffect(() => {
    console.log(location);

    const checkLoginStatus = async () => {
      try {
        const response = await loggedIn();
        console.log('ログイン状況', response);
        if (response.status === 200) {
          if (response.data.loggedIn !== isLogin) {
            SuccessToasts(response.data.messages);
            setIsLogin(response.data.loggedIn);
          }

          setCurrentUser(response.data.user);
        } else {
          ErrorToasts(response.data.messages);
          setCurrentUser(null);
        }
      } catch (err) {
        if ((err as ErrorResponse).response !== undefined)
          console.log('user登録失敗');
        console.log((err as ErrorResponse).response);
        ErrorToasts([
          'ログイン状態の確認に失敗しました。',
          'データサーバーとの接続に問題がある可能性があります。',
        ]);
      }
    };
    void checkLoginStatus();
  }, [location, isLogin]);

  // ----------ログアウトボタンの処理----------------------
  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.status === 200) {
        setCurrentUser(null);
        SuccessToasts(response.data.messages);
        setIsLogin(false);
      }
    } catch (err) {
      ErrorToasts(['ログアウトに失敗しました。']);

      console.log(err);
    }
  };

  // ------ナビゲーションバーのサイズ・・・子コンポーネントのサイズを調整するためにバーのサイズ固定が必要
  const appBerHeight = 42;

  // ----------コンポーネント----------------------
  return (
    <ThemeProvider theme={theme}>
      <Box
        ref={containerRef}
        sx={{
          width: '100%',
          height: '100vh',
          backgroundColor: colors.baseGround,
          padding: '10px',
          margin: 0,
        }}
      >
        <>
          <Drawer anchor="left" variant="persistent" open={open}>
            <Grid
              container
              direction="column"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Grid item>
                <Link to="/">
                  <DehazeIcon onClick={handleDrawerClose} />
                </Link>
              </Grid>
              <Grid item>
                <IconButton color="default" onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Drawer>
          <Box
            sx={{
              width: '350px',
              height: '100%',
              backgroundColor: colors.baseSheet,
              padding: 0,
              margin: 0,
            }}
          >
            <AppBar
              position="static"
              sx={{
                height: `${appBerHeight}px`,
                backgroundColor: colors.header,
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
              >
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
                    handleDarkModeOff={handleDarkModeOff}
                    handleDarkModeOn={handleDarkModeOn}
                  />
                </Grid>
              </Grid>
            </AppBar>

            <Box
              sx={{
                height: `calc(100% - ${appBerHeight}px)`,
                overflow: 'scroll',
              }}
            >
              <Switch>
                <PrivateRoute
                  isLogin={isLogin}
                  exact
                  path="/"
                  component={Home}
                />
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
                  component={Users}
                />
                <PrivateRoute
                  isLogin={isLogin}
                  exact
                  path="/users/:id"
                  component={UserShow}
                />
                <PrivateRoute isLogin={isLogin} exact path="/current_user">
                  <CurrentUserShow
                    history={history}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                  />
                </PrivateRoute>
                <PrivateRoute isLogin={isLogin} exact path="/edit_user">
                  <EditUser
                    history={history}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                  />
                </PrivateRoute>

                <UnAuthRoute
                  isLogin={isLogin}
                  exact
                  path="/login"
                  render={(): ReactElement => (
                    <LoginForm
                      setIsLogin={setIsLogin}
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  )}
                />
                <UnAuthRoute
                  isLogin={isLogin}
                  exact
                  path="/signup"
                  render={(): ReactElement => (
                    <NewUsers
                      setIsLogin={setIsLogin}
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  )}
                />
              </Switch>
            </Box>
          </Box>
        </>
      </Box>
    </ThemeProvider>
  );
};

export default App;

// tslint:disable-next-line
/* eslint-disable */
/* eslint-disable */
