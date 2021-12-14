import { FC, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  FormControl,
  InputLabel,
  Input,
  IconButton,
  Grid,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import { useColors } from '../../hooks/useColors';

type PropsType = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  error: boolean;
  errorText: string;
  isPassword: boolean;
};

export const NormalForm: FC<PropsType> = (_props) => {
  const props = _props;

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid item sx={{ width: '100%' }}>
      <FormControl variant="standard" margin="normal" fullWidth>
        <InputLabel>{props.label}</InputLabel>
        <Input
          error={props.error}
          type={showPassword || !props.isPassword ? 'text' : 'password'}
          value={props.value}
          onChange={props.handleChange}
          endAdornment={
            props.isPassword ? (
              <IconButton
                aria-label="toggle password bisibality"
                onClick={handleShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ) : (
              <></>
            )
          }
        />
        {props.error ? (
          <FormHelperText id="component-error-text">
            {props.errorText}
          </FormHelperText>
        ) : (
          <></>
        )}
      </FormControl>
    </Grid>
  );
};

type CheckBoxProps = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RememberCheckBox: FC<CheckBoxProps> = (_props) => {
  const props = _props;
  const colors = useColors();

  return (
    <FormControlLabel
      label="ログインしたままにする"
      control={
        <Checkbox
          onChange={props.handleChange}
          sx={{
            color: colors.text,
            '&.Mui-checked': {
              color: colors.text,
            },
          }}
        />
      }
      sx={{ color: colors.text }}
    />
  );
};
