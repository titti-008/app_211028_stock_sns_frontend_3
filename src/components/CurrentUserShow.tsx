import React from 'react';
import { IconButton, Grid, Avatar, Button } from '@mui/material';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { RouteCurrentUserPropsType } from './Types';
import { useColors } from '../hooks/util';
import { NormalText } from './privateMUI/PrivateTexts';

const UserShow: React.FC<RouteCurrentUserPropsType> = ({ ...props }) => {
  /* eslint-disable */
  const { currentUser, setCurrentUser } = { ...props };
  /* eslint-disable */

  const colors = useColors();

  // useEffect(() => {
  //   setCurrentUser(currentUser);
  // }, [setCurrentUser, currentUser]);

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
      <Grid item xs sx={{ width: '100%' }}>
        <NormalText>
          ログイン状態:{currentUser ? 'ログイン済み' : '未ログイン'}
        </NormalText>
        <NormalText>{currentUser?.name}</NormalText>
        <NormalText>{currentUser?.email}</NormalText>
        <NormalText>
          管理者権限: {currentUser?.admin ? 'あり' : 'なし'}
        </NormalText>
        <NormalText>
          {formatDistanceToNow(
            currentUser ? new Date(currentUser.createdAt) : new Date(),
          )}
        </NormalText>
      </Grid>
      <Grid item marginTop="10px">
        <Button variant="outlined">
          <Link to="/edit_user">
            <NormalText>ユーザー情報編集</NormalText>
          </Link>
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserShow;

/* eslint-disable */
/* eslint-disable */
