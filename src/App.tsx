import { FC, useState, useMemo, useRef, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Drawer, AppBar, Grid, Box, IconButton } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import DehazeIcon from '@mui/icons-material/Dehaze';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';
import PublicIcon from '@mui/icons-material/Public';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DarkButton from './declareModule/darkButton';
import Home from './components/Home';
import Help from './components/Help';
import HelloWorld from './components/HelloWorld';
import { Users } from './components/Users';
import UserShow from './components/UserShow';
import NewUsers from './components/NewUsers';
import { Colors } from './util';
// import './App.css';

const App: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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

  const [colors, setColors] = useState(Colors(theme));

  /* eslint-disable */
  useEffect(() => {
    setColors(Colors(theme));
  }, [darkMode]);
  /* eslint-disable */

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
        <Box
          sx={{
            width: '350px',
            height: '100%',
            backgroundColor: colors.baseSheet,
            padding: 0,
            margin: 0,
          }}
        >
          <Box>
            <AppBar position="static" sx={{ backgroundColor: colors.header }}>
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
                  <Link to="/unk">
                    <IconButton color="default">
                      <PersonAddIcon />
                    </IconButton>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/home">
                    <IconButton color="default">
                      <HomeIcon />
                    </IconButton>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/help">
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
              <Drawer anchor="left" variant="persistent" open={open}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <Grid item>
                    <Link to="/home">
                      <DehazeIcon onClick={handleDrawerClose} />
                    </Link>
                  </Grid>
                </Grid>
              </Drawer>
            </AppBar>
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/help" component={Help} />
              <Route exact path="/hello_world" component={HelloWorld} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/users/:id" component={UserShow} />
              <Route exact path="/unk" component={NewUsers} />
            </Switch>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;

// tslint:disable-next-line
