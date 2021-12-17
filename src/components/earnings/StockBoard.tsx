import { FC, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Grid, Slider } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { Stock } from '../Types';
import Earnings from './Earnings';
import GetStockPrice from './GetStockPrice';
import { LinkButton, SubmitButton } from '../privateMUI/PrivateBottuns';
import { followStock, unfollowStock, MyStocksPriceNow } from '../api';
import { SuccessToasts } from '../toast/PrivateToast';
// import StockPrice from '../stock/StockPrice';

const valuetext = (value: number) => `${value}日前`;

const isFollowingStock = (symbol: string) => {
  const myStocksJSON = localStorage.getItem('myStocks-price');
  const MyStocks = myStocksJSON
    ? (JSON.parse(myStocksJSON) as Stock[])
    : ([] as Stock[]);

  const isFollowing = MyStocks?.some((stock) => stock.symbol === symbol);

  return isFollowing;
};

const StockBoard: FC<RouteComponentProps<{ symbol: string; day: string }>> = ({
  match,
}) => {
  const queryClient = useQueryClient();

  const [isFollowingStocks, setIsFollowingStocks] = useState<boolean>(
    isFollowingStock(match.params.symbol),
  );

  useEffect(() => {
    setIsFollowingStocks(isFollowingStock(match.params.symbol));
  }, [isFollowingStocks, match]);

  const followMutation = useMutation('myStocks-price', followStock, {
    onSuccess: (res) => {
      // const prevData = queryClient.getQueryData<Stock[]>('myStocks-price');
      // if (prevData) {
      //   queryClient.setQueryData<Stock[]>('myStocks-price', res.data.stocks);
      // }
      void queryClient.invalidateQueries('myStocks-price');
      localStorage.setItem('myStocks-price', JSON.stringify(res.data.stocks));
      SuccessToasts(res.data.messages);
      setIsFollowingStocks(
        res.data.stocks.some((stock) => stock.symbol === match.params.symbol),
      );

      const myStocksPriceResponse = MyStocksPriceNow();
      localStorage.setItem(
        'myStocks-price',
        JSON.stringify(myStocksPriceResponse.data),
      );
    },
  });

  const unfollowMutation = useMutation('myStocks-price', unfollowStock, {
    onMutate: () => {
      setIsFollowingStocks(true);
    },
    onSuccess: (res) => {
      // const prevData = queryClient.getQueryData<Stock[]>('myStocks-price');
      // if (prevData) {
      //   queryClient.setQueryData<Stock[]>('myStocks-price', res.data.stocks);
      // }
      void queryClient.invalidateQueries('myStocks-price');

      localStorage.setItem('myStocks-price', JSON.stringify(res.data.stocks));
      SuccessToasts(res.data.messages);

      setIsFollowingStocks(
        res.data.stocks.some((stock) => stock.symbol === match.params.symbol),
      );

      const myStocksPriceResponse = MyStocksPriceNow();
      localStorage.setItem(
        'myStocks-price',
        JSON.stringify(myStocksPriceResponse.data),
      );
    },
  });

  const [value, setValue] = useState<number[]>([-1, 0]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="space-around"
        direction="row"
        width="100%"
      >
        <Slider
          getAriaLabel={() => '表示範囲(○○日前)'}
          min={-10}
          max={0}
          step={1}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          sx={{ marginTop: '30px', width: '90%' }}
        />
        <LinkButton
          linkTo={`/stocks/${match.params.symbol}/2000`}
          label="長期データ"
          disabled={false}
        />

        <SubmitButton
          onClick={
            !isFollowingStocks
              ? () =>
                  followMutation.mutate({
                    symbol: match.params.symbol,
                  })
              : () =>
                  unfollowMutation.mutate({
                    symbol: match.params.symbol,
                  })
          }
          label={isFollowingStocks ? 'フォロー解除' : 'フォローする'}
          disabled={followMutation.isLoading}
          isLoading={followMutation.isLoading || unfollowMutation.isLoading}
        />
      </Grid>

      <GetStockPrice
        symbol={match.params.symbol}
        day={match.params.day}
        period={value}
      />
      <Earnings symbol={match.params.symbol} period={value} />
    </>
  );
};

export default StockBoard;
