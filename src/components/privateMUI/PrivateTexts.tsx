import { FC } from 'react';
import { Typography } from '@mui/material';

import { useColors } from '../../hooks/util';

export const NormalText: FC = ({ ...props }) => {
  const colors = useColors();

  const { children } = props;

  return (
    <Typography
      style={{ overflowWrap: 'break-word', margin: '0px' }}
      sx={{ color: colors.text }}
      /* eslint-disable */
      {...props}
      /* eslint-disable */
    >
      {children}
    </Typography>
  );
};

export const ErrorText: FC = ({ children }) => {
  const colors = useColors();

  return (
    <Typography
      sx={{ color: colors.text }}
      style={{ overflowWrap: 'break-word' }}
    >
      {children}
    </Typography>
  );
};
