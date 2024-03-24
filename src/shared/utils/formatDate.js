import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const formatDate = date => {
  return dayjs(date).format('YYYY.MM.DD(ddd)');
};
