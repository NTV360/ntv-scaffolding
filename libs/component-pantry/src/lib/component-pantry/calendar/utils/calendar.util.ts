/** Check if two dates are the same day */
export function isSameDay(date1: Date, date2: Date): boolean {
  return date1.toDateString() === date2.toDateString();
}

/**
 * Check if a date is in the past
 * @param date - Date to be checked
 */
export function isPastDate(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate < today;
}

/**
 * Adds or subtracts days from a given date.
 *
 * @param date - The starting date.
 * @param n - Number of days to add (negative to subtract).
 * @returns A new date object with the added days.
 */
export function addDays(date: Date, n: number): Date {
  const result = new Date(date);
  result.setDate(date.getDate() + n);
  return result;
}

/**
 * Adds or subtracts months from a given date.
 *
 * @param date - The starting date.
 * @param n - Number of months to add (negative to subtract).
 * @returns A new date object with the added months.
 */
export function addMonths(date: Date, n: number): Date {
  const result = new Date(date);
  result.setMonth(date.getMonth() + n);
  return result;
}

/**
 * Generates a list of 50 years based on the base year and direction.
 *
 * @param baseYear - The starting year.
 * @param direction - 'forward' for future years or 'backward' for past years. Default is 'backward'.
 * @param numberOfYearsToShow - number of years to show in the list
 * @returns An array of 50 years.
 */
export function generateYears(
  baseYear: number,
  direction: 'forward' | 'backward' = 'backward',
  numberOfYearsToShow: number
): number[] {
  const years: number[] = [];
  if (direction === 'forward') {
    for (let i = baseYear; i <= baseYear + (numberOfYearsToShow - 1); i++) {
      years.push(i);
    }
  } else {
    for (let i = baseYear - (numberOfYearsToShow - 1); i <= baseYear; i++) {
      years.push(i);
    }
  }
  return years;
}
