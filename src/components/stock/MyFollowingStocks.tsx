import { FC } from 'react';
import { useQueryClient } from 'react-query';
import { LoginResponse } from '../Types';
import { LinkButton } from '../privateMUI/PrivateBottuns';
import { NormalText } from '../privateMUI/PrivateTexts';

/* eslint-disable */

const MyFollowingStocks: FC = () => {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<LoginResponse>(`loginData`);

  return (
    <>
      <NormalText>フォローしている株式</NormalText>
      {userData?.user?.followingStocks?.map((stock) => (
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

/* eslint-disable */
