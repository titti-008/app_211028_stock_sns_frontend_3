import { FC } from 'react';
import { Grid, Box, AppBar } from '@mui/material';

import { useColors } from '../../hooks/util';

export const BaseCard: FC = ({ children }) => {
  const colors = useColors();

  return (
    <Grid item height="100%" minWidth={{ xs: '100%', sm: '100%', md: 350 }}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: colors.baseSheet,
          padding: 0,
          margin: 0,
        }}
      >
        {children}
      </Box>
    </Grid>
  );
};

// ------ナビゲーションバーのサイズ・・・子コンポーネントのサイズを調整するためにバーのサイズ固定が必要
const appBerHeight = 42;

export const PrivateAppbar: FC = ({ children }) => {
  const colors = useColors();

  return (
    <AppBar
      position="static"
      sx={{
        height: `${appBerHeight}px`,
        backgroundColor: colors.header,
      }}
    >
      <Grid container direction="row" justifyContent="left" alignItems="center">
        {children}
      </Grid>
    </AppBar>
  );
};

export const PrivateBox: FC = ({ children }) => (
  <Box
    sx={{
      height: `calc(100% - ${appBerHeight}px)`,
      overflow: 'scroll',
    }}
  >
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      wrap="nowrap"
      padding="5px"
    >
      {children}
    </Grid>
  </Box>
);

/* eslint-disable */