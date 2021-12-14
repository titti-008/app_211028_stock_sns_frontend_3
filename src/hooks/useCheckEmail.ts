const useCheckEmail = (email: string) => {
  const isLong = email.length > 255;
  const isBlank = email.length === 0;
  const isEmailError = isLong || isBlank;
  const isDisableEmail = isEmailError || isBlank;
  const emailErrorMessage = isLong
    ? 'メールアドレスはは255文字以内のものしか使えません'
    : 'メールアドレスを入力してください';

  return { isEmailError, emailErrorMessage, isDisableEmail };
};

export default useCheckEmail;
