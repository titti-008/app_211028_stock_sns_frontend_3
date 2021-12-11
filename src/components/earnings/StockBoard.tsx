import { FC, useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { StocksResponse, Stock } from '../Types';
import Earnings from './Earnings';
import GetStockPrice from './GetStockPrice';
import { NormalText } from '../privateMUI/PrivateTexts';
import { followStock, unfollowStock } from '../api';
import { SubmitButton } from '../privateMUI/PrivateBottuns';
import { SuccessToasts } from '../toast/PrivateToast';

const isFollowingStock = (symbol: string) => {
  const myStocksJSON = localStorage.getItem('myStocks');
  const MyStocks = myStocksJSON
    ? (JSON.parse(myStocksJSON) as Stock[])
    : ([] as Stock[]);

  const isFollowing = MyStocks?.some((stock) => stock.symbol === symbol);

  return isFollowing;
};

const StockBoard: FC<RouteComponentProps<{ symbol: string }>> = ({ match }) => {
  const queryClient = useQueryClient();

  const [isFollowingStocks, setIsFollowingStocks] = useState<boolean>(
    isFollowingStock(match.params.symbol),
  );

  useEffect(() => {
    setIsFollowingStocks(isFollowingStock(match.params.symbol));
  }, [isFollowingStocks, match]);

  const followMutation = useMutation('myStocks', followStock, {
    onSuccess: (res) => {
      const prevData =
        queryClient.getQueryData<AxiosResponse<StocksResponse>>('myStocks');
      if (prevData) {
        queryClient.setQueryData<AxiosResponse<StocksResponse>>(
          'myStocks',
          res,
        );
      }
      localStorage.setItem('myStocks', JSON.stringify(res.data.stocks));
      SuccessToasts(res.data.messages);
      setIsFollowingStocks(
        res.data.stocks.some((stock) => stock.symbol === match.params.symbol),
      );
    },
  });

  const unfollowMutation = useMutation('myStocks', unfollowStock, {
    onMutate: () => {
      setIsFollowingStocks(true);
    },
    onSuccess: (res) => {
      const prevData =
        queryClient.getQueryData<AxiosResponse<StocksResponse>>('myStocks');
      if (prevData) {
        queryClient.setQueryData<AxiosResponse<StocksResponse>>(
          'myStocks',
          res,
        );
      }
      localStorage.setItem('myStocks', JSON.stringify(res.data.stocks));
      SuccessToasts(res.data.messages);

      setIsFollowingStocks(
        res.data.stocks.some((stock) => stock.symbol === match.params.symbol),
      );
    },
  });

  console.log('mutation.data', followMutation.data);

  return (
    <>
      <NormalText>
        <h2>{match.params.symbol}</h2>

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
      </NormalText>
      <GetStockPrice symbol={match.params.symbol} />
      <Earnings symbol={match.params.symbol} />
    </>
  );
};

export default StockBoard;
