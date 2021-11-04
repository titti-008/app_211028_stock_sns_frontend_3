import { FC, useState, useEffect, useCallback } from 'react';
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
import { RouteComponentProps } from 'react-router';
import { UserType } from './Types';
import { Colors } from '../util';
import { getUser } from './api';

const UserShow: FC<RouteComponentProps<{ id: string }>> = (props) => {
  const [user, setUser] = useState<UserType>({
    createdAt: new Date(),
    email: '...',
    id: 0,
    name: '',
  });
  const load = useCallback(() => getUser(props.match.params.id), [props]);

  useEffect(() => {
    const componetDitMount = async () => {
      try {
        const response = load();
        if ((await response).status === 200) {
          setUser((await response).data);
        } else {
          console.log('status200以外のレスポンス発生');
          console.log(response);
        }
      } catch (err) {
        console.log('データの取得に失敗');
        console.log(err);
      }
    };
    void componetDitMount();
  }, [setUser, load]);
  /* eslint-disable */
  /* eslint-disable */

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
          {user.name}
        </Typography>

        <Typography
          sx={{ color: colors.text }}
          style={{ overflowWrap: 'break-word' }}
        >
          {user.email}
        </Typography>

        <Typography sx={{ color: colors.text }}>
          {formatDistanceToNow(new Date(user.createdAt))}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserShow;
