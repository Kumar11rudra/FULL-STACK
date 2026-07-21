export const countCompletedEvents = (events) => {
  return events.filter(event => event.completed).length;
};

export const countPendingEvents = (events) => {
  return events.filter(event => !event.completed).length;
};

export const sortEventsByDate = (events) => {
  return [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
};

export const searchEvents = (events, keyword) => {

  if (!keyword.trim()) return events;

  return events.filter(event =>
    event.title
      .toLowerCase()
      .includes(keyword.toLowerCase())
  );

};

export const getUpcomingEvents = (events) => {

  const today = new Date();

  return events.filter(
    event => new Date(event.date) >= today
  );

};
