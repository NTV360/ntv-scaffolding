import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Layout } from '../../components/layout/layout';
import { Sidebar } from '../../components/layout/sidebar/sidebar';
import { InstallationFlowService } from '../../services';

@Component({
  selector: 'ntv-flow-container',
  imports: [CommonModule, RouterModule, Layout, Sidebar],
  templateUrl: './flow-container.html',
  styleUrl: './flow-container.css',
  providers: [InstallationFlowService],
})
export class FlowContainer {
  private installationFlowService = inject(InstallationFlowService);

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

  /**
   * Complete the current step and move to next
   */
  completeCurrentStep(): void {
    this.installationFlowService.completeCurrentStep();
  }

  /**
   * Manually trigger an error on the current step for testing
   */
  triggerCurrentStepError(): void {
    this.installationFlowService.markCurrentStepError();
    console.log(`Step ${this.installationFlowService.currentStepIndex() + 1} marked as error`);
  }

  /**
   * Clear error from the current step
   */
  clearCurrentStepError(): void {
    const currentIndex = this.installationFlowService.currentStepIndex();
    this.installationFlowService.clearStepError(currentIndex);
    console.log(`Step ${currentIndex + 1} error cleared`);
  }

  /**
   * Get current step information for display
   */
  get currentStepInfo() {
    const currentIndex = this.installationFlowService.currentStepIndex();
    const currentStep = this.installationFlowService.currentStep();
    const totalSteps = this.installationFlowService.steps().length;
    
    return {
      index: currentIndex,
      step: currentStep,
      isFirst: currentIndex === 0,
      isLast: currentIndex === totalSteps - 1,
      stepNumber: currentIndex + 1,
      totalSteps
    };
  }
}
