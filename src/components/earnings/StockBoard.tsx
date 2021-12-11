import { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { LoginResponse } from '../Types';
// import Earnings from './Earnings';
import GetStockPrice from './GetStockPrice';
import { NormalText } from '../privateMUI/PrivateTexts';
import { followStock } from '../api';
import { SubmitButton } from '../privateMUI/PrivateBottuns';
import { useAppContext } from '../../hooks/ReduserContext';

/* eslint-disable */
const StockBoard: FC<RouteComponentProps<{ symbol: string }>> = ({ match }) => {
  const { state, dispatch } = useAppContext();

  const queryClient = useQueryClient();
  const queryKey = `loginData`;
  const prevData = queryClient.getQueryData<LoginResponse>(queryKey);

  const mutation = useMutation(followStock, {
    onSuccess: (res) => {
      // dispatch({
      //   type: 'saveUser',
      //   setUser: res.data.user,
      //   isLogin: true,
      // });
      if (prevData) {
        queryClient.setQueryData<LoginResponse>(queryKey, res.data);
      }
    },
  });

  const isFollowingStock = prevData
    ? !!prevData.user?.followingStocks.some(
        (stock) => stock.symbol === match.params.symbol,
      )
    : false;

  return (
    <>
      <NormalText>
        <h2>{match.params.symbol}</h2>

        <SubmitButton
          onClick={() =>
            mutation.mutate({
              symbol: match.params.symbol,
              follow: isFollowingStock,
            })
          }
          label={isFollowingStock ? 'フォロー解除' : 'フォローする'}
          disabled={false}
          isLoading={mutation.isLoading}
        />
      </NormalText>
      <GetStockPrice symbol={match.params.symbol} />
      {/* <Earnings symbol={match.params.symbol} /> */}
    </>
  );
};

export default StockBoard;
