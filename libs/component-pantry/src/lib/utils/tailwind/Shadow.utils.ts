export function getShadowClass(shadowValue: string): string {
  switch (shadowValue) {
    case 'none':
      return '';
    case 'sm':
      return 'shadow-sm';
    case 'md':
      return 'shadow';
    case 'lg':
      return 'shadow-lg';
    case 'xl':
      return 'shadow-xl';
    case '2xl':
      return 'shadow-2xl';
    default:
      return shadowValue;
  }
}
