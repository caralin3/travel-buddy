import { AxiosResponse } from 'axios';
import { axiosWithHeader } from '../axios';
import { getActivitiesUrl, getActivitiesByIdUrl } from '../routes';
import { ActivityRequest, Activity, Activities } from '../types';

class ActivityService {
  async getActivities(token: string) {
    const request: AxiosResponse<Activities> = await axiosWithHeader(token).get(getActivitiesUrl());
    const { data } = request;
    if (!Activities.is(data)) {
      throw new Error('Malformed response from getActivities.');
    }
    return request.data;
  }

  async createActivity(requestBody: ActivityRequest, token: string) {
    const request: AxiosResponse<Activity> = await axiosWithHeader(token).post(getActivitiesUrl(), requestBody);
    const { data } = request;
    if (!Activity.is(data)) {
      throw new Error('Malformed response from createActivities.');
    }
    return request.data;
  }

  async getActivityById(id: number, token: string) {
    const request: AxiosResponse<Activity> = await axiosWithHeader(token).get(getActivitiesByIdUrl(id));
    const { data } = request;
    if (!Activity.is(data)) {
      throw new Error('Malformed response from getActivityById.');
    }
    return request.data;
  }

  async updateActivity(activity: ActivityRequest, id: number, token: string) {
    const request: AxiosResponse<Activity> = await axiosWithHeader(token).post(getActivitiesByIdUrl(id), activity);
    const { data } = request;
    if (!Activity.is(data)) {
      throw new Error('Malformed response from updateActivity.');
    }
    return request.data;
  }

  async deleteActivity(id: number, token: string) {
    const request: AxiosResponse<Activity> = await axiosWithHeader(token).post(getActivitiesByIdUrl(id));
    const { data } = request;
    if (!Activity.is(data)) {
      throw new Error('Malformed response from deleteActivity.');
    }
    return request.data;
  }
}

export default new ActivityService();
