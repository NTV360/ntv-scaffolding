import { Injectable, signal, computed } from '@angular/core';
import {
  InstallationFlowDraft,
  CreateHostState,
  CreateScreenState,
  SetInstallationState,
} from '../interfaces/installation-flow.interface';

type StepStateMap = {
  createHost: CreateHostState;
  createScreen: CreateScreenState;
  setInstallationDate: SetInstallationState;
};

@Injectable({
  providedIn: 'root',
})
export class InstallationFlowStateService {
  private readonly _draftState = signal<InstallationFlowDraft>({});

  /**
   * Gets the current draft state as a computed signal
   * @returns Computed signal containing the current draft state
   */
  public getDraftState() {
    return computed(() => this._draftState());
  }

  /**
   * Updates the state for a specific step
   * @param stepKey - The key of the step to update (e.g., 'createScreen')
   * @param stepData - The data to update for that step
   */
  public updateStepState<K extends keyof StepStateMap>(
    stepKey: K,
    stepData: Partial<StepStateMap[K]>
  ): void {
    this._draftState.update((currentState) => ({
      ...currentState,
      [stepKey]: {
        ...currentState[stepKey],
        ...stepData,
      },
    }));
  }

  /**
   * Gets the current state for a specific step
   * @param stepKey - The key of the step to get
   * @returns The current state for the specified step
   */
  public getStepState<K extends keyof StepStateMap>(
    stepKey: K
  ): StepStateMap[K] | undefined {
    return this._draftState()[stepKey];
  }

  /**
   * Resets the entire draft state
   */
  public resetDraftState(): void {
    this._draftState.set({});
  }

  /**
   * Sets the entire draft state (useful for loading saved data)
   * @param state - The complete state to set
   */
  public setDraftState(state: InstallationFlowDraft): void {
    this._draftState.set(state);
  }
}
