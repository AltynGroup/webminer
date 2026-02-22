export const formatTime = (date: Date) => {
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  return `${h} // ${m}`;
};

export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: 'short' };
  return date.toLocaleDateString('en-US', options).toUpperCase();
};
