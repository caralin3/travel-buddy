import { Hotel } from '../api';
import { trips } from './trips';

export const hotels: Hotel[] = [
  {
    id: 0,
    name: 'Courtyard By Marriot Denton',
    roomType: 'DOUBLE',
    roomCount: 1,
    checkInDate: '2022-06-03 15:00:00',
    checkOutDate: '2022-06-06 11:00:00',
    cost: 0,
    currency: 'USD',
    addressLine1: '2800 Colorado Blvd',
    city: 'Denton',
    state: 'TX',
    trip: trips[0],
  },
];
