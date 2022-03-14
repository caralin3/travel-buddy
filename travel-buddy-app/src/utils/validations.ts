import moment from 'moment';

export const isEmailValid = (email: string) => !!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);

export const isEndDateValid = (startDate: string, endDate: string) => {
  const start = moment(startDate);
  const end = moment(endDate);
  return end.isAfter(start);
};
