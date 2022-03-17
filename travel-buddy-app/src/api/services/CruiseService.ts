import { AxiosResponse } from 'axios';
import { axiosWithHeader } from '../axios';
import { getCruisesUrl, getCruisesByIdUrl } from '../routes';
import { CruiseRequest, Cruise, Cruises } from '../types';

class CruiseService {
  async getCruises(token: string) {
    const request: AxiosResponse<Cruises> = await axiosWithHeader(token).get(getCruisesUrl());
    const { data } = request;
    if (!Cruises.is(data)) {
      throw new Error('Malformed response from getCruises.');
    }
    return request.data;
  }

  async createCruise(requestBody: CruiseRequest, token: string) {
    const request: AxiosResponse<Cruise> = await axiosWithHeader(token).post(getCruisesUrl(), requestBody);
    const { data } = request;
    if (!Cruise.is(data)) {
      throw new Error('Malformed response from createCruises.');
    }
    return request.data;
  }

  async getCruiseById(id: number, token: string) {
    const request: AxiosResponse<Cruise> = await axiosWithHeader(token).get(getCruisesByIdUrl(id));
    const { data } = request;
    if (!Cruise.is(data)) {
      throw new Error('Malformed response from getCruiseById.');
    }
    return request.data;
  }

  async updateCruise(cruise: CruiseRequest, id: number, token: string) {
    const request: AxiosResponse<Cruise> = await axiosWithHeader(token).post(getCruisesByIdUrl(id), cruise);
    const { data } = request;
    if (!Cruise.is(data)) {
      throw new Error('Malformed response from updateCruise.');
    }
    return request.data;
  }

  async deleteCruise(id: number, token: string) {
    const request: AxiosResponse<Cruise> = await axiosWithHeader(token).post(getCruisesByIdUrl(id));
    const { data } = request;
    if (!Cruise.is(data)) {
      throw new Error('Malformed response from deleteCruise.');
    }
    return request.data;
  }
}

export default new CruiseService();
