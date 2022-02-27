import { LoginRequest } from '../api';
import AuthService from '../api/services/AuthService';

export const login = async (loginRequest: LoginRequest) => AuthService.loginUser(loginRequest);
