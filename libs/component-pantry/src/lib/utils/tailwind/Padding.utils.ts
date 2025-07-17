export function getPaddingClass(paddingValue: number | string): string {
  if (typeof paddingValue === 'string') {
    return paddingValue;
  }

  switch (paddingValue) {
    case 0:
      return 'p-0';
    case 1:
      return 'p-1';
    case 2:
      return 'p-2';
    case 3:
      return 'p-3';
    case 4:
      return 'p-4';
    case 5:
      return 'p-5';
    case 6:
      return 'p-6';
    case 8:
      return 'p-8';
    case 10:
      return 'p-10';
    case 12:
      return 'p-12';
    default:
      return 'p-4';
  }
}
