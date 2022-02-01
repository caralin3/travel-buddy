import axios, { AxiosResponse } from 'axios';
import { getTripsUrl, getTripsByIdUrl } from '../routes';
import { Trip, Trips } from '../types';

class TripService {
  async getTrips() {
    const request: AxiosResponse<Trips> = await axios.get(getTripsUrl());
    const { data } = request;
    if (!Trips.is(data)) {
      throw new Error('Malformed response from getTrips.');
    }
    return request.data;
  }

  async createTrip(trip: Trip) {
    const request: AxiosResponse<Trip> = await axios.post(getTripsUrl(), trip);
    const { data } = request;
    if (!Trip.is(data)) {
      throw new Error('Malformed response from createTrips.');
    }
    return request.data;
  }

  async getTripById(id: number) {
    const request: AxiosResponse<Trip> = await axios.get(getTripsByIdUrl(id));
    const { data } = request;
    if (!Trip.is(data)) {
      throw new Error('Malformed response from getTripById.');
    }
    return request.data;
  }

  async updateTrip(trip: Trip, id: number) {
    const request: AxiosResponse<Trip> = await axios.post(getTripsByIdUrl(id), trip);
    const { data } = request;
    if (!Trip.is(data)) {
      throw new Error('Malformed response from updateTrip.');
    }
    return request.data;
  }

  async deleteTrip(id: number) {
    const request: AxiosResponse<Trip> = await axios.post(getTripsByIdUrl(id));
    const { data } = request;
    if (!Trip.is(data)) {
      throw new Error('Malformed response from deleteTrip.');
    }
    return request.data;
  }
}

export default new TripService();
