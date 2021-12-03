import { FC } from 'react';
import { Grid, Box, AppBar } from '@mui/material';

import { useColors } from '../../hooks/util';

export const BaseCard: FC = ({ children }) => {
  const colors = useColors();

  return (
    <Grid
      item
      height="100%"
      width="100%"
      minWidth={{ xs: '100%', sm: '100%', md: 400 }}
    >
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
        width: '100%',
        height: `${appBerHeight}px`,
        backgroundColor: colors.header,
      }}
    >
      <Grid
        width="100%"
        container
        direction="row"
        justifyContent="left"
        alignItems="center"
      >
        {children}
      </Grid>
    </AppBar>
  );
};

export const PrivateBox: FC = ({ children }) => (
  <Box
    width="100%"
    sx={{
      height: `calc(100% - ${appBerHeight}px)`,
      overflow: 'scroll',
    }}
  >
    <Grid
      width="100%"
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
