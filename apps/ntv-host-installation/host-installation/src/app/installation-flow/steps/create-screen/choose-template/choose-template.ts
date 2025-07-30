import { Component } from '@angular/core';

// LOCAL
import { mockLayouts } from '../template-mockup.constant';

// GLOBAL
import { Card, Template } from '@ntv-scaffolding/component-pantry';

// Import the interface
interface LayoutZone {
  name: string;
  backgroundColor: string;
  width: number;
  height: number;
  xPos: number;
  yPos: number;
  zIndex: number;
  containerHeight: number;
  containerWidth: number;
  playlistId: string;
}

interface TemplateLayout {
  name: string;
  description: string;
  layout: LayoutZone[];
}

const components = [Card, Template];

@Component({
  selector: 'ntv-choose-template',
  imports: [components],
  templateUrl: './choose-template.html',
  styleUrl: './choose-template.css',
})
export class ChooseTemplate {
  sampleTemplatedata = mockLayouts;
  selectedTemplate: TemplateLayout | null = null;

  selectTemplate(template: TemplateLayout) {
    this.selectedTemplate = template;
  }
}
