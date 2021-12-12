import { FC } from 'react';
import { Grid } from '@mui/material';
import './PrivateLoadingCSS.css';
import { useColors } from '../../hooks/util';

const PrivateLoading: FC = ({ children }) => {
  const colors = useColors();

  return (
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
          <div className="loader" style={{ color: colors.text }}>
            {children}
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PrivateLoading;
