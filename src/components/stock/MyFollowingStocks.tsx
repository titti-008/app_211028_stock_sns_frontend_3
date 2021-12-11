import { FC } from 'react';
import { LinkButton } from '../privateMUI/PrivateBottuns';
import { NormalText } from '../privateMUI/PrivateTexts';
import { useAppContext } from '../../hooks/ReduserContext';

/* eslint-disable */

const MyFollowingStocks: FC = () => {
  const { state } = useAppContext();

  return (
    <>
      <NormalText>フォローしている株式</NormalText>
      {state.currentUser?.followingStocks?.map((stock) => (
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
