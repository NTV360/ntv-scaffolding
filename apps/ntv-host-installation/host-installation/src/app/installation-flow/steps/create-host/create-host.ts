import { Component, signal } from '@angular/core';

//GLOBAL
import {
  Card,
  Stepper,
  StepperConfig,
  StepData,
  StepClickEvent,
} from '@ntv-scaffolding/component-pantry';

import { SearchHostPlace } from './search-host-place/search-host-place';
import { CreateHostPlace } from './create-host-place/create-host-place';

@Component({
  selector: 'ntv-create-host',
  imports: [Card, Stepper, SearchHostPlace, CreateHostPlace],
  templateUrl: './create-host.html',
  styleUrl: './create-host.css',
})
export class CreateHost {
  currentStep = signal(0);

  steps: StepData[] = [
    {
      id: 'search-host',
      label: 'Search Host Place',
      description: 'Search for an existing business location',
    },
    {
      id: 'create-host',
      label: 'Create Host Place',
      description: 'Manually create a new host location',
    },
  ];

  stepperConfig: StepperConfig = {
    variant: 'default',
    stepperColor: 'accent',
    labelColor: 'neutral-dark',
    showLabels: true,
    showDescriptions: true,
    clickable: true,
    allowSkipping: false,
  };

  onStepClick(event: StepClickEvent): void {
    this.currentStep.set(event.index);
  }

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
}
