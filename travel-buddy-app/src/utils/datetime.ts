import moment from 'moment';

export const STANDARD_DATE_FORMAT = 'YYYY-MM-DD';
export const SHORT_MONTH_DAY_FORMAT = 'MM/DD';
export const SHORT_WEEKDAY_FORMAT = 'ddd';
export const SHORT_DATE_FORMAT = 'MM/DD/YYYY';
export const LONG_DATE_FORMAT = 'MMMM DD, YYYY';
export const TIME_FORMAT = 'h:mm A';

export const formatDate = (date: string, format = LONG_DATE_FORMAT) => moment(date).format(format);

export const sortByDate = (arr: any[], dateField: string) =>
  arr.sort((a, b) => moment(a[dateField]).valueOf() - moment(b[dateField]).valueOf());

export const isFutureDate = (date: string) => moment(date).isAfter(moment());

export function getDaysUntil(date: string) {
  const days = moment(date).diff(moment(), 'days');
  if (days < 0) {
    return 0;
  }
  return days;
}

export const getDurationDays = (startDate: string, endDate: string) => moment(endDate).diff(startDate, 'days') + 1;

export const getDurationHours = (startDate: string, endDate: string) =>
  Math.ceil(moment.duration(moment(endDate).diff(startDate)).asHours() * 2) / 2;

export function getAllDays(startDate: string, endDate: string) {
  const days = [moment(startDate).format(STANDARD_DATE_FORMAT)];
  let date = moment(startDate);
  while (moment(endDate).diff(date, 'days') > 0) {
    date = date.add(1, 'day');
    days.push(date.format(STANDARD_DATE_FORMAT));
  }
  return days;
}

export const getEntityByDay = (entities: any[], dateField: string, day: string) =>
  entities.filter((entity) => moment(entity[dateField]).format(STANDARD_DATE_FORMAT) === day);
