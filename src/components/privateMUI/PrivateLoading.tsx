import { CircularProgress, Grid } from '@mui/material';

const PrivateLoading = () => (
  <Grid item width="100%" height="100%">
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <Grid item width="100%" height="100%">
        <CircularProgress />
      </Grid>
    </Grid>
  </Grid>
);

export default PrivateLoading;
