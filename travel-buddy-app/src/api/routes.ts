import config from '../config';

export const BASE_URL = `${config.apiUrl}/api/${config.apiVersion}`;

export const getRegisterUrl = () => `${BASE_URL}/auth/register`;
export const getLoginUrl = () => `${BASE_URL}/auth/login`;

export const getTripsUrl = () => `${BASE_URL}/trips`;
export const getTripsByIdUrl = (id: number) => `/trips/${id}`;
