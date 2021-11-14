import { FC } from 'react';
import { Grid, IconButton, Divider } from '@mui/material';
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
};

export const ButtonContainer: FC<ButtonPropsType> = (_props) => {
  const props = _props;

  return (
    <Grid
      item
      sx={{ width: '100%', cursor: 'pointer' }}
      onClick={props.handleAction}
    >
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
    </Grid>
  );
};
