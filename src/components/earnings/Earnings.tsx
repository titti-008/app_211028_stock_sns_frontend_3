import { FC } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { EarningsResponse } from '../Types';

import { getEarnings } from '../api';
import PrivateLoading from '../privateMUI/PrivateLoading';
import { ErrorToasts } from '../toast/PrivateToast';
import EarningStatus from './EarningStatus';
import { NormalText } from '../privateMUI/PrivateTexts';

const Earnings: FC<{ symbol: string }> = ({ symbol }) => {
  const { data, isLoading, isError, error } = useQuery<
    EarningsResponse,
    AxiosError
  >(`Earnings-${symbol}`, () => getEarnings(symbol));

  if (isLoading) {
    return <PrivateLoading />;
  }

  if (isError && error) {
    ErrorToasts([error.message]);
  }

  if (!data) {
    return <div>データがありません</div>;
  }

  const { stock, earnings } = data;

  if (!earnings || !stock) {
    return <div>データがありません</div>;
  }

  return (
    <>
      <NormalText>{stock.symbol}</NormalText>

      {earnings.map((earning) => (
        <EarningStatus stock={stock} earning={earning} key={earning.id} />
      ))}
    </>
  );
};

export default Earnings;

/* eslint-disable */
