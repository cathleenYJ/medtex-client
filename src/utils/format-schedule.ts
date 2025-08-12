// https://gist.github.com/mlconnor/1887156
const timeFmtOpts: Intl.DateTimeFormatOptions = {
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
};
const dateFmtOpts: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};
const dateTimeFmtOpts: Intl.DateTimeFormatOptions = {
  hour12: false,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
};

type DateType = Date | string | number;
type FmtFunction = (date: DateType, locales?: string) => string;

export const formatSchedule = (start: DateType, end: DateType) =>
  `${formatDate(start)} ${formatTime(start)} - ${formatTime(end)}`;

export const formatDateTime: FmtFunction = (date, locales = "en-CA") => {
  const dateObj =
    typeof date === "number" ? new Date(date * 1000) : new Date(date);
  return dateObj.toLocaleString(locales, dateTimeFmtOpts);
};

export const formatDate: FmtFunction = (date, locales = "en-CA") => {
  const dateObj =
    typeof date === "number" ? new Date(date * 1000) : new Date(date);
  return dateObj.toLocaleDateString(locales, dateFmtOpts);
};

export const formatTime: FmtFunction = (date, locales = "en-CA") => {
  const dateObj =
    typeof date === "number" ? new Date(date * 1000) : new Date(date);
  return dateObj.toLocaleTimeString(locales, timeFmtOpts);
};
