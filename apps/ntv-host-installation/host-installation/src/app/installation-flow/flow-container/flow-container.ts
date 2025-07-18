import { Component, inject, computed, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '@ntv-scaffolding/component-pantry';
import { Layout } from '../../components/layout/layout';
import { Sidebar } from '../../components/layout/sidebar/sidebar';
import { InstallationFlowService } from '../../services';
import { CreateHost } from '../steps/create-host/create-host';
import { CreateScreen } from '../steps/create-screen/create-screen';
import { SetInstallation } from '../steps/set-installation/set-installation';
import { ReviewInformation } from '../steps/review-information/review-information';

@Component({
  selector: 'ntv-flow-container',
  imports: [
    CommonModule,
    Button,
    Layout,
    Sidebar,
    CreateHost,
    CreateScreen,
    SetInstallation,
    ReviewInformation,
  ],
  templateUrl: './flow-container.html',
  styleUrl: './flow-container.css',
})
export class FlowContainer {
  private installationFlowService = inject(InstallationFlowService);

  // ViewChild reference to CreateHost component for nested navigation
  @ViewChild(CreateHost) createHostComponent!: CreateHost;

  // Public computed signals from service
  currentStep = this.installationFlowService.currentStep;
  currentStepIndex = this.installationFlowService.currentStepIndex;
  isFirstStep = this.installationFlowService.isFirstStep;
  isLastStep = this.installationFlowService.isLastStep;
  canProceed = this.installationFlowService.canProceed;

  /**
   * Computed signal for the current page title based on the active step
   */
  pageTitle = computed(() => {
    const step = this.currentStep();
    return step ? step.label : 'Installation Flow';
  });

  /**
   * Computed signal for the current page subtitle based on the active step
   */
  pageSubtitle = computed(() => {
    const step = this.currentStep();
    return step ? step.description : 'Follow the steps to complete your installation';
  });

  /**
   * Navigate to the next step with nested step support
   */
  nextStep(): void {
    // Check if we're on step1 (create-host) and it has internal sub-steps
    if (this.currentStep()?.id === 'step1' && this.createHostComponent) {
      // If not on the last sub-step, advance to next sub-step
      if (!this.createHostComponent.isLastSubStep()) {
        this.createHostComponent.nextSubStep();
        return;
      }
    }
    
    // Otherwise, advance to next main step
    this.installationFlowService.nextStep();
  }

  /**
   * Navigate to the previous step with nested step support
   */
  previousStep(): void {
    // Check if we're on step1 (create-host) and it has internal sub-steps
    if (this.currentStep()?.id === 'step1' && this.createHostComponent) {
      // If not on the first sub-step, go back to previous sub-step
      if (!this.createHostComponent.isFirstSubStep()) {
        this.createHostComponent.previousSubStep();
        return;
      }
    }
    
    // Otherwise, go back to previous main step
    this.installationFlowService.previousStep();
  }


}
