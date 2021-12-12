import { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { Tooltip, IconButton } from '@mui/material';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import { useAppContext } from '../../hooks/ReduserContext';
// type TypeProps = {
//   darkMode: boolean;
//   handleDarkModeOn: () => void;

//   handleDarkModeOff: () => void;
// };

const DarkButton: FC = () => {
  const { dispatch } = useAppContext();
  const theme = useTheme();

  return (
    <>
      {theme.palette.mode === 'dark' ? (
        <Tooltip
          disableFocusListener
          disableTouchListener
          title="ダークモードをやめるのです"
        >
          <IconButton
            color="default"
            onClick={() => dispatch({ type: 'setLightMode' })}
          >
            <Brightness5Icon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip
          disableFocusListener
          disableTouchListener
          title="ダークモードはいいぞ"
        >
          <IconButton
            color="default"
            onClick={() => dispatch({ type: 'setDarkMode' })}
          >
            <Brightness3Icon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default DarkButton;
