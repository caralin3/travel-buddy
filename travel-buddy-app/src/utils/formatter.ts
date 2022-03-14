import moment from 'moment';

export const formatDate = (date: string) => moment(date).format('MMM DD, YYYY');
