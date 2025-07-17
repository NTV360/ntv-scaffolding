import { Injectable, signal, computed } from '@angular/core';
import { InstallationStepId } from '../types';
import { INSTALLATION_STEPS } from '../constants';
import { InstallationStep } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class InstallationFlowService {
  // Private signals for internal state management
  private _steps = signal<InstallationStep[]>(INSTALLATION_STEPS);
  private _currentStepIndex = signal<number>(0);

  // Public computed signals
  readonly steps = computed(() => this._steps());
  readonly currentStepIndex = computed(() => this._currentStepIndex());
  readonly currentStep = computed(
    () => this._steps()[this._currentStepIndex()]
  );
  readonly isFirstStep = computed(() => this._currentStepIndex() === 0);
  readonly isLastStep = computed(
    () => this._currentStepIndex() === this._steps().length - 1
  );
  readonly canProceed = computed(() => {
    const current = this.currentStep();
    return current && !current.error && !current.disabled;
  });

  /**
   * Navigate to a specific step by index
   */
  navigateToStep(stepIndex: number): boolean {
    if (stepIndex < 0 || stepIndex >= this._steps().length) {
      return false;
    }

    this._currentStepIndex.set(stepIndex);
    this.updateStepStates();
    return true;
  }

  /**
   * Navigate to a specific step by ID
   */
  navigateToStepById(stepId: InstallationStepId): boolean {
    const stepIndex = this._steps().findIndex((step) => step.id === stepId);
    return this.navigateToStep(stepIndex);
  }

  /**
   * Move to the next step
   */
  nextStep(): boolean {
    if (this.isLastStep()) {
      return false;
    }
    return this.navigateToStep(this._currentStepIndex() + 1);
  }

  /**
   * Move to the previous step
   */
  previousStep(): boolean {
    if (this.isFirstStep()) {
      return false;
    }
    return this.navigateToStep(this._currentStepIndex() - 1);
  }

  /**
   * Complete the current step and move to the next
   */
  completeCurrentStep(): boolean {
    const currentIndex = this._currentStepIndex();
    const steps = [...this._steps()];

    if (steps[currentIndex]) {
      steps[currentIndex] = {
        ...steps[currentIndex],
        completed: true,
        error: false,
      };
      this._steps.set(steps);
    }

    return this.nextStep();
  }

  /**
   * Mark the current step as having an error
   */
  markCurrentStepError(errorMessage?: string): void {
    this.markStepError(this._currentStepIndex(), errorMessage);
  }

  /**
   * Mark a specific step as having an error
   */
  markStepError(stepIndex: number, errorMessage?: string): void {
    const steps = [...this._steps()];
    if (steps[stepIndex]) {
      steps[stepIndex] = {
        ...steps[stepIndex],
        error: true,
        // You could extend the interface to include errorMessage if needed
      };
      this._steps.set(steps);
    }
  }

  /**
   * Clear error from a specific step
   */
  clearStepError(stepIndex: number): void {
    const steps = [...this._steps()];
    if (steps[stepIndex]) {
      steps[stepIndex] = { ...steps[stepIndex], error: false };
      this._steps.set(steps);
    }
  }

  /**
   * Reset the entire flow to the beginning
   */
  resetFlow(): void {
    const resetSteps = INSTALLATION_STEPS.map((step) => ({
      ...step,
      completed: false,
      active: false,
      error: false,
    }));

    this._steps.set(resetSteps);
    this._currentStepIndex.set(0);
    this.updateStepStates();
  }

  /**
   * Get progress percentage
   */
  getProgress(): number {
    const completedSteps = this._steps().filter(
      (step) => step.completed
    ).length;
    return Math.round((completedSteps / this._steps().length) * 100);
  }

  /**
   * Update step states based on current step
   */
  private updateStepStates(): void {
    const currentIndex = this._currentStepIndex();
    const steps = this._steps().map((step, index) => ({
      ...step,
      active: index === currentIndex,
      // Only preserve existing completed status, don't auto-complete previous steps
    }));

    this._steps.set(steps);
  }
}
