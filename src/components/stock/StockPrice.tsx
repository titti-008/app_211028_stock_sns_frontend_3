import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Tooltip, Typography, Fade } from '@mui/material';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import { format } from 'date-fns';
import { Stock } from '../Types';
import { useColors } from '../../hooks/useColors';
import signCheck from '../../utils/signCheck';

const StockPrice: FC<{ stock: Stock }> = ({ stock }) => {
  const colors = useColors();

  const fluctuation =
    ((stock.price - stock.previousClose) / stock.previousClose) * 100;

  const isUp = Math.sign(fluctuation) >= 0;

  return (
    <>
      <Tooltip
        disableFocusListener
        disableTouchListener
        disableInteractive
        TransitionComponent={Fade}
        enterDelay={0}
        title={
          <Grid>
            <Typography sx={{ color: 'white' }}>社名: {stock.name}</Typography>
            <Typography sx={{ color: 'white' }}>
              前日終値: {stock.previousClose}
            </Typography>

            <Typography sx={{ color: 'white' }}>
              現在値: {stock.price}
            </Typography>
            <Typography sx={{ color: 'white' }}>
              次回決算発表:{' '}
              {stock.earningsAnnouncement
                ? format(new Date(stock.earningsAnnouncement), 'yyyy/MM/dd')
                : '-'}
            </Typography>
          </Grid>
        }
      >
        <Link to={`/stocks/${stock.symbol}/1000`}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: colors.text,
              borderColor: isUp
                ? colors.chart.upBorderColor
                : colors.chart.downBorderColor,
              margin: '10px 3px',
              height: '30px',
            }}
          >
            <h3 style={{ color: colors.text }}>
              {stock.symbol}
              {}{' '}
            </h3>
            {isUp ? (
              <ArrowUpwardOutlinedIcon
                fontSize="small"
                style={{ color: colors.chart.upBorderColor }}
              />
            ) : (
              <ArrowDownwardOutlinedIcon
                fontSize="small"
                style={{ color: colors.chart.downBorderColor }}
              />
            )}
            <h3
              style={{
                color: isUp
                  ? colors.chart.upBorderColor
                  : colors.chart.downBorderColor,
              }}
            >
              {signCheck(fluctuation, 2)}%
            </h3>
          </Button>
        </Link>
      </Tooltip>
    </>
  );
};

export default StockPrice;
