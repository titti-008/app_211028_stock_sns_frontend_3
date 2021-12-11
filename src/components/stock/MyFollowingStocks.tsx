import { FC, useEffect } from 'react';
import { LinkButton } from '../privateMUI/PrivateBottuns';
import { NormalText } from '../privateMUI/PrivateTexts';
import { useMyfollowingStocks } from '../api';
import { ErrorToasts } from '../toast/PrivateToast';
import PrivateLoading from '../privateMUI/PrivateLoading';

const MyFollowingStocks: FC = () => {
  const { data, isLoading, isError, error } = useMyfollowingStocks();

  useEffect(() => {
    if (data?.data?.stocks) {
      localStorage.setItem('myStocks', JSON.stringify(data?.data?.stocks));
    }
  }, [data]);

  if (isLoading) {
    return <PrivateLoading />;
  }

  if (isError && error) {
    ErrorToasts([error.message]);
  }

  if (!data?.data?.stocks) {
    return <div>データがありません</div>;
  }

  console.log('myStock', data);

  return (
    <>
      <NormalText>フォローしている株式</NormalText>
      {data?.data?.stocks?.map((stock) => (
        <LinkButton
          linkTo={`/stocks/${stock.symbol}`}
          label={stock.symbol}
          disabled={false}
        />
      ))}
    </>
  );
};

export default MyFollowingStocks;
