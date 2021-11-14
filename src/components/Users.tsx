import { FC, useState, useEffect, useCallback } from 'react';
import { IconButton, Grid, Divider, Avatar, Typography } from '@mui/material';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { UsersType, UserType } from './Types';
import { useColors } from '../hooks/util';
import { getUsers } from './api';

export const Users: FC = () => {
  const [users, setUsers] = useState<UsersType>([]);
  const colors = useColors();

  const load = useCallback(() => getUsers(), []);

  useEffect(() => {
    const componetDitMount = async () => {
      try {
        const response = load();
        if ((await response).status === 200) {
          setUsers((await response).data);
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
  }, [setUsers, load]);

  return (
    <Grid
      container
      // direction="column"
      justifyContent="flex-start"
      alignItems="start"
      height="100%"
    >
      {users.length !== 0 ? (
        users.map((user: UserType) => (
          <Grid item sx={{ width: '100%' }} key={user.id}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              wrap="nowrap"
            >
              <Grid item>
                <IconButton color="default">
                  <Link to={`/users/${user.id}`}>
                    <Avatar>
                      <PersonIcon fontSize="large" />
                    </Avatar>
                  </Link>
                </IconButton>
              </Grid>
              <Grid item xs sx={{ width: '50%' }}>
                <Link to={`/users/${user.id}`}>
                  <Typography
                    sx={{ color: colors.text }}
                    style={{ overflowWrap: 'break-word' }}
                  >
                    {user.name}
                  </Typography>
                </Link>
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
            <Divider />
          </Grid>
        ))
      ) : (
        <div>なし</div>
      )}
    </Grid>
  );
};

export default Users;
