import { FC, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { Stock } from '../Types';
import Earnings from './Earnings';
import GetStockPrice from './GetStockPrice';
import { LinkButton, SubmitButton } from '../privateMUI/PrivateBottuns';
import { followStock, unfollowStock, MyStocksPriceNow } from '../api';
import { SuccessToasts } from '../toast/PrivateToast';
import StockPrice from '../stock/StockPrice';

const isFollowingStock = (symbol: string) => {
  const myStocksJSON = localStorage.getItem('myStocks');
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

  const followMutation = useMutation('myStocks', followStock, {
    onSuccess: (res) => {
      const prevData = queryClient.getQueryData<Stock[]>('myStocks');
      if (prevData) {
        queryClient.setQueryData<Stock[]>('myStocks', res.data.stocks);
      }
      localStorage.setItem('myStocks', JSON.stringify(res.data.stocks));
      SuccessToasts(res.data.messages);
      setIsFollowingStocks(
        res.data.stocks.some((stock) => stock.symbol === match.params.symbol),
      );

      void queryClient.invalidateQueries('myStocks');
      void queryClient.invalidateQueries('myStocks-price');

      const myStocksPriceResponse = MyStocksPriceNow();
      localStorage.setItem(
        'myStocks-price',
        JSON.stringify(myStocksPriceResponse.data),
      );
    },
  });

  const unfollowMutation = useMutation('myStocks', unfollowStock, {
    onMutate: () => {
      setIsFollowingStocks(true);
    },
    onSuccess: (res) => {
      const prevData = queryClient.getQueryData<Stock[]>('myStocks');
      if (prevData) {
        queryClient.setQueryData<Stock[]>('myStocks', res.data.stocks);
      }
      localStorage.setItem('myStocks', JSON.stringify(res.data.stocks));
      SuccessToasts(res.data.messages);

      setIsFollowingStocks(
        res.data.stocks.some((stock) => stock.symbol === match.params.symbol),
      );

      void queryClient.invalidateQueries('myStocks');
      void queryClient.invalidateQueries('myStocks-price');

      const myStocksPriceResponse = MyStocksPriceNow();
      localStorage.setItem(
        'myStocks-price',
        JSON.stringify(myStocksPriceResponse.data),
      );
    },
  });

  console.log('mutation.data', followMutation.data);

  const stock = followMutation.data?.data.stocks.find(
    (privateStock) => privateStock.symbol === match.params.symbol,
  );

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="space-around"
        direction="row"
        width="100%"
      >
        {stock && <StockPrice stock={stock} key={stock.id} />}

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
          disabled={false}
          isLoading={followMutation.isLoading || unfollowMutation.isLoading}
        />
      </Grid>

      <GetStockPrice symbol={match.params.symbol} day={match.params.day} />
      <Earnings symbol={match.params.symbol} />
    </>
  );
};

export default StockBoard;
