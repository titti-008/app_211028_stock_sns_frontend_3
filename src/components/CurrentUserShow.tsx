import React from 'react';
import {
  useTheme,
  IconButton,
  Grid,
  // Divider,
  Avatar,
  Typography,
} from '@mui/material';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
// import { RouteComponentProps } from 'react-router';
import { RouteCurrentUserPropsType } from './Types';
import { Colors } from '../util';

const UserShow: React.FC<RouteCurrentUserPropsType> = ({ ...props }) => {
  /* eslint-disable */
  const { isLogin, currentUser } = { ...props };
  /* eslint-disable */

  console.log('CurrentUser');
  console.log(currentUser);

  const theme = useTheme();

  const colors = Colors(theme);

  return (
    <Grid
      container
      direction="row"
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
          ログイン状態:{isLogin ? 'ログイン済み' : '未ログイン'}
        </Typography>
        <Typography
          sx={{ color: colors.text }}
          style={{ overflowWrap: 'break-word' }}
        >
          {currentUser.name}
        </Typography>

        <Typography
          sx={{ color: colors.text }}
          style={{ overflowWrap: 'break-word' }}
        >
          {currentUser.email}
        </Typography>

        <Typography sx={{ color: colors.text }}>
          {formatDistanceToNow(new Date(currentUser.createdAt))}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserShow;
