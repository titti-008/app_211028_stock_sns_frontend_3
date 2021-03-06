import { FC } from 'react';
import { useStockPriceQuery } from '../api';
import PrivateLoading from '../privateMUI/PrivateLoading';
import { ErrorToasts } from '../toast/PrivateToast';
import CandleChart from './CandleChart';

const GetStockPrice: FC<{ symbol: string; day: string; period: number[] }> = ({
  symbol,
  day,
  period,
}) => {
  const { data, isLoading, isError, error } = useStockPriceQuery(symbol, day);

  if (isLoading) {
    return <PrivateLoading />;
  }
  if (isError && error) {
    ErrorToasts([error.message]);
  }
  if (!data) {
    return <div>データがありません</div>;
  }

  const { historical } = data.data;

  if (!historical) {
    return <div>データがありません</div>;
  }

  return (
    <>
      <CandleChart historical={historical} symbol={symbol} period={period} />
    </>
  );
};

export default GetStockPrice;
