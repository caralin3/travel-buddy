import * as t from 'io-ts';

/* eslint-disable @typescript-eslint/no-redeclare */

export const GenericErrorResponse = t.interface({
  timestamp: t.string,
  code: t.number,
  status: t.string,
  message: t.string,
});
export type GenericErrorResponse = t.TypeOf<typeof GenericErrorResponse>;

export const RoleName = t.keyof({
  ROLE_ADMIN: null,
  ROLE_USER: null,
});

export const Role = t.interface({
  id: t.number,
  name: RoleName,
});

export const User = t.interface({
  email: t.string,
  firstName: t.string,
  id: t.number,
  lastName: t.string,
  roles: t.array(Role),
});
export type User = t.TypeOf<typeof User>;

export const RegisterRequest = t.interface({
  firstName: t.string,
  lastName: t.string,
  email: t.string,
  password: t.string,
});
export type RegisterRequest = t.TypeOf<typeof RegisterRequest>;

export const RegisterSuccessResponse = t.interface({
  id: t.number,
  firstName: t.string,
  lastName: t.string,
  email: t.string,
  roles: t.array(Role),
});
export type RegisterSuccessResponse = t.TypeOf<typeof RegisterSuccessResponse>;

export const RegisterResponse = t.union([RegisterSuccessResponse, GenericErrorResponse]);

export type RegisterResponse = t.TypeOf<typeof RegisterResponse>;

export const LoginRequest = t.interface({
  email: t.string,
  password: t.string,
});
export type LoginRequest = t.TypeOf<typeof LoginRequest>;

export const LoginSuccessResponse = t.interface({
  accessToken: t.string,
  id: t.number,
  firstName: t.string,
  lastName: t.string,
  email: t.string,
  roles: t.array(Role),
  tokenType: t.string,
});
export type LoginSuccessResponse = t.TypeOf<typeof LoginSuccessResponse>;

export const LoginResponse = t.union([LoginSuccessResponse, GenericErrorResponse]);

export type LoginResponse = t.TypeOf<typeof LoginResponse>;

export const Trip = t.interface({
  description: t.union([t.string, t.undefined]),
  endDate: t.string,
  id: t.number,
  startDate: t.string,
  title: t.string,
  uniqueLink: t.union([t.string, t.undefined]),
  user: User,
});
export type Trip = t.TypeOf<typeof Trip>;

export const Trips = t.array(Trip);
export type Trips = t.TypeOf<typeof Trips>;
