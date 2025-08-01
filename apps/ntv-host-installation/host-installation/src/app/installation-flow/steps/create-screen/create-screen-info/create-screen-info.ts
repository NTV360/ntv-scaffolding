import { Component } from '@angular/core';

//GLOBAL
import { Input, Card } from '@ntv-scaffolding/component-pantry';

//LOCAL
import { CREATE_SCREEN_FORM } from '../../../../constants/form-field.constant';

@Component({
  selector: 'ntv-create-screen-info',
  imports: [Input, Card],
  templateUrl: './create-screen-info.html',
  styleUrl: './create-screen-info.css',
})
export class CreateScreenInfo {
  public screenFormFields = CREATE_SCREEN_FORM;
}
