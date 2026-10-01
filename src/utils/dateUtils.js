export function getFoodStatus(expirationDate) {
  if (!expirationDate) {
    return 'Good';
  }

  const today = new Date();
  const expiration = new Date(`${expirationDate}T00:00:00`);

  // Remove the current time so we compare calendar dates only.
  today.setHours(0, 0, 0, 0);
  expiration.setHours(0, 0, 0, 0);

  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  const daysRemaining = Math.ceil(
    (expiration - today) / millisecondsPerDay
  );

  // Expiration date has already passed.
  if (daysRemaining < 0) {
    return 'Expired';
  }

  // Expires today or within the next 30 days.
  if (daysRemaining <= 30) {
    return 'Expiring Soon';
  }

  // More than 30 days remaining.
  return 'Good';
}