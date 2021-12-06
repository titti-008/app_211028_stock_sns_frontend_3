import { FC } from 'react';
import { useQuery } from 'react-query';

import { AxiosError } from 'axios';
import { getStockPrice } from '../api';
import PrivateLoading from '../privateMUI/PrivateLoading';
import { StockPriceResponse } from '../Types';
import { ErrorToasts } from '../toast/PrivateToast';
import CandleChart from './CandleChart';

/* eslint-disable */

const GetStockPrice: FC<{ symbol: string }> = ({ symbol }) => {
  const { data, isLoading, isError, error } = useQuery<
    StockPriceResponse,
    AxiosError
  >(`price-${symbol}`, () => getStockPrice(symbol));

  if (isLoading) {
    return <PrivateLoading />;
  }
  if (isError && error) {
    ErrorToasts([error.message]);
  }
  if (!data) {
    return <div>データがありません</div>;
  }
  const { historical } = data;

  console.log('historicalData', data);

  if (!historical) {
    return <div>データがありません</div>;
  }

  return (
    <>
      <CandleChart historical={historical} symbol={symbol} />
    </>
  );
};

export default GetStockPrice;

/* eslint-disable */

/* eslint-disable */
