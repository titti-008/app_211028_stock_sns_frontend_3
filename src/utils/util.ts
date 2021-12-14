import { AxiosError } from 'axios';

export const range = (start: number, end: number): Array<number> =>
  [...Array<number>(end - start).keys()].map((n) => n + start);

export function isAxiosError(error: AxiosError): error is AxiosError {
  return !!error.isAxiosError;
}
