import axios, { AxiosError } from 'axios';
import { axiosErrorHandler } from './axios';

export function handleError(err: any, callback?: () => void) {
  const error = err as Error | AxiosError;
  if (axios.isAxiosError(error)) {
    axiosErrorHandler(error, callback);
  } else {
    console.error(err);
  }
}
