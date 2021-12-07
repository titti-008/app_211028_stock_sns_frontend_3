import { FC } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { EarningsResponse } from '../Types';
import { SubmitButton } from '../privateMUI/PrivateBottuns';
import { getEarnings, followStock } from '../api';
import PrivateLoading from '../privateMUI/PrivateLoading';
import { ErrorToasts } from '../toast/PrivateToast';
import EarningStatus from './EarningStatus';
import { NormalText } from '../privateMUI/PrivateTexts';

/* eslint-disable */
const Earnings: FC<{ symbol: string }> = ({ symbol }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(followStock, {
    onSuccess: (res) => {
      const prevData = queryClient.getQueryData<EarningsResponse>(
        `Earnings-${symbol}`,
      );
      if (prevData) {
        queryClient.setQueryData<EarningsResponse>(`Earnings-${symbol}`, {
          ...prevData,
          isFollowingStock: res.data.isFollowingStock,
        });
      }
    },
  });

  const { data, isLoading, isError, error } = useQuery<
    EarningsResponse,
    AxiosError
  >(`Earnings-${symbol}`, () => getEarnings(symbol));

  if (isLoading) {
    return <PrivateLoading />;
  }

  if (isError && error) {
    ErrorToasts([error.message]);
  }

  if (!data) {
    return <div>データがありません</div>;
  }

  const { stock, earnings, isFollowingStock } = data;

  if (!earnings || !stock) {
    return <div>データがありません</div>;
  }

  return (
    <>
      <NormalText>{stock.symbol}</NormalText>
      <SubmitButton
        onClick={() =>
          mutation.mutate({ symbol: stock.symbol, follow: !isFollowingStock })
        }
        label={isFollowingStock ? 'フォロー解除' : 'フォローする'}
        disabled={false}
        isLoading={mutation.isLoading}
      />

      {earnings.map((earning) => (
        <EarningStatus stock={stock} earning={earning} key={earning.id} />
      ))}
    </>
  );
};

export default Earnings;

/* eslint-disable */
