import { FC, useState, useMemo, useRef, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Drawer, AppBar, Grid, Box, IconButton } from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';
import PublicIcon from '@mui/icons-material/Public';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import DarkButton from './declareModule/darkButton';
import Home from './components/Home';
import Help from './components/Help';
import HelloWorld from './components/HelloWorld';
import Colors from './util';
// import './App.css';

const App: FC = () => {
  const [appHeight, setAppHeight] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setAppHeight(containerRef.current.clientHeight);
    }
  }, [setAppHeight]);

  console.log(appHeight);

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

  console.log(colors);

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
                  <Link to="/static_pages/home" color="none">
                    <IconButton color="default">
                      <DehazeIcon onClick={handleDrawerOpen} />
                    </IconButton>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/static_pages/home">
                    <IconButton color="default">
                      <HomeIcon />
                    </IconButton>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/static_pages/home">
                    <IconButton color="default">
                      <NotificationsIcon />
                    </IconButton>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/static_pages/help">
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
                    <Link to="/static_pages/home">
                      <DehazeIcon onClick={handleDrawerClose} />
                    </Link>
                  </Grid>
                </Grid>
              </Drawer>
            </AppBar>
            <Switch>
              <Route exact path="/static_pages/home" component={Home} />
              <Route exact path="/static_pages/help" component={Help} />
              <Route exact path="/hello_world" component={HelloWorld} />
            </Switch>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;

// tslint:disable-next-line
