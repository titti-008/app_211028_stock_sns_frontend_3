import React, { useState, useCallback } from 'react';
import {
  IconButton,
  Grid,
  Avatar,
  Button,
  CircularProgress,
} from '@mui/material';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { Micropost } from '../Types';
import { NormalText } from '../privateMUI/PrivateTexts';
import Feed from '../microposts/Feed';
import { getUser } from '../api';
import { ErrorToasts } from '../toast/PrivateToast';
import { useCurentUserContext } from '../../hooks/CurentUserContext';
/* eslint-disable */
const UserShow: React.FC = () => {
  const { currentUser } = useCurentUserContext();
  const [microposts, setMicroposts] = useState<Micropost[]>([]);

  const currentLimit = microposts.length;

  const load = useCallback(
    () => getUser(currentUser ? currentUser?.id : 0, currentLimit),
    [currentUser, currentLimit],
  );

  const componetDitMount = async () => {
    try {
      const response = await load();
      if (response.status === 200) {
        setMicroposts([...microposts, ...response.data.microposts]);
        console.log(response.data.messages);
      } else {
        ErrorToasts(response.data.messages);
      }
    } catch (err) {
      console.log('データの取得に失敗');
      console.log(err);
    }
  };

  return (
    <>
      {currentUser ? (
        <>
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
          <Feed microposts={microposts} getFeed={componetDitMount} />
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default UserShow;

/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
