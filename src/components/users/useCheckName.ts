const useCheckName = (name: string) => {
  const isLong = name.length > 20;
  const isBlank = name.length === 0;
  const isNameError = isLong || isBlank;
  const isDisableName = isNameError || isBlank;
  const nameErrorMessage = isLong
    ? '名前は20文字以内にしてください'
    : '名前を入力してください';

  return { isNameError, nameErrorMessage, isDisableName };
};

export default useCheckName;
