import {formatDistanceToNow, format} from 'date-fns';

export function formatDate(date: Date): string {
  const now = new Date();
  const diffInHours =
    Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);
  const diffInDays = diffInHours / 24;

  if (diffInHours < 24) {
    return formatDistanceToNow(date, {addSuffix: true});
  } else if (diffInDays < 7) {
    return Math.round(diffInDays) + ' days ago';
  } else {
    return format(date, 'dd/MM/yyyy');
  }
}
