import axios, { AxiosResponse } from 'axios';
import { getLoginUrl, getRegisterUrl, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '..';

class AuthService {
  async registerUser(requestBody: RegisterRequest) {
    const res: AxiosResponse<RegisterResponse> = await axios.post(getRegisterUrl(), requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { data } = res;

    if (!RegisterResponse.is(data)) {
      throw new Error('Malformed response from registerUser.');
    }
    return res.data;
  }

  async loginUser(requestBody: LoginRequest) {
    const res: AxiosResponse<LoginResponse> = await axios.post(getLoginUrl(), requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { data } = res;

    if (!LoginResponse.is(data)) {
      throw new Error('Malformed response from loginUser.');
    }
    return res.data;
  }
}

export default new AuthService();
