import { AxiosResponse } from 'axios';
import { axiosWithHeader } from '../axios';
import { getFlightsUrl, getFlightsByIdUrl } from '../routes';
import { FlightRequest, Flight, Flights } from '../types';

class FlightService {
  async getFlights(token: string) {
    const request: AxiosResponse<Flights> = await axiosWithHeader(token).get(getFlightsUrl());
    const { data } = request;
    if (!Flights.is(data)) {
      throw new Error('Malformed response from getFlights.');
    }
    return request.data;
  }

  async createFlight(requestBody: FlightRequest, token: string) {
    const request: AxiosResponse<Flight> = await axiosWithHeader(token).post(getFlightsUrl(), requestBody);
    const { data } = request;
    if (!Flight.is(data)) {
      throw new Error('Malformed response from createFlights.');
    }
    return request.data;
  }

  async getFlightById(id: number, token: string) {
    const request: AxiosResponse<Flight> = await axiosWithHeader(token).get(getFlightsByIdUrl(id));
    const { data } = request;
    if (!Flight.is(data)) {
      throw new Error('Malformed response from getFlightById.');
    }
    return request.data;
  }

  async updateFlight(flight: FlightRequest, id: number, token: string) {
    const request: AxiosResponse<Flight> = await axiosWithHeader(token).post(getFlightsByIdUrl(id), flight);
    const { data } = request;
    if (!Flight.is(data)) {
      throw new Error('Malformed response from updateFlight.');
    }
    return request.data;
  }

  async deleteFlight(id: number, token: string) {
    const request: AxiosResponse<Flight> = await axiosWithHeader(token).post(getFlightsByIdUrl(id));
    const { data } = request;
    if (!Flight.is(data)) {
      throw new Error('Malformed response from deleteFlight.');
    }
    return request.data;
  }
}

export default new FlightService();
