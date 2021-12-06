import { FC } from 'react';
import { useQuery } from 'react-query';
import { RouteComponentProps } from 'react-router-dom';
import { AxiosError } from 'axios';
import { EarningsResponse } from '../Types';
import {
  getEarnings,
  // getMyFeed,
  // createUserRelationship,
  // deleteUserRelationship,
} from '../api';
import PrivateLoading from '../privateMUI/PrivateLoading';

// import { useAppContext } from '../../hooks/ReduserContext';
import { ErrorToasts } from '../toast/PrivateToast';
// import Feed from '../microposts/Feed';
import EarningStatus from './EarningStatus';
import GetStockPrice from './GetStockPrice';

const Earnings: FC<RouteComponentProps<{ symbol: string }>> = ({ match }) => {
  // const { state } = useAppContext();
  // const { currentUser } = state;

  const { data, isLoading, isError, error } = useQuery<
    EarningsResponse,
    AxiosError
  >(`Earnings-${match.params.symbol}`, () => getEarnings(match.params.symbol));

  if (isLoading) {
    return <PrivateLoading />;
  }

  if (isError && error) {
    ErrorToasts([error.message]);
  }

  if (!data) {
    return <div>データがありません</div>;
  }

  const { stock, earnings, messages } = data;

  if (!earnings || !stock) {
    return <div>データがありません</div>;
  }
  console.log(...messages);

  console.log(earnings);

  return (
    <>
      <GetStockPrice symbol={stock.symbol} />
      {earnings.map((earning) => (
        <EarningStatus stock={stock} earning={earning} key={earning.id} />
      ))}
    </>
  );
};

export default Earnings;

/* eslint-disable */

/* eslint-disable */
