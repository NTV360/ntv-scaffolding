import { Component } from '@angular/core';

//LOCAL
import { mockLayouts } from '../template-mockup.constant';

//GLOBAL
import { Button, Card, Template } from '@ntv-scaffolding/component-pantry';

const components = [Button, Card, Template];

@Component({
  selector: 'ntv-choose-template',
  imports: [components],
  templateUrl: './choose-template.html',
  styleUrl: './choose-template.css',
})
export class ChooseTemplate {
  sampleTemplatedata = mockLayouts;
  selectedTemplate: any = null;

  selectTemplate(template: any) {
    this.selectedTemplate = template;
    console.log('Selected template:', template);
    // Add your template selection logic here
  }
}
