import { FC } from 'react';
import { Grid, Divider, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { NormalText } from './PrivateTexts';
/* eslint-disable */
type PropsType = {
  linkTo: string;
  key: number;
  name: string;
  date?: Date;
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
        <Grid item p={1}>
          <Link to={props.linkTo}>
            <Avatar>
              <PersonIcon fontSize="large" />
            </Avatar>
          </Link>
        </Grid>
        <Grid item xs sx={{ width: '50%' }}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            wrap="nowrap"
          >
            <Grid item>
              <Link to={props.linkTo}>
                <NormalText>{props.name}</NormalText>
              </Link>
            </Grid>
            <Grid item>
              {props.date && (
                <NormalText>{formatDistanceToNow(props.date)}</NormalText>
              )}
            </Grid>
          </Grid>

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
