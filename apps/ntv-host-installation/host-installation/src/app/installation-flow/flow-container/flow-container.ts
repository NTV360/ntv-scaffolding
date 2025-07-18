import { Component, inject, computed } from '@angular/core';
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
   * Navigate to the next step
   */
  nextStep(): void {
    this.installationFlowService.nextStep();
  }

  /**
   * Navigate to the previous step
   */
  previousStep(): void {
    this.installationFlowService.previousStep();
  }


}
