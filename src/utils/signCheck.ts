const signCheck = (value: number, range: number) => {
  const fixedValue = value.toFixed(range);

  return Math.sign(value) >= 0 ? `+${fixedValue}` : fixedValue;
};

export default signCheck;
