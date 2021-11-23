import { FC } from 'react';
import { Tooltip, IconButton } from '@mui/material';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness3Icon from '@mui/icons-material/Brightness3';

type TypeProps = {
  darkMode: boolean;
  handleDarkModeOn: () => void;

  handleDarkModeOff: () => void;
};

const DarkButton: FC<TypeProps> = ({ ...Props }) => {
  const { darkMode, handleDarkModeOn, handleDarkModeOff } = { ...Props };

  return (
    <>
      {darkMode ? (
        <Tooltip
          disableFocusListener
          disableTouchListener
          title="ダークモードをやめるのです"
        >
          <IconButton color="default" onClick={handleDarkModeOff}>
            <Brightness5Icon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip
          disableFocusListener
          disableTouchListener
          title="ダークモードはいいぞ"
        >
          <IconButton color="default" onClick={handleDarkModeOn}>
            <Brightness3Icon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default DarkButton;
