import { FC } from 'react';
import { useStockPriceQuery } from '../api';
import PrivateLoading from '../privateMUI/PrivateLoading';
import { ErrorToasts } from '../toast/PrivateToast';
import CandleChart from './CandleChart';

const GetStockPrice: FC<{ symbol: string }> = ({ symbol }) => {
  const { data, isLoading, isError, error } = useStockPriceQuery(symbol);

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
      <CandleChart historical={historical} symbol={symbol} />
    </>
  );
};

export default GetStockPrice;
