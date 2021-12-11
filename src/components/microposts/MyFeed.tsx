import { FC } from 'react';
import Feed from './Feed';
import { getMyFeed } from '../api';

const MyFeed: FC = () => (
  <>
    <Feed type="myfeed" getMicropost={getMyFeed} />
  </>
);
export default MyFeed;
