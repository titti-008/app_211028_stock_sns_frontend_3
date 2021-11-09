import { FC, useState, useMemo, useRef, useEffect, ReactElement } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import { Drawer, AppBar, Grid, Box, IconButton } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import DehazeIcon from '@mui/icons-material/Dehaze';
import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';
import PublicIcon from '@mui/icons-material/Public';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { RouteComponentProps, StaticContext } from 'react-router';
import { loggedIn, logoutUser } from './components/api';
import DarkButton from './declareModule/darkButton';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import HelloWorld from './components/HelloWorld';
import { Users } from './components/Users';
import UserShow from './components/UserShow';
import CurrentUserShow from './components/CurrentUserShow';
import { UserType } from './components/Types';
import { Colors } from './util';
import PrivateRoute from './components/PrivateRoute';
import UnAuthRoute from './components/UnAuthRoute';
import NewUsers from './components/NewUsers';
import TestLogin from './components/TestLogin1';

// ----------App----------------------
const App: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
  const [colors, setColors] = useState(Colors(theme));

  useEffect(() => {
    setColors(Colors(theme));
  }, [darkMode, theme]);
  /* eslint-disable */
  /* eslint-disable */

  // ---------Drawer開閉の状態管理----------------------
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // ----------ログイン状態管理,カレントユーザー状態管理----------------------
  const [isLogin, setloginState] = useState<boolean>(false);

  const initUserState = {
    createdAt: new Date(),
    email: 'loading...',
    name: 'loading...',
    id: 0,
  };
  const [currentUser, setCurrentUser] = useState<UserType>(initUserState);

  const handleLogin = (user: UserType) => {
    console.log('handleLogin');
    console.log(user);
    setloginState(true);
    setCurrentUser(user);
    console.log('handleLogin後のcurrentUser:', currentUser);
  };

  // ----------ログイン状態の確認通信----------------------
  const checkLoginStatus = async () => {
    try {
      const response = await loggedIn();
      console.log('ログイン状況', response);
      if (response.data.loggedIn && !isLogin) {
        console.log('ログイン確認:OK');
        handleLogin(response.data.user);
      } else if (!response.data.loggedIn && isLogin) {
        console.log('ログイン確認:NG ログアウトします');
        setloginState(false);
        setCurrentUser(initUserState);
      }
    } catch (err) {
      console.log('ログインエラー');
      console.log(err);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  });

  // ----------ログアウトボタンの処理----------------------
  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.status === 200) {
        setloginState(false);
        setCurrentUser(initUserState);
        console.log(response.data.message);
      }
    } catch (err) {
      console.log('ログアウト失敗');
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
                  <Link to="/test">
                    <IconButton color="default">
                      <HelpIcon />
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
                <Route
                  exact
                  path="/test"
                  render={(
                    props: RouteComponentProps<{}, StaticContext, unknown>,
                  ): ReactElement => {
                    return (
                      <TestLogin
                        {...props}
                        isLogin={isLogin}
                        handleLogin={handleLogin}
                        currentUser={currentUser}
                      />
                    );
                  }}
                />
                <PrivateRoute
                  isLogin={isLogin}
                  exact
                  path="/current_user"
                  render={(
                    props: RouteComponentProps<{}, StaticContext, unknown>,
                  ): ReactElement => {
                    return (
                      <CurrentUserShow
                        {...props}
                        isLogin={isLogin}
                        currentUser={currentUser}
                      />
                    );
                  }}
                />
                <UnAuthRoute
                  isLogin={isLogin}
                  exact
                  path="/login"
                  render={(
                    props: RouteComponentProps<{}, StaticContext, unknown>,
                  ): ReactElement => {
                    return (
                      <LoginForm
                        {...props}
                        isLogin={isLogin}
                        handleLogin={handleLogin}
                      />
                    );
                  }}
                />
                <UnAuthRoute
                  isLogin={isLogin}
                  exact
                  path="/signup"
                  render={(
                    props: RouteComponentProps<{}, StaticContext, unknown>,
                  ): ReactElement => {
                    return (
                      <NewUsers
                        {...props}
                        isLogin={isLogin}
                        handleLogin={handleLogin}
                      />
                    );
                  }}
                />
              </Switch>
            </Box>
          </Box>
        </>
        <Switch></Switch>
      </Box>
    </ThemeProvider>
  );
};

export default App;

// tslint:disable-next-line
