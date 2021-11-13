import { FC } from 'react';

import { Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { NormalText } from './PrivateTexts';
import { useColors } from '../../hooks/util';

type SubmitType = {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  label: string;
};

export const SubmitButton: FC<SubmitType> = (_props) => {
  const props = _props;
  const colors = useColors();

  return (
    <Grid item>
      <Button
        onClick={props.onClick}
        variant="outlined"
        sx={{ color: colors.text, borderColor: colors.text }}
      >
        <NormalText>{props.label}</NormalText>
      </Button>
    </Grid>
  );
};

type LinkType = {
  linkTo: string;
  label: string;
};

export const LinkButton: FC<LinkType> = (_props) => {
  const colors = useColors();
  const props = _props;

  return (
    <Grid item>
      <Link to={props.linkTo}>
        <Button
          variant="outlined"
          sx={{
            color: colors.text,
            borderColor: colors.text,
            margin: '10px 0',
          }}
        >
          <NormalText>{props.label}</NormalText>
        </Button>
      </Link>
    </Grid>
  );
};
