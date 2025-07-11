export function formatDate(dateString: string | undefined): string {
  const date = new Date(dateString || Date.now());

  const day = date.getUTCDate();
  const monthIndex = date.getUTCMonth();
  const year = date.getUTCFullYear();

  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
  ];
  const month = months[monthIndex] || '';

  return `${month} ${day}, ${year}`;
}

function getPlural(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;

  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

export function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return 'только что';
  if (minutes < 60) return `${minutes} ${getPlural(minutes, 'минуту', 'минуты', 'минут')} назад`;
  if (hours < 24) return `${hours} ${getPlural(hours, 'час', 'часа', 'часов')} назад`;
  if (days < 7) return `${days} ${getPlural(days, 'день', 'дня', 'дней')} назад`;
  if (weeks < 5) return `${weeks} ${getPlural(weeks, 'неделю', 'недели', 'недель')} назад`;
  if (months < 12) return `${months} ${getPlural(months, 'месяц', 'месяца', 'месяцев')} назад`;

  return `${years} ${getPlural(years, 'год', 'года', 'лет')} назад`;
}
