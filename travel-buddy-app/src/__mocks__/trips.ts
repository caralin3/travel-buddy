import { Trip } from '../api';
import { user } from './user';

export const trips: Trip[] = [
  {
    user,
    id: 0,
    title: 'Texas Girls Trip 2022',
    description: 'Travelers: Cara, Elizabeth, Sarah<br/>Destination: Dallas, Texas',
    startDate: '2022-06-03',
    endDate: '2022-06-06',
    uniqueLink: '',
  },
  {
    user,
    id: 1,
    title: 'Trip 2',
    startDate: '2022-08-14',
    endDate: '2022-08-31',
  },
];
