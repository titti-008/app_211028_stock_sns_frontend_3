import { FC } from 'react';
import { Grid, Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { NormalText } from './PrivateTexts';
import { useColors } from '../../hooks/useColors';

type SubmitType<T> = {
  onClick: (props?: T) => void;
  label: string;
  disabled: boolean;
  isLoading: boolean;
};

export const SubmitButton = ({
  onClick,
  label,
  disabled,
  isLoading,
}: SubmitType<React.MouseEvent<HTMLButtonElement, MouseEvent>>) => {
  const colors = useColors();

  return (
    <Grid item>
      <Button
        onClick={onClick}
        variant="outlined"
        sx={{ color: colors.text, borderColor: colors.text }}
        disabled={isLoading || disabled}
      >
        {isLoading ? (
          <CircularProgress sx={{ fontSize: 'small' }} />
        ) : (
          <NormalText>{label}</NormalText>
        )}
      </Button>
    </Grid>
  );
};

type LinkType = {
  linkTo: string;
  label: string;
  disabled: boolean;
};

export const LinkButton: FC<LinkType> = ({ linkTo, label, disabled }) => {
  const colors = useColors();

  return (
    <Grid item>
      <Link to={linkTo}>
        <Button
          variant="outlined"
          sx={{
            color: colors.text,
            borderColor: colors.text,
            margin: '10px 0',
          }}
          disabled={disabled}
        >
          <NormalText>{label}</NormalText>
        </Button>
      </Link>
    </Grid>
  );
};

type TextButtonType = {
  linkTo: string;
  children: React.ReactNode;
  size: 'small' | 'large' | 'medium' | undefined;
};

export const TextButton: FC<TextButtonType> = ({ linkTo, children, size }) => {
  const colors = useColors();

  return (
    <Link to={linkTo}>
      <Button
        variant="text"
        size={size}
        sx={{
          color: colors.text,
          borderColor: colors.text,
          margin: '10px 0',
        }}
      >
        {children}
      </Button>
    </Link>
  );
};
