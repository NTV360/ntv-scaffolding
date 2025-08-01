import { Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { InstallationFlowDraft } from '../interfaces/installation-flow.interface';
import { debounceTime, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstallationDraftApiService extends BaseService {
  private _draftState = signal<InstallationFlowDraft>({});
  private _autoSaveSubject = new Subject<InstallationFlowDraft>();
  private _isSaving = signal<boolean>(false);
  private _lastSaved = signal<Date | null>(null);

  constructor() {
    super();
    this.setupAutoSave();
  }

  /**
   * Get the current draft state
   * @returns {InstallationFlowDraft} Current draft state
   */
  getDraftState() {
    return this._draftState;
  }

  /**
   * Get the saving status
   * @returns {boolean} True if currently saving
   */
  get isSaving() {
    return this._isSaving;
  }

  /**
   * Get the last saved timestamp
   * @returns {Date | null} Last saved date or null if never saved
   */
  get lastSaved() {
    return this._lastSaved;
  }

  /**
   * Strongly typed update for any step
   * @param {K} step - The step key to update
   * @param {Partial<InstallationFlowDraft[K]>} state - The partial state to merge
   */
  updateStepState<K extends keyof InstallationFlowDraft>(
    step: K,
    state: Partial<InstallationFlowDraft[K]>
  ) {
    this._draftState.update((draft) => ({
      ...draft,
      [step]: { ...draft[step], ...state },
    }));

    // Trigger auto-save
    this._autoSaveSubject.next(this._draftState());
  }

  /**
   * Remove a specific property from a step
   * @param {K} step - The step key to update
   * @param {string} propertyKey - The property key to remove
   */
  removeStepProperty<K extends keyof InstallationFlowDraft>(
    step: K,
    propertyKey: string
  ) {
    this._draftState.update((draft) => {
      const stepData = { ...draft[step] };
      if (stepData && typeof stepData === 'object') {
        delete (stepData as any)[propertyKey];

        // If the step becomes empty after removing the property, remove the entire step
        if (Object.keys(stepData).length === 0) {
          const newDraft = { ...draft };
          delete newDraft[step];
          return newDraft;
        }
      }
      return {
        ...draft,
        [step]: stepData,
      };
    });

    // Trigger auto-save
    this._autoSaveSubject.next(this._draftState());
  }

  /**
   * Manually save the current draft state
   * @returns {Promise<boolean>} Promise that resolves to true if save was successful
   */
  async saveDraft(): Promise<boolean> {
    try {
      this._isSaving.set(true);
      const currentDraft = this._draftState();

      // TODO: Replace with actual API endpoint
      // await this.postRequest('/api/installation-flow/draft', currentDraft).toPromise();

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 500));

      this._lastSaved.set(new Date());
      console.log('Draft saved successfully:', currentDraft);
      return true;
    } catch (error) {
      console.error('Failed to save draft:', error);
      return false;
    } finally {
      this._isSaving.set(false);
    }
  }

  /**
   * Load draft state from the server
   * @returns {Promise<InstallationFlowDraft | null>} Promise that resolves to the loaded draft or null
   */
  async loadDraft(): Promise<InstallationFlowDraft | null> {
    try {
      // TODO: Replace with actual API endpoint
      // const draft = await this.getRequest<InstallationFlowDraft>('/api/installation-flow/draft').toPromise();

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 300));
      const draft: InstallationFlowDraft = {}; // Replace with actual API response

      this._draftState.set(draft);
      return draft;
    } catch (error) {
      console.error('Failed to load draft:', error);
      return null;
    }
  }

  /**
   * Clear the current draft state
   */
  clearDraft() {
    this._draftState.set({});
    this._lastSaved.set(null);
  }

  /**
   * Setup auto-save functionality with 3-second debounce
   * @private
   */
  private setupAutoSave() {
    this._autoSaveSubject
      .pipe(debounceTime(3000)) // 3-second debounce
      .subscribe(() => {
        this.saveDraft();
      });
  }
}
