import { FC } from 'react';
import { Grid, Divider, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

import { formatDistanceToNow, format } from 'date-fns';
import { NormalText } from './PrivateTexts';

type PropsType = {
  linkTo: string;
  name: string;
  date: Date | false;
  distanceToNow: boolean;
};

const IconText: FC<PropsType> = ({
  linkTo,
  name,
  date,
  distanceToNow,
  children,
}) => (
  <Grid item sx={{ width: '100%' }}>
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      wrap="nowrap"
    >
      <Grid item p={1}>
        <Link to={linkTo}>
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
            <Link to={linkTo}>
              <NormalText>{name}</NormalText>
            </Link>
          </Grid>
          <Grid item>
            {date && distanceToNow && (
              <NormalText>{formatDistanceToNow(date)}</NormalText>
            )}
            {date && !distanceToNow && (
              <NormalText>{format(date, 'yyyy/MM/dd')}</NormalText>
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
          <Grid item>{children}</Grid>
        </Grid>
      </Grid>
    </Grid>
    <Divider />
  </Grid>
);

export default IconText;
