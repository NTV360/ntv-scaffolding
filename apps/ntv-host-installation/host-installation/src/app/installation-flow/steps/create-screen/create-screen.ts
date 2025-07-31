import { Component, signal } from '@angular/core';

//GLOBAL
import {
  Card,
  StepClickEvent,
  StepData,
  Stepper,
  StepperConfig,
} from '@ntv-scaffolding/component-pantry';

//LOCAL
import { AssignPlaylist } from './assign-playlist/assign-playlist';
import { ChooseTemplate } from './choose-template/choose-template';
import { CreateScreenInfo } from './create-screen-info/create-screen-info';

//components
const components = [
  Card,
  Stepper,
  AssignPlaylist,
  ChooseTemplate,
  CreateScreenInfo,
];
@Component({
  selector: 'ntv-create-screen',
  imports: [components],
  templateUrl: './create-screen.html',
  styleUrl: './create-screen.css',
})
export class CreateScreen {
  currentStep = signal(0);

  stepperConfig: StepperConfig = {
    variant: 'default',
    stepperColor: 'accent',
    labelColor: 'neutral-dark',
    showLabels: true,
    showDescriptions: true,
    clickable: true,
    allowSkipping: false,
  };

  steps: StepData[] = [
    {
      id: 'create-screen',
      label: 'Create Screen',
      description: 'Create a new screen',
    },
    {
      id: 'choose-template',
      label: 'Choose Template',
      description: 'Select a template for your screen',
    },
    {
      id: 'assign-playlist',
      label: 'Assign Playlist',
      description: 'Assign a playlist to your screen',
    },
  ];

  onStepClick(event: StepClickEvent): void {
    this.currentStep.set(event.index);
  }

  /** !!!!!!! START OF SUB STEP !!!!!!! */

  /**
   * Navigate to the next sub-step
   */
  nextSubStep(): void {
    if (this.currentStep() < this.steps.length - 1) {
      this.currentStep.set(this.currentStep() + 1);
    }
  }

  /**
   * Navigate to the previous sub-step
   */
  previousSubStep(): void {
    if (this.currentStep() > 0) {
      this.currentStep.set(this.currentStep() - 1);
    }
  }

  /**
   * Check if we're on the last sub-step
   */
  isLastSubStep(): boolean {
    return this.currentStep() === this.steps.length - 1;
  }

  /**
   * Check if we're on the first sub-step
   */
  isFirstSubStep(): boolean {
    return this.currentStep() === 0;
  }

  /** !!!!!!! END OF SUB STEP !!!!!!! */
}
