import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Button,
  Stepper,
  StepperConfig,
} from '@ntv-scaffolding/component-pantry';

@Component({
  selector: 'ntv-sidebar',
  imports: [CommonModule, Button, Stepper],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  installationSteps = [
    {
      id: 'step1',
      label: 'Create a Host',
      description: 'Step 1',
    },
    {
      id: 'step2',
      label: 'Create Screen',
      description: 'Step 2',
    },
    {
      id: 'step3',
      label: 'Set Installation Date',
      description: 'Step 3',
    },
    {
      id: 'step4',
      label: 'Review Information',
      description: 'Step 4',
    },
  ];

  currentStep = 0;

  stepperConfig: StepperConfig = {
    variant: 'vertical-reverse',

    stepperColor: 'accent',
    labelColor: 'white',
    descriptionColor: 'neutral',
    showLabels: true,
    showDescriptions: true,
    clickable: false,
  };
}
