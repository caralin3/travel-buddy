import { AxiosResponse } from 'axios';
import { axiosWithHeader } from '../axios';
import { getHotelsUrl, getHotelsByIdUrl } from '../routes';
import { HotelRequest, Hotel, Hotels } from '../types';

class HotelService {
  async getHotels(token: string) {
    const request: AxiosResponse<Hotels> = await axiosWithHeader(token).get(getHotelsUrl());
    const { data } = request;
    if (!Hotels.is(data)) {
      throw new Error('Malformed response from getHotels.');
    }
    return request.data;
  }

  async createHotel(requestBody: HotelRequest, token: string) {
    const request: AxiosResponse<Hotel> = await axiosWithHeader(token).post(getHotelsUrl(), requestBody);
    const { data } = request;
    if (!Hotel.is(data)) {
      throw new Error('Malformed response from createHotels.');
    }
    return request.data;
  }

  async getHotelById(id: number, token: string) {
    const request: AxiosResponse<Hotel> = await axiosWithHeader(token).get(getHotelsByIdUrl(id));
    const { data } = request;
    if (!Hotel.is(data)) {
      throw new Error('Malformed response from getHotelById.');
    }
    return request.data;
  }

  async updateHotel(hotel: HotelRequest, id: number, token: string) {
    const request: AxiosResponse<Hotel> = await axiosWithHeader(token).post(getHotelsByIdUrl(id), hotel);
    const { data } = request;
    if (!Hotel.is(data)) {
      throw new Error('Malformed response from updateHotel.');
    }
    return request.data;
  }

  async deleteHotel(id: number, token: string) {
    const request: AxiosResponse<Hotel> = await axiosWithHeader(token).post(getHotelsByIdUrl(id));
    const { data } = request;
    if (!Hotel.is(data)) {
      throw new Error('Malformed response from deleteHotel.');
    }
    return request.data;
  }
}

export default new HotelService();
