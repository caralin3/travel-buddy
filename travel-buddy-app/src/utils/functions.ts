import moment from 'moment';

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
  const days = [moment(startDate).format('YYYY-MM-DD')];
  let date = moment(startDate);
  while (moment(endDate).diff(date, 'days') > 0) {
    date = date.add(1, 'day');
    days.push(date.format('YYYY-MM-DD'));
  }
  return days;
}

export const sortByDate = (arr: any[], dateField: string) =>
  arr.sort((a, b) => moment(a[dateField]).valueOf() - moment(b[dateField]).valueOf());
