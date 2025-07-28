import { Component } from '@angular/core';

//GLOBAL
import { Input } from '@ntv-scaffolding/component-pantry';

import { HOST_FORM_FIELDS } from '../../../../constants/form-field.constant';

@Component({
  selector: 'app-create-host-place',
  imports: [Input],
  templateUrl: './create-host-place.html',
  styleUrl: './create-host-place.css',
})
export class CreateHostPlace {
  public hostFormFields = HOST_FORM_FIELDS;

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
