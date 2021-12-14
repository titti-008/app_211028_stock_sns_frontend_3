import { useState } from 'react';
import { CreateUserType } from '../components/Types';

const useUserDataInput = <T>(initInput: T) => {
  const [values, setvalues] = useState(initInput);

  const handleChange =
    (key: keyof CreateUserType) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setvalues({ ...values, [key]: event.target.value });
    };

  return { values, handleChange };
};

export default useUserDataInput;
