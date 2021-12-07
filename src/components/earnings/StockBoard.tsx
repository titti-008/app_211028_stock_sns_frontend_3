import { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Earnings from './Earnings';
import GetStockPrice from './GetStockPrice';
import { NormalText } from '../privateMUI/PrivateTexts';

const StockBoard: FC<RouteComponentProps<{ symbol: string }>> = ({ match }) => (
  <>
    <NormalText>
      <h2>{match.params.symbol}</h2>
    </NormalText>
    <GetStockPrice symbol={match.params.symbol} />
    <Earnings symbol={match.params.symbol} />
  </>
);

export default StockBoard;
