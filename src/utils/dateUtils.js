function dateOnly(value) {
  if (!value) {
    return null;
  }

  const dateString =
    String(value).slice(0, 10);

  const [
    year,
    month,
    day,
  ] = dateString
    .split('-')
    .map(Number);

  if (
    !year ||
    !month ||
    !day
  ) {
    return null;
  }

  return new Date(
    year,
    month - 1,
    day
  );
}

export function getFoodStatus(
  expirationDate
) {
  const expiration =
    dateOnly(expirationDate);

  if (!expiration) {
    return 'Good';
  }

  const today = new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );

  const millisecondsPerDay =
    1000 *
    60 *
    60 *
    24;

  const daysRemaining =
    Math.round(
      (
        expiration -
        today
      ) /
      millisecondsPerDay
    );

  if (daysRemaining < 0) {
    return 'Expired';
  }

  if (daysRemaining <= 30) {
    return 'Expiring Soon';
  }

  return 'Good';
}

export function formatFoodDate(
  expirationDate
) {
  const date =
    dateOnly(
      expirationDate
    );

  if (!date) {
    return 'No date';
  }

  return date.toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }
  );
}

export function toDateInputValue(
  date
) {
  if (!date) {
    return '';
  }

  return String(date)
    .slice(0, 10);
}