import axios, { AxiosError } from 'axios';
import { BASE_URL } from './routes';
import { GenericErrorResponse } from './types';

export const axiosWithHeader = (token: string) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export function axiosErrorHandler(error: AxiosError, callback?: (msg: string) => void) {
  // do what you want with your axios error
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (GenericErrorResponse.is(error.response.data)) {
      console.error(error.response.data.message);
      if (callback) {
        callback(error.response.data.message);
      }
    }
    // console.log('status', error.response.status);
    // console.log('headers', error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error('request', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error', error.message);
  }
  // console.error('config', error.config);
}
