import { FC, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, InputLabel, Input, IconButton } from '@mui/material';
// import { CreateUserType } from '../Types';

type PropsType = {
  password: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const PasswordForm: FC<PropsType> = (_props: PropsType) => {
  // const { password, handleChange } = { ...props };
  const props = _props;

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl variant="standard" margin="normal">
      <InputLabel>Password</InputLabel>
      <Input
        type={showPassword ? 'text' : 'password'}
        value={props.password}
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
  );
};

export default PasswordForm;
