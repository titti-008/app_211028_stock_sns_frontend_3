import { FC } from 'react';
import { Grid, Divider } from '@mui/material';
import { NormalText } from '../privateMUI/PrivateTexts';
// import { Stock } from '../Types';
import { ErrorToasts } from '../toast/PrivateToast';
import PrivateLoading from '../privateMUI/PrivateLoading';
import StockPrice from './StockPrice';
import { MyStocksPriceNow } from '../api';

/* eslint-disable */

const MyFollowingStocks: FC = () => {
  const myStocksPriceResponse = MyStocksPriceNow();
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

        {!!myStocksPriceResponse?.data &&
          myStocksPriceResponse?.data?.map((stock, index) => (
            <StockPrice stock={stock} key={index} />
          ))}
        <Divider sx={{ width: '100%' }} />
      </Grid>
    </>
  );
};

export default MyFollowingStocks;
