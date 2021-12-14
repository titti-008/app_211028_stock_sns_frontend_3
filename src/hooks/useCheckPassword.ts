const useCheckPassword = (password: string, confirmation: string) => {
  // 数字、大文字英字、小文字英字を少なくとも1つ以上含み8~24文字である正規表現
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{8,24}$/;

  const notMatchRegex = !regex.test(password);
  const isBlank = password.length === 0;
  const notMatch = password !== confirmation;
  const isPassError = notMatchRegex || notMatch;
  const isDisablePassword = isPassError || isBlank;
  const passErrorMessage = notMatchRegex
    ? '数字、大文字英字、小文字英字を少なくとも1つ以上含む8~24字にしてください'
    : 'パスワードが一致しません。';

  return { isPassError, passErrorMessage, isDisablePassword };
};

export default useCheckPassword;
