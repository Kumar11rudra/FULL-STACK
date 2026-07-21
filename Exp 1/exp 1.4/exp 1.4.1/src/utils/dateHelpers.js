import {
  format,
  parseISO
} from "date-fns";

export const formatDate = (date) => {
  if (!date) return "";

  return format(parseISO(date), "dd MMM yyyy");
};

export const formatDateTime = (date) => {
  if (!date) return "";

  return format(parseISO(date), "dd MMM yyyy HH:mm");
};

export const today = () => {
  return new Date().toISOString().split("T")[0];
};

export const generateEvent = (
  title,
  date,
  color = "#2563eb"
) => ({
  id: Date.now().toString(),
  title,
  start: date,
  color
});
