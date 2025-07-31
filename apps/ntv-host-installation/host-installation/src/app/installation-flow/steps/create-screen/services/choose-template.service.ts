import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChooseTemplateService {
  private readonly selectedTemplateSignal = signal<string | null>(null);

  /**
   * Gets the currently selected template signal
   * @returns WritableSignal containing the selected template name or null if none selected
   */
  public getSelectedTemplate() {
    return this.selectedTemplateSignal;
  }

  /**
   * Sets the selected template name
   * @param name - The name of the template to select
   */
  public setSelectedTemplate(name: string): void {
    this.selectedTemplateSignal.set(name);
  }
}
