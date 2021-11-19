import { FC, useState, useEffect, useCallback } from 'react';
import {
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
import { UserType } from '../Types';
import { useColors } from '../../hooks/util';
import { getUser } from '../api';

import { SuccessToasts, ErrorToasts } from '../toast/PrivateToast';

const UserShow: FC<RouteComponentProps<{ id: string }>> = (props) => {
  /* eslint-disable */
  const [user, setUser] = useState<UserType>({
    createdAt: new Date(),
    email: 'loading...',
    name: 'loading...',
    id: 0,
    admin: false,
  });
  /* eslint-disable */

  const load = useCallback(() => getUser(props.match.params.id), [props]);

  useEffect(() => {
    const componetDitMount = async () => {
      try {
        const response = await load();
        if (response.status === 200) {
          setUser(response.data.user);
          SuccessToasts(response.data.messages);
        } else {
          ErrorToasts(response.data.messages);
        }
      } catch (err) {
        console.log('データの取得に失敗');
        console.log(err);
      }
    };
    void componetDitMount();
  }, [setUser, load]);

  const colors = useColors();

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
