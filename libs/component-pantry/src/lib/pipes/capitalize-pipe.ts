import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'capitalize',
})
export class Capitalize implements PipeTransform {
  transform(firstValue: string, secondValue?: string) {
    return firstValue.charAt(0).toUpperCase() + firstValue.slice(1);
  }
}
