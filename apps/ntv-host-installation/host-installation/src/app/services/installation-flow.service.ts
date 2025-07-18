import { Injectable, signal, computed } from '@angular/core';
import { InstallationStepId } from '../types';
import { INSTALLATION_STEPS } from '../constants';
import { InstallationStep } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class InstallationFlowService {
  /**
   * Private signal containing all installation steps
   * @private
   */
  private _steps = signal<InstallationStep[]>(INSTALLATION_STEPS);

  /**
   * Private signal tracking the current step index
   * @private
   */
  private _currentStepIndex = signal<number>(0);

  /**
   * Computed signal that returns all installation steps
   * @returns {InstallationStep[]} Array of all installation steps
   */
  readonly steps = computed(() => this._steps());

  /**
   * Computed signal that returns the current step index
   * @returns {number} Zero-based index of the current step
   */
  readonly currentStepIndex = computed(() => this._currentStepIndex());

  /**
   * Computed signal that returns the current step object
   * @returns {InstallationStep} The current installation step
   */
  readonly currentStep = computed(
    () => this._steps()[this._currentStepIndex()]
  );

  /**
   * Computed signal that indicates if the current step is the first step
   * @returns {boolean} True if on the first step, false otherwise
   */
  readonly isFirstStep = computed(() => this._currentStepIndex() === 0);

  /**
   * Computed signal that indicates if the current step is the last step
   * @returns {boolean} True if on the last step, false otherwise
   */
  readonly isLastStep = computed(
    () => this._currentStepIndex() === this._steps().length - 1
  );

  /**
   * Computed signal that determines if the user can proceed from the current step
   * @returns {boolean} True if the current step allows proceeding (not in error or disabled state)
   */
  readonly canProceed = computed(() => {
    const current = this.currentStep();
    return current && !current.error && !current.disabled;
  });

  /**
   * Navigate to a specific step by index
   * @param {number} stepIndex - The zero-based index of the target step
   * @returns {boolean} True if navigation was successful, false if index is out of bounds
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
   * Navigate to a specific step by its unique identifier
   * @param {InstallationStepId} stepId - The unique ID of the target step
   * @returns {boolean} True if navigation was successful, false if step ID not found
   */
  navigateToStepById(stepId: InstallationStepId): boolean {
    const stepIndex = this._steps().findIndex((step) => step.id === stepId);
    return this.navigateToStep(stepIndex);
  }

  /**
   * Go to a specific step by index (alias for navigateToStep)
   * @param {number} stepIndex - The zero-based index of the target step
   * @returns {boolean} True if navigation was successful, false if index is out of bounds
   */
  goToStep(stepIndex: number): boolean {
    return this.navigateToStep(stepIndex);
  }

  /**
   * Move to the next step in the installation flow
   * @returns {boolean} True if moved to next step, false if already on last step
   */
  nextStep(): boolean {
    if (this.isLastStep()) {
      return false;
    }
    return this.navigateToStep(this._currentStepIndex() + 1);
  }

  /**
   * Move to the previous step in the installation flow
   * @returns {boolean} True if moved to previous step, false if already on first step
   */
  previousStep(): boolean {
    if (this.isFirstStep()) {
      return false;
    }
    return this.navigateToStep(this._currentStepIndex() - 1);
  }

  /**
   * Mark the current step as completed and automatically advance to the next step
   * @returns {boolean} True if completed and advanced, false if already on last step
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
   * Mark the current step as having an error state
   * @returns {void}
   */
  markCurrentStepError(): void {
    this.markStepError(this._currentStepIndex());
  }

  /**
   * Mark a specific step as having an error state
   * @param {number} stepIndex - The zero-based index of the step to mark as error
   * @returns {void}
   */
  markStepError(stepIndex: number): void {
    const steps = [...this._steps()];
    if (steps[stepIndex]) {
      steps[stepIndex] = {
        ...steps[stepIndex],
        error: true,
      };
      this._steps.set(steps);
    }
  }

  /**
   * Clear the error state from a specific step
   * @param {number} stepIndex - The zero-based index of the step to clear error from
   * @returns {void}
   */
  clearStepError(stepIndex: number): void {
    const steps = [...this._steps()];
    if (steps[stepIndex]) {
      steps[stepIndex] = { ...steps[stepIndex], error: false };
      this._steps.set(steps);
    }
  }

  /**
   * Reset the entire installation flow to its initial state
   * All steps will be marked as incomplete, inactive, and error-free
   * The current step will be set to the first step (index 0)
   * @returns {void}
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
   * Calculate and return the installation progress as a percentage
   * @returns {number} Progress percentage (0-100) based on completed steps
   */
  getProgress(): number {
    const completedSteps = this._steps().filter(
      (step) => step.completed
    ).length;
    return Math.round((completedSteps / this._steps().length) * 100);
  }

  /**
   * Update the active state of all steps based on the current step index
   * Only the current step will be marked as active
   * @private
   * @returns {void}
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
