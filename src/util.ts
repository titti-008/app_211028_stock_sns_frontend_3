import { Theme } from '@mui/material';

const Colors = (theme: Theme) => {
  const colors = {
    baseGround: '#262F40',
    baseSheet: '#38455D',
    header: '#192f60',
    text: 'white',
    icon: '#99BDFF',
  };

  if (theme.palette.mode === 'light') {
    colors.baseGround = '#D0D8F5';
    colors.baseSheet = '#C1C9DE';
    colors.header = '#A3ACBF';
    colors.text = '#516487';
    colors.icon = '#85A4DE';
  }

  return colors;
};

export default Colors;
