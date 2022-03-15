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

export const Trip = t.intersection([
  t.interface({
    endDate: t.string,
    id: t.number,
    startDate: t.string,
    title: t.string,
    user: User,
  }),
  t.partial({
    uniqueLink: t.union([t.null, t.string]),
  }),
  t.partial({
    description: t.string,
  }),
]);
export type Trip = t.TypeOf<typeof Trip>;

export const Trips = t.array(Trip);
export type Trips = t.TypeOf<typeof Trips>;

export const TripRequestPartial = t.partial({
  uniqueLink: t.string,
});

export const TripRequest = t.intersection([
  t.interface({
    endDate: t.string,
    startDate: t.string,
    title: t.string,
    userId: t.number,
  }),
  t.partial({
    uniqueLink: t.string,
  }),
  t.partial({
    description: t.string,
  }),
]);
export type TripRequest = t.TypeOf<typeof TripRequest>;

export const TripResponse = t.union([Trip, GenericErrorResponse]);

export const FlightType = t.keyof({
  ARRIVAL: null,
  DEPARTURE: null,
});

export const FlightClass = t.keyof({
  BUSINESS: null,
  ECONOMY: null,
  ECONOMY_PLUS: null,
  FIRST: null,
});

export const Flight = t.intersection([
  t.interface({
    id: t.number,
    airline: t.string,
    arrivalAirport: t.string,
    arrivalCity: t.string,
    arrivalDate: t.string,
    confirmationCode: t.string,
    departureAirport: t.string,
    departureCity: t.string,
    departureDate: t.string,
    flightClass: FlightClass,
    flightNumber: t.string,
    terminal: t.string,
    // type: FlightType,
    trip: Trip,
  }),
  t.partial({
    cost: t.number,
    currency: t.string,
  }),
  t.partial({
    gate: t.string,
  }),
  t.partial({
    seats: t.string,
  }),
]);
export type Flight = t.TypeOf<typeof Flight>;

export const Flights = t.array(Flight);
export type Flights = t.TypeOf<typeof Flights>;

export const RoomType = t.keyof({
  SINGLE: null,
  DOUBLE: null,
  SUITE: null,
});

export const Hotel = t.intersection([
  t.interface({
    id: t.number,
    name: t.string,
    roomType: RoomType,
    roomCount: t.number,
    checkInDate: t.string,
    checkOutDate: t.string,
    cost: t.number,
    currency: t.string,
    addressLine1: t.string,
    city: t.string,
    state: t.string,
    trip: Trip,
  }),
  t.partial({
    addressLine2: t.string,
  }),
  t.partial({
    description: t.string,
  }),
  t.partial({
    country: t.string,
    postalCode: t.string,
  }),
]);
export type Hotel = t.TypeOf<typeof Hotel>;

export const Hotels = t.array(Hotel);
export type Hotels = t.TypeOf<typeof Hotels>;
