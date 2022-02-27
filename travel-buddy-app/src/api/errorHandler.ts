import axios, { AxiosError } from 'axios';
import { axiosErrorHandler } from './axios';

export function handleError(err: any, callback?: (message: string) => void) {
  const error = err as Error | AxiosError;
  if (axios.isAxiosError(error)) {
    axiosErrorHandler(error, callback ? (msg) => callback(msg) : undefined);
  } else {
    console.error(err);
  }
}
