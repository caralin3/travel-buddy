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

export const FlightRequest = t.intersection([
  t.interface({
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
    tripId: t.number,
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
export type FlightRequest = t.TypeOf<typeof FlightRequest>;

export const FlightResponse = t.union([Flight, GenericErrorResponse]);

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
    state: t.string,
    postalCode: t.string,
  }),
]);
export type Hotel = t.TypeOf<typeof Hotel>;

export const Hotels = t.array(Hotel);
export type Hotels = t.TypeOf<typeof Hotels>;

export const HotelRequest = t.intersection([
  t.interface({
    name: t.string,
    roomType: RoomType,
    roomCount: t.number,
    checkInDate: t.string,
    checkOutDate: t.string,
    cost: t.number,
    currency: t.string,
    addressLine1: t.string,
    city: t.string,
    tripId: t.number,
  }),
  t.partial({
    addressLine2: t.string,
  }),
  t.partial({
    description: t.string,
  }),
  t.partial({
    country: t.string,
    state: t.string,
    postalCode: t.string,
  }),
]);
export type HotelRequest = t.TypeOf<typeof HotelRequest>;

export const HotelResponse = t.union([Hotel, GenericErrorResponse]);

export const Cruise = t.intersection([
  t.interface({
    id: t.number,
    cruiseLine: t.string,
    shipName: t.string,
    cost: t.number,
    currency: t.string,
    cabinNumber: t.string,
    startDate: t.string,
    endDate: t.string,
    departureCity: t.string,
    departureCountry: t.string,
    roundTrip: t.boolean,
    trip: Trip,
  }),
  t.partial({
    description: t.string,
  }),
  t.partial({
    departureState: t.string,
  }),
  t.partial({
    destinationCity: t.string,
    destinationCountry: t.string,
    destinationState: t.string,
  }),
  t.partial({
    cabinType: RoomType,
  }),
]);
export type Cruise = t.TypeOf<typeof Cruise>;

export const Cruises = t.array(Cruise);
export type Cruises = t.TypeOf<typeof Cruises>;

export const CruiseRequest = t.intersection([
  t.interface({
    cruiseLine: t.string,
    shipName: t.string,
    cabinNumber: t.string,
    startDate: t.string,
    endDate: t.string,
    departureCity: t.string,
    departureCountry: t.string,
    roundTrip: t.boolean,
    tripId: t.number,
  }),
  t.partial({
    description: t.string,
  }),
  t.partial({ cost: t.number, currency: t.string }),
  t.intersection([
    t.partial({
      departureState: t.string,
    }),
    t.partial({
      destinationCity: t.string,
      destinationCountry: t.string,
      destinationState: t.string,
    }),
  ]),
  t.partial({
    cabinType: RoomType,
  }),
]);
export type CruiseRequest = t.TypeOf<typeof CruiseRequest>;

export const CruiseResponse = t.union([Cruise, GenericErrorResponse]);

export const Port = t.intersection([
  t.interface({
    id: t.number,
    day: t.number,
    arrival: t.string,
    departure: t.string,
    city: t.string,
    country: t.string,
    cruise: Cruise,
  }),
  t.partial({
    description: t.string,
  }),
  t.partial({
    state: t.string,
  }),
]);
export type Port = t.TypeOf<typeof Port>;

export const Ports = t.array(Port);
export type Ports = t.TypeOf<typeof Ports>;

export const PortRequest = t.intersection([
  t.interface({
    day: t.number,
    arrival: t.string,
    departure: t.string,
    city: t.string,
    country: t.string,
    cruiseId: t.number,
  }),
  t.partial({
    description: t.string,
  }),
  t.partial({
    state: t.string,
  }),
]);
export type PortRequest = t.TypeOf<typeof PortRequest>;

export const PortResponse = t.union([Port, GenericErrorResponse]);

export const Activity = t.intersection([
  t.interface({
    id: t.number,
    name: t.string,
    description: t.string,
    startDate: t.string,
    endDate: t.string,
    cost: t.number,
    currency: t.string,
    addressLine1: t.string,
    trip: Trip,
  }),
  t.intersection([
    t.partial({
      city: t.string,
      country: t.string,
    }),
    t.partial({
      addressLine2: t.string,
      postalCode: t.string,
    }),
    t.partial({
      state: t.string,
    }),
  ]),
  t.partial({
    company: t.string,
  }),
  t.partial({
    port: Port,
    cruise: Cruise,
  }),
]);
export type Activity = t.TypeOf<typeof Activity>;

export const Activities = t.array(Activity);
export type Activities = t.TypeOf<typeof Activities>;

export const ActivityRequest = t.intersection([
  t.interface({
    name: t.string,
    description: t.string,
    startDate: t.string,
    endDate: t.string,
    addressLine1: t.string,
    tripId: t.number,
  }),
  t.intersection([
    t.partial({
      city: t.string,
      country: t.string,
    }),
    t.partial({
      addressLine2: t.string,
      postalCode: t.string,
    }),
    t.partial({
      state: t.string,
    }),
  ]),
  t.partial({
    cost: t.number,
    currency: t.string,
  }),
  t.partial({
    company: t.string,
  }),
  t.partial({
    portId: t.number,
    cruiseId: t.number,
  }),
]);
export type ActivityRequest = t.TypeOf<typeof ActivityRequest>;

export const ActivityResponse = t.union([Activity, GenericErrorResponse]);
