import { FC } from 'react';
import { IconButton, Grid, Divider, Avatar, Typography } from '@mui/material';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { Micropost } from '../Types';
import { useColors } from '../../hooks/util';

const Users: FC<Micropost> = (_micropost) => {
  const micropost = _micropost;

  const colors = useColors();

  return (
    <Grid item sx={{ width: '100%' }} key={micropost.id}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        wrap="nowrap"
      >
        <Grid item>
          <IconButton color="default">
            <Link to={`/users/${micropost.user.id}`}>
              <Avatar>
                <PersonIcon fontSize="large" />
              </Avatar>
            </Link>
          </IconButton>
        </Grid>
        <Grid item xs sx={{ width: '50%' }}>
          <Link to={`/users/${micropost.user.id}`}>
            <Typography
              sx={{ color: colors.text }}
              style={{ overflowWrap: 'break-word' }}
            >
              {micropost.user.name}
            </Typography>
          </Link>
          <Typography
            sx={{ color: colors.text }}
            style={{ overflowWrap: 'break-word' }}
          >
            {micropost.user.email}
          </Typography>

          <Typography sx={{ color: colors.text }}>
            {formatDistanceToNow(new Date(micropost.createdAt))}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
    </Grid>
  );
};

export default Users;
/* eslint-disable */

/* eslint-disable */
/* eslint-disable */
