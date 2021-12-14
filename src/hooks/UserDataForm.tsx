import React from 'react';
import { CreateUserType } from '../components/Types';
import { NormalForm } from '../components/privateMUI/PrivateForms';
import { SubmitButton } from '../components/privateMUI/PrivateBottuns';
import useCheckPassword from './useCheckPassword';
import useCheckName from '../components/users/useCheckName';
import useCheckEmail from './useCheckEmail';

type PropsType = {
  values: CreateUserType;
  handleChange: (
    key: keyof CreateUserType,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  submitLabel: string;
  PassWordAllowNull: boolean;
};

const UserDataForm: React.FC<PropsType> = ({
  values,
  handleChange,
  onClick,
  submitLabel,
  PassWordAllowNull,
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

  const isDisablePasswordNull = isDisableName || isDisableEmail;
  const isDisable = isDisableName || isDisableEmail || isDisablePassword;

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
        disabled={PassWordAllowNull ? isDisablePasswordNull : isDisable}
        isLoading={false}
      />
    </>
  );
};

export default UserDataForm;
