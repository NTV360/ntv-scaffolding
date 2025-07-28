import { ValidatorFn } from '@angular/forms';

export interface HostFormField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  validators: ValidatorFn[];
  inputType: string;
}
