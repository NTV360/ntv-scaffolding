import { Component } from '@angular/core';

//GLOBAL
import { Autocomplete, Button, Input } from '@ntv-scaffolding/component-pantry';

import { HOST_FORM_FIELDS } from '../../../../constants/form-field.constant';

//COMPONENTS
const components = [Autocomplete, Button, Input];
@Component({
  selector: 'ntv-create-host-place',
  imports: [components],
  templateUrl: './create-host-place.html',
  styleUrl: './create-host-place.css',
})
export class CreateHostPlace {
  public hostFormFields = HOST_FORM_FIELDS;

  public readonly options = [
    { value: 'dealer1', label: 'Dealer 1' },
    { value: 'dealer2', label: 'Dealer 2' },
    { value: 'dealer3', label: 'Dealer 3' },
    { value: 'dealer4', label: 'Dealer 4' },
    { value: 'dealer5', label: 'Dealer 5' },
    { value: 'dealer6', label: 'Dealer 6' },
  ];

  /**
   * Generates a CSS class name based on the provided index
   * @param index - The zero-based index to convert to a one-based class name
   * @returns A string in the format 'div{n}' where n is index + 1
   * @example
   * getDivClass(0) // returns 'div1'
   * getDivClass(2) // returns 'div3'
   */
  public getDivClass(index: number): string {
    return 'div' + (index + 1);
  }
}
