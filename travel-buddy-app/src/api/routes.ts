import config from '../config';

export const BASE_URL = `${config.apiUrl}/api/${config.apiVersion}`;

export const getRegisterUrl = () => `${BASE_URL}/auth/register`;
export const getLoginUrl = () => `${BASE_URL}/auth/login`;

export const getTripsUrl = () => `${BASE_URL}/trips`;
export const getTripsByIdUrl = (id: number) => `/trips/${id}`;

export const getFlightsUrl = () => `${BASE_URL}/flights`;
export const getFlightsByIdUrl = (id: number) => `/flights/${id}`;

export const getCruisesUrl = () => `${BASE_URL}/cruises`;
export const getCruisesByIdUrl = (id: number) => `/cruises/${id}`;

export const getPortsUrl = () => `${BASE_URL}/ports`;
export const getPortsByIdUrl = (id: number) => `/ports/${id}`;

export const getHotelsUrl = () => `${BASE_URL}/hotels`;
export const getHotelsByIdUrl = (id: number) => `/hotels/${id}`;

export const getActivitiesUrl = () => `${BASE_URL}/activities`;
export const getActivitiesByIdUrl = (id: number) => `/activities/${id}`;
