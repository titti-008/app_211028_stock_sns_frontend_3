import { FC } from 'react';
import { useQuery } from 'react-query';
import { RouteComponentProps } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { AxiosError } from 'axios';
import { EarningsResponse } from '../Types';
import {
  getEarnings,
  // getMyFeed,
  // createUserRelationship,
  // deleteUserRelationship,
} from '../api';
import IconText from '../privateMUI/IconText';
import // LinkButton,
// TextButton,
// SubmitButton,
'../privateMUI/PrivateBottuns';
import { NormalText } from '../privateMUI/PrivateTexts';
// import { useAppContext } from '../../hooks/ReduserContext';
import { ErrorToasts } from '../toast/PrivateToast';
// import Feed from '../microposts/Feed';

const Earnings: FC<RouteComponentProps<{ symbol: string }>> = ({ match }) => {
  // const { state } = useAppContext();
  // const { currentUser } = state;

  // const symbol = match.params.symbolA

  const { data, isLoading, isError, error } = useQuery<
    EarningsResponse,
    AxiosError
  >(`Earnings-${match.params.symbol}`, () => getEarnings(match.params.symbol));

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError && error) {
    ErrorToasts([error.message]);
  }

  if (!data) {
    return <div>ユーザーがいません</div>;
  }

  const { stock, earnings, messages } = data;

  console.log(...messages);

  return (
    <>
      {earnings.map((earning) => (
        <IconText
          linkTo={`/stocks/${match.params.symbol}`}
          key={stock.id}
          name={stock.symbol}
          date={new Date(earning.reportedDate)}
        >
          <NormalText>costOfRevenue:{earning.costOfRevenue}</NormalText>
          <NormalText>estimatedEPS:{earning.estimatedEPS}</NormalText>
          <NormalText>reportedEPS:{earning.reportedEPS}</NormalText>
          <NormalText>operatingCashflow:{earning.operatingCashflow}</NormalText>
          <NormalText>operatingCashflow:{earning.totalRevenue}</NormalText>
        </IconText>
      ))}
    </>
  );
};

export default Earnings;

/* eslint-disable */

/* eslint-disable */
