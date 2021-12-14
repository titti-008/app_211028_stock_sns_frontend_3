import { RouteComponentProps } from 'react-router-dom';
import { ErrorResponse } from '../Types';
import { ResetPassword } from '../api';
import { SuccessToasts, ErrorToasts } from '../toast/PrivateToast';
import { NormalForm } from '../privateMUI/PrivateForms';
import { SubmitButton } from '../privateMUI/PrivateBottuns';
import { NormalText } from '../privateMUI/PrivateTexts';
import useUserDataInput from '../../hooks/useDataInput';
import useCheckPassword from '../../hooks/useCheckPassword';

type Props = {
  id: string;
  email: string;
};
/* eslint-disable */

const ResetPasswordForm: React.FC<RouteComponentProps<Props>> = ({
  ...props
}) => {
  const initInput = {
    password: '',
    passwordConfirmation: '',
  };

  const { values, handleChange } = useUserDataInput(initInput);
  const { isPassError, passErrorMessage, isDisablePassword } = useCheckPassword(
    values.password,
    values.passwordConfirmation,
  );

  const userData = {
    id: Number(props.match.params.id),
    email: decodeURIComponent(props.match.params.email),
    ...values,
  };

  const handleResetPassword = async () => {
    try {
      const response = await ResetPassword(userData);

      if (response.status === 200) {
        SuccessToasts(response.data.messages);
        props.history.push('/current_user');
      } else if (response.status === 202) {
        ErrorToasts(response.data.messages);
      }
    } catch (err) {
      if ((err as ErrorResponse).response !== undefined)
        console.log('パスワード変更失敗');
      console.log((err as ErrorResponse).response);
      ErrorToasts([
        'ユーザー登録に失敗しました。',
        'データサーバーとの接続に問題がある可能性があります。',
      ]);
    }
  };

  return (
    <>
      <NormalText>パスワード再設定</NormalText>
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
        onClick={handleResetPassword}
        label="パスワード変更"
        disabled={isDisablePassword}
        isLoading={false}
      />
    </>
  );
};

export default ResetPasswordForm;
