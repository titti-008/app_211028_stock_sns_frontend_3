import { FC, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  FormControl,
  InputLabel,
  Input,
  IconButton,
  Grid,
} from '@mui/material';

type PropsType = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  // infoText: string;
};

export const PasswordForm: FC<PropsType> = (_props) => {
  const props = _props;

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid item sx={{ width: '100%' }}>
      {/* <NormalText>
        <p>{props.infoText}</p>
      </NormalText> */}
      <FormControl variant="standard" margin="normal">
        <InputLabel>{props.label}</InputLabel>
        <Input
          type={showPassword ? 'text' : 'password'}
          value={props.value}
          onChange={props.handleChange}
          endAdornment={
            <IconButton
              aria-label="toggle password bisibality"
              onClick={handleShowPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
        />
      </FormControl>
    </Grid>
  );
};

export const NormalForm: FC<PropsType> = (_props: PropsType) => {
  const props = _props;

  return (
    <Grid item sx={{ width: '100%' }}>
      {/* <NormalText>
        <p>{props.infoText}</p>
      </NormalText> */}
      <FormControl variant="standard" margin="normal">
        <InputLabel>{props.label}</InputLabel>
        <Input
          type="text"
          color="success"
          value={props.value}
          onChange={props.handleChange}
        />
      </FormControl>
    </Grid>
  );
};
