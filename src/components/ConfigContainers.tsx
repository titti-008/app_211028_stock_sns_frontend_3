import { FC } from 'react';
import { Grid, IconButton, Divider, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { NormalText } from './privateMUI/PrivateTexts';

type LinkPropsType = {
  linkTo: string;
  linkText: string;
};

export const LinkContainer: FC<LinkPropsType> = (_props) => {
  const props = _props;

  return (
    <Grid item sx={{ width: '100%' }}>
      <Link to={props.linkTo}>
        <Grid
          container
          direction="row"
          justifyContent="start"
          alignItems="center"
          wrap="nowrap"
        >
          <IconButton color="default">
            <Grid item>{props.children}</Grid>
          </IconButton>
          <Grid item xs sx={{ width: '100%' }}>
            <NormalText>{props.linkText}</NormalText>
          </Grid>
        </Grid>
        <Divider sx={{ width: '100%' }} />
      </Link>
    </Grid>
  );
};

type ButtonPropsType = {
  handleAction: () => void;
  linkText: string;
  isLoading: boolean;
};

export const ButtonContainer: FC<ButtonPropsType> = ({
  handleAction,
  linkText,
  isLoading,
  children,
}) => (
  <Grid item width="100%" sx={{ cursor: 'pointer' }} onClick={handleAction}>
    <Grid
      container
      direction="row"
      justifyContent="start"
      alignItems="center"
      wrap="nowrap"
      width="100"
    >
      <IconButton color="default">
        <Grid item>
          {isLoading ? <CircularProgress size="20px" /> : { children }}
        </Grid>
      </IconButton>
      <Grid item xs sx={{ width: '100%' }}>
        <NormalText>{linkText}</NormalText>
      </Grid>
    </Grid>
    <Divider sx={{ width: '100%' }} />
  </Grid>
);
