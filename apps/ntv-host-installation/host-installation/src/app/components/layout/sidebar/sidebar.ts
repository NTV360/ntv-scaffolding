import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Button,
  Stepper,
  StepperConfig,
  StepClickEvent,
} from '@ntv-scaffolding/component-pantry';
import { DEFAULT_STEPPER_CONFIG } from '../../../constants';
import { InstallationFlowService } from '../../../services';

@Component({
  selector: 'ntv-sidebar',
  imports: [CommonModule, Button, Stepper],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private installationFlowService = inject(InstallationFlowService);

  // Public computed signals from service
  installationSteps = this.installationFlowService.steps;
  currentStep = this.installationFlowService.currentStepIndex;

  // Stepper configuration with clickable enabled
  stepperConfig: StepperConfig = {
    ...DEFAULT_STEPPER_CONFIG,
    clickable: true,
  };

  /**
   * Handles step click events and delegates to service
   */
  onStepClick(event: StepClickEvent): void {
    const { index } = event;
    this.installationFlowService.navigateToStep(index);
  }
}
