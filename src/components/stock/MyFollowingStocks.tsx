import { FC, useEffect } from 'react';
import { Grid, Divider } from '@mui/material';
import { NormalText } from '../privateMUI/PrivateTexts';
import { MyStocksPriceNow } from '../api';
// import { Stock } from '../Types';
import { ErrorToasts } from '../toast/PrivateToast';
import PrivateLoading from '../privateMUI/PrivateLoading';
import StockPrice from './StockPrice';

/* eslint-disable */

const MyFollowingStocks: FC = () => {
  const myStocksPriceResponse = MyStocksPriceNow();

  useEffect(() => {
    if (myStocksPriceResponse.data) {
      localStorage.setItem(
        'myStocks-price',
        JSON.stringify(myStocksPriceResponse.data),
      );
    }
  }, [myStocksPriceResponse.data]);

  console.log('myStocksPriceResponse', myStocksPriceResponse);

  if (myStocksPriceResponse.isLoading) {
    return <PrivateLoading />;
  }

  if (!myStocksPriceResponse.data) {
    return <div>データがありません</div>;
  }

  if (myStocksPriceResponse.isError && myStocksPriceResponse.error) {
    ErrorToasts([myStocksPriceResponse.error['Error Message']]);
  }

  console.log('myStocksPriceResponse', myStocksPriceResponse.data);

  return (
    <>
      <Grid item>
        <NormalText>フォローしている株式</NormalText>
        {myStocksPriceResponse.data?.map((stock) => (
          <StockPrice stock={stock} />
        ))}
        <Divider sx={{ width: '100%' }} />
      </Grid>
    </>
  );
};

export default MyFollowingStocks;
