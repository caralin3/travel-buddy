import moment from 'moment';

export const getDaysUntil = (date: string) => moment(date).diff(moment(), 'days');

export const getDurationDays = (startDate: string, endDate: string) => moment(endDate).diff(startDate, 'days') + 1;

export const getDurationHours = (startDate: string, endDate: string) =>
  Math.ceil(moment.duration(moment(endDate).diff(startDate)).asHours() * 2) / 2;

export function getAllDays(startDate: string, endDate: string) {
  const days = [startDate];
  let date = moment(startDate);
  while (moment(endDate).diff(date, 'days') > 0) {
    date = date.add(1, 'day');
    days.push(date.format('YYYY-MM-DD'));
  }
  return days;
}

export const sortByDate = (arr: any[], dateField: string) =>
  arr.sort((a, b) => moment(a[dateField]).valueOf() - moment(b[dateField]).valueOf());
