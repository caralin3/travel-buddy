import { AxiosResponse } from 'axios';
import { axiosWithHeader } from '../axios';
import { getPortsUrl, getPortsByIdUrl } from '../routes';
import { PortRequest, Port, Ports } from '../types';

class PortService {
  async getPorts(token: string) {
    const request: AxiosResponse<Ports> = await axiosWithHeader(token).get(getPortsUrl());
    const { data } = request;
    if (!Ports.is(data)) {
      throw new Error('Malformed response from getPorts.');
    }
    return request.data;
  }

  async createPort(requestBody: PortRequest, token: string) {
    const request: AxiosResponse<Port> = await axiosWithHeader(token).post(getPortsUrl(), requestBody);
    const { data } = request;
    if (!Port.is(data)) {
      throw new Error('Malformed response from createPorts.');
    }
    return request.data;
  }

  async getPortById(id: number, token: string) {
    const request: AxiosResponse<Port> = await axiosWithHeader(token).get(getPortsByIdUrl(id));
    const { data } = request;
    if (!Port.is(data)) {
      throw new Error('Malformed response from getPortById.');
    }
    return request.data;
  }

  async updatePort(port: PortRequest, id: number, token: string) {
    const request: AxiosResponse<Port> = await axiosWithHeader(token).post(getPortsByIdUrl(id), port);
    const { data } = request;
    if (!Port.is(data)) {
      throw new Error('Malformed response from updatePort.');
    }
    return request.data;
  }

  async deletePort(id: number, token: string) {
    const request: AxiosResponse<Port> = await axiosWithHeader(token).post(getPortsByIdUrl(id));
    const { data } = request;
    if (!Port.is(data)) {
      throw new Error('Malformed response from deletePort.');
    }
    return request.data;
  }
}

export default new PortService();
