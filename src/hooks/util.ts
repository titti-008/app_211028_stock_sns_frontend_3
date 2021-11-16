import { Theme, useTheme } from '@mui/material';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

type ColorsType = {
  baseGround: string;
  baseSheet: string;
  paper: string;
  header: string;
  text: string;
  icon: string;
};

export const Colors = (theme: Theme): ColorsType => {
  // ダークモードのとき
  const colors = {
    baseGround: '#262F40',
    baseSheet: '#293345',
    paper: '#34373B',
    header: '#192f60',
    text: '#D4DEFC',
    icon: '#99BDFF',
  };

  if (theme.palette?.mode === 'light') {
    // lightモードのとき
    colors.baseGround = '#FCFCFC';
    colors.baseSheet = '#D1D9F0';
    colors.paper = '#D2DAEB';
    colors.header = '#BDC6DE';
    colors.text = '#3C4A63';
    colors.icon = '#85A4DE';
  }

  return colors;
};

export const useColors = () => {
  const theme = useTheme();

  return Colors(theme);
};

export const range = (start: number, end: number): Array<number> =>
  [...Array<number>(end - start).keys()].map((n) => n + start);

export const dateFormat = (date: Date): string => formatDistanceToNow(date);
