import { format, formatDistanceToNowStrict } from 'date-fns';

import { DateFormats } from './Constants';

const toDate = (date: string | Date): Date => {
  if (typeof date === 'string') {
    return new Date(date);
  } else {
    return date;
  }
};

const toShortDate = (date: string | Date) => {
  return format(toDate(date), DateFormats.SHORT_DATE);
};

const toDurationString = (date: string | Date, addSuffix?: boolean) => {
  if (date === undefined) return '';
  return formatDistanceToNowStrict(toDate(date), {
    addSuffix: !!addSuffix,
  });
};

export { toDurationString, toShortDate };
