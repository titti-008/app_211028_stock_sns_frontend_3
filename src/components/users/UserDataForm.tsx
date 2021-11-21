import React from 'react';
import { CreateUserType } from '../Types';
import { NormalForm } from '../privateMUI/PrivateForms';
import { SubmitButton } from '../privateMUI/PrivateBottuns';
import {
  useCheckPassword,
  useCheckName,
  useCheckEmail,
} from '../../hooks/util';

type PropsType = {
  values: CreateUserType;
  handleChange: (
    key: keyof CreateUserType,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  submitLabel: string;
};

const UserDataForm: React.FC<PropsType> = ({
  values,
  handleChange,
  onClick,
  submitLabel,
}) => {
  const { isNameError, nameErrorMessage, isDisableName } = useCheckName(
    values.name,
  );
  const { isEmailError, emailErrorMessage, isDisableEmail } = useCheckEmail(
    values.email,
  );
  const { isPassError, passErrorMessage, isDisablePassword } = useCheckPassword(
    values.password,
    values.passwordConfirmation,
  );

  const isDisable = isDisableName || isDisablePassword || isDisableEmail;

  return (
    <>
      <NormalForm
        value={values.name}
        handleChange={handleChange('name')}
        label="name"
        error={isNameError}
        isPassword={false}
        errorText={nameErrorMessage}
      />
      <NormalForm
        value={values.email}
        handleChange={handleChange('email')}
        label="Email"
        error={isEmailError}
        isPassword={false}
        errorText={emailErrorMessage}
      />
      <NormalForm
        value={values.password}
        handleChange={handleChange('password')}
        label="password"
        error={isPassError}
        isPassword
        errorText={passErrorMessage}
      />
      <NormalForm
        value={values.passwordConfirmation}
        handleChange={handleChange('passwordConfirmation')}
        label="password(確認用)"
        error={isPassError}
        isPassword
        errorText=""
      />
      <SubmitButton
        onClick={onClick}
        label={submitLabel}
        disabled={isDisable}
      />
    </>
  );
};

export default UserDataForm;

// /* eslint-disable */
// // const { currentUser, setCurrentUser, setIsLogin } = { ...props };
// /* eslint-disable */

/* eslint-disable */
/* eslint-disable */
