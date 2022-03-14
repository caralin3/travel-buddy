import { AxiosResponse } from 'axios';
import { axiosWithHeader } from '../axios';
import { getTripsUrl, getTripsByIdUrl } from '../routes';
import { TripRequest, Trip, Trips } from '../types';

class TripService {
  async getTrips(token: string) {
    const request: AxiosResponse<Trips> = await axiosWithHeader(token).get(getTripsUrl());
    const { data } = request;
    if (!Trips.is(data)) {
      throw new Error('Malformed response from getTrips.');
    }
    return request.data;
  }

  async createTrip(requestBody: TripRequest, token: string) {
    const request: AxiosResponse<Trip> = await axiosWithHeader(token).post(getTripsUrl(), requestBody);
    const { data } = request;
    if (!Trip.is(data)) {
      throw new Error('Malformed response from createTrips.');
    }
    return request.data;
  }

  async getTripById(id: number, token: string) {
    const request: AxiosResponse<Trip> = await axiosWithHeader(token).get(getTripsByIdUrl(id));
    const { data } = request;
    if (!Trip.is(data)) {
      throw new Error('Malformed response from getTripById.');
    }
    return request.data;
  }

  async updateTrip(trip: Trip, id: number, token: string) {
    const request: AxiosResponse<Trip> = await axiosWithHeader(token).post(getTripsByIdUrl(id), trip);
    const { data } = request;
    if (!Trip.is(data)) {
      throw new Error('Malformed response from updateTrip.');
    }
    return request.data;
  }

  async deleteTrip(id: number, token: string) {
    const request: AxiosResponse<Trip> = await axiosWithHeader(token).post(getTripsByIdUrl(id));
    const { data } = request;
    if (!Trip.is(data)) {
      throw new Error('Malformed response from deleteTrip.');
    }
    return request.data;
  }
}

export default new TripService();
