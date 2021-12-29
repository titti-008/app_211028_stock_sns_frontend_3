import { FC } from 'react';
import { Grid, IconButton, Divider, CircularProgress } from '@mui/material';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { NormalText } from './PrivateTexts';
import { useAppContext } from '../../hooks/ReduserContext';

type LinkPropsType = {
  linkTo: string;
  linkText: string;
};

export const LinkContainer: FC<LinkPropsType> = (_props) => {
  const props = _props;

  return (
    <Grid item sx={{ width: '100%' }}>
      <Link to={props.linkTo}>
        <Grid
          container
          direction="row"
          justifyContent="start"
          alignItems="center"
          wrap="nowrap"
        >
          <IconButton color="default">
            <Grid item>{props.children}</Grid>
          </IconButton>
          <Grid item xs sx={{ width: '100%' }}>
            <NormalText>{props.linkText}</NormalText>
          </Grid>
        </Grid>
        <Divider sx={{ width: '100%' }} />
      </Link>
    </Grid>
  );
};

type ButtonPropsType = {
  handleAction: React.MouseEventHandler<HTMLDivElement>;
  linkText: string;
  isLoading: boolean;
};

export const ButtonContainer: FC<ButtonPropsType> = ({
  handleAction,
  linkText,
  isLoading,
  children,
}) => (
  <Grid item width="100%" sx={{ cursor: 'pointer' }} onClick={handleAction}>
    <Grid
      container
      direction="row"
      justifyContent="start"
      alignItems="center"
      wrap="nowrap"
      width="100"
    >
      <IconButton color="default">
        <Grid item>
          {isLoading ? <CircularProgress size="20px" /> : children}
        </Grid>
      </IconButton>
      <Grid item xs sx={{ width: '100%' }}>
        <NormalText>{linkText}</NormalText>
      </Grid>
    </Grid>
    <Divider sx={{ width: '100%' }} />
  </Grid>
);

export const DarkButtonContainer = () => {
  const { dispatch } = useAppContext();
  const theme = useTheme();

  return (
    <>
      {theme.palette.mode === 'dark' ? (
        <ButtonContainer
          handleAction={() => dispatch({ type: 'setLightMode' })}
          linkText="Lightモードに切り替える"
          isLoading={false}
        >
          <Brightness5Icon />
        </ButtonContainer>
      ) : (
        <ButtonContainer
          handleAction={() => dispatch({ type: 'setDarkMode' })}
          linkText="Darkモードに切り替える"
          isLoading={false}
        >
          <Brightness3Icon />
        </ButtonContainer>
      )}
    </>
  );
};
