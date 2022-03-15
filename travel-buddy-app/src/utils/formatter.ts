import moment from 'moment';

export const SHORT_DATE_FORMAT = 'MM/DD/YYYY';

export const formatDate = (date: string, format = 'MMMM DD, YYYY') => moment(date).format(format);
