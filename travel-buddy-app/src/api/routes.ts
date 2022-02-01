import config from '../config';

export const BASE_URL = `${config.apiUrl}/api/${config.apiVersion}`;

export const getTripsUrl = () => `${BASE_URL}/trips`;
export const getTripsByIdUrl = (id: number) => `${BASE_URL}/trips/${id}`;
