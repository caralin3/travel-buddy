import { Flight } from '../api';
import { trips } from './trips';

export const flights: Flight[] = [
  {
    id: 1,
    airline: 'JetBlue',
    arrivalAirport: 'JFK',
    arrivalCity: 'NYC',
    arrivalDate: '2022-06-03 15:30:00',
    confirmationCode: 'FWD5DBJ',
    departureAirport: 'DFW',
    departureCity: 'Dallas',
    departureDate: '2022-06-06 13:05:00',
    flightClass: 'ECONOMY',
    flightNumber: '124',
    seats: '12 DEF',
    terminal: 'E',
    trip: trips[0],
  },
  {
    id: 0,
    airline: 'JetBlue',
    arrivalAirport: 'DFW',
    arrivalCity: 'Dallas',
    arrivalDate: '2022-06-03 13:39:00',
    confirmationCode: 'FWD5DBJ',
    cost: 300.03,
    currency: 'USD',
    departureAirport: 'JFK',
    departureCity: 'NYC',
    departureDate: '2022-06-03 10:05:00',
    flightClass: 'ECONOMY',
    flightNumber: '123',
    terminal: '5',
    seats: '7 ABC',
    trip: trips[0],
  },
];
