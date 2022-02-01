import * as t from 'io-ts';

export const User = t.interface({
  email: t.string,
  firstName: t.string,
  id: t.number,
  lastName: t.string,
});
export type User = t.TypeOf<typeof User>;

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
