import { FC } from 'react';
import { Typography } from '@mui/material';

import { useColors } from '../../hooks/util';

export const NormalText: FC = ({ children }) => {
  const colors = useColors();

  return (
    <Typography
      style={{ overflowWrap: 'anywhere', margin: '0px' }}
      sx={{ color: colors.text }}
    >
      {children}
    </Typography>
  );
};

type PropsType = {
  children: React.ReactNode;
  isError: boolean;
};

export const ErrorText: FC<PropsType> = ({ children, isError }) => {
  const colors = useColors();

  return (
    <Typography
      sx={{ color: isError ? colors.errorText : colors.text }}
      style={{ overflowWrap: 'break-word' }}
    >
      {children}
    </Typography>
  );
};
