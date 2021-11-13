import React, { useEffect } from 'react';
import { IconButton, Grid, Avatar, Typography, Button } from '@mui/material';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { RouteCurrentUserPropsType } from './Types';
import { useColors } from '../hooks/util';

const UserShow: React.FC<RouteCurrentUserPropsType> = ({ ...props }) => {
  /* eslint-disable */
  const { currentUser, setCurrentUser } = { ...props };
  /* eslint-disable */

  const colors = useColors();

  useEffect(() => {
    setCurrentUser(currentUser);
  }, [setCurrentUser, currentUser]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      wrap="nowrap"
    >
      <Grid item>
        <IconButton color="default">
          <Link to="/users/:id">
            <Avatar>
              <PersonIcon fontSize="large" />
            </Avatar>
          </Link>
        </IconButton>
      </Grid>
      <Grid item xs sx={{ width: '50%' }}>
        <Typography
          sx={{ color: colors.text }}
          style={{ overflowWrap: 'break-word' }}
        >
          ログイン状態:{currentUser ? 'ログイン済み' : '未ログイン'}
        </Typography>
        <Typography
          sx={{ color: colors.text }}
          style={{ overflowWrap: 'break-word' }}
        >
          {currentUser?.name}
        </Typography>

        <Typography
          sx={{ color: colors.text }}
          style={{ overflowWrap: 'break-word' }}
        >
          {currentUser?.email}
        </Typography>

        <Typography sx={{ color: colors.text }}>
          {formatDistanceToNow(
            currentUser ? new Date(currentUser.createdAt) : new Date(),
          )}
        </Typography>
      </Grid>
      <Grid item marginTop="10px">
        <Button variant="outlined">
          <Link to="/edit_user">
            <Typography
              sx={{ color: colors.text }}
              style={{ overflowWrap: 'break-word' }}
            >
              ユーザー情報編集
            </Typography>
          </Link>
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserShow;

/* eslint-disable */
/* eslint-disable */
