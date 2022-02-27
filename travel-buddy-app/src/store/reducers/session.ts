import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginSuccessResponse, User } from '../../api';

export interface SessionState {
  isAuthenticated: boolean;
  token?: string;
  user?: User;
}

const initialState: SessionState = {
  isAuthenticated: false,
};

export const SessionSlice = createSlice({
  name: 'Session',
  initialState,
  reducers: {
    reset: () => initialState,
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setLogin: (state, action: PayloadAction<LoginSuccessResponse>) => {
      state.isAuthenticated = true;
      state.token = action.payload.accessToken;
      state.user = {
        id: action.payload.id,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        roles: action.payload.roles,
      };
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { reset, setIsAuthenticated, setLogin, setToken, setUser } = SessionSlice.actions;

export default SessionSlice.reducer;
