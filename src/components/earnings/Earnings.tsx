import { FC } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { EarningsResponse } from '../Types';

import { getEarnings } from '../api';
import PrivateLoading from '../privateMUI/PrivateLoading';
import { ErrorToasts } from '../toast/PrivateToast';
import EpsCharts from './EpsCharts';
import GrowthCharts from './GrowthCharts';
import CashFlowCharts from './CashFlowCharts';
import { NormalText } from '../privateMUI/PrivateTexts';

const Earnings: FC<{ symbol: string; period: number[] }> = ({
  symbol,
  period,
}) => {
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
    return <NormalText>データがありません</NormalText>;
  }

  const { stock, earnings } = data;

  if (!earnings || !stock) {
    return <div>データがありません</div>;
  }

  return (
    <>
      <NormalText>
        <h2>{stock.name}</h2>
      </NormalText>

      <EpsCharts earnings={earnings} period={period} />
      <GrowthCharts earnings={earnings} period={period} />
      <CashFlowCharts earnings={earnings} period={period} />
    </>
  );
};

export default Earnings;
