import { Theme, useTheme } from '@mui/material';

type ColorsType = {
  baseGround: string;
  baseSheet: string;
  paper: string;
  header: string;
  text: string;
  errorText: string;
  icon: string;
  chart: {
    upColor: string;
    upBorderColor: string;
    downColor: string;
    downBorderColor: string;
    borderColor: string;
  };
};

export const Colors = (theme: Theme): ColorsType => {
  // ダークモードのとき
  const colors = {
    baseGround: '#262F40',
    baseSheet: '#293345',
    paper: '#34373B',
    header: '#192f60',
    text: '#D4DEFC',
    errorText: '#E04E27',
    icon: '#99BDFF',
    chart: {
      upColor: '#005C3C',
      upBorderColor: 'lightgreen',
      downColor: '#786060',
      downBorderColor: 'red',
      borderColor: '#9096AB',
    },
  };

  if (theme.palette?.mode === 'light') {
    // lightモードのとき
    colors.baseGround = '#BDC6DE';
    colors.baseSheet = '#DFE6ED';
    colors.paper = '#DBE7F5';
    colors.header = '#F6FFFF';
    colors.text = '#3C4A63';
    colors.errorText = '#E04E27';
    colors.icon = '#85A4DE';

    colors.chart.upColor = '#00da3c';
    colors.chart.upBorderColor = '#008F28';
    colors.chart.downColor = '#e3b5b5';
    colors.chart.downBorderColor = '#AA362A';
    colors.chart.borderColor = '#6B84B0';
  }

  return colors;
};

export const useColors = () => {
  const theme = useTheme();

  return Colors(theme);
};
