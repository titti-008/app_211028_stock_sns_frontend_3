import { FC } from 'react';
import { IconButton, Grid, Divider, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

import { NormalText } from './PrivateTexts';

type PropsType = {
  linkTo: string;
  key: number;
  name: string;
};

const IconText: FC<PropsType> = (_props) => {
  const props = _props;

  return (
    <Grid item sx={{ width: '100%' }} key={props.key}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        wrap="nowrap"
      >
        <Grid item>
          <IconButton color="default">
            <Link to={props.linkTo}>
              <Avatar>
                <PersonIcon fontSize="large" />
              </Avatar>
            </Link>
          </IconButton>
        </Grid>
        <Grid item xs sx={{ width: '50%' }}>
          <Link to={props.linkTo}>
            <NormalText>{props.name}</NormalText>
          </Link>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            wrap="nowrap"
          >
            <Grid item>{props.children}</Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
    </Grid>
  );
};

export default IconText;
/* eslint-disable */
