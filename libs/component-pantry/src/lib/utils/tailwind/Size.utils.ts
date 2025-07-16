export function getWidthClass(width: string): string {
  switch (width) {
    case 'fit':
      return 'w-fit';
    case 'full':
      return 'w-full';
    default:
      return width;
  }
}

export function getHeightClass(height: string): string {
  switch (height) {
    case 'fit':
      return 'h-fit';
    case 'full':
      return 'h-full';
    default:
      return height;
  }
}
