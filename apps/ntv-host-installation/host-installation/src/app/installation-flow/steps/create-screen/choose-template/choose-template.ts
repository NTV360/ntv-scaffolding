import { Component, inject } from '@angular/core';

// LOCAL
import { mockLayouts } from '../template-mockup.constant';

// GLOBAL
import { Card, Template } from '@ntv-scaffolding/component-pantry';

// SERVICES
import { InstallationFlowStateService } from '../../../../services/installation-flow-state.service';

// Import the interface
interface LayoutZone {
  name: string;
  backgroundColor: string;
  width: number;
  height: number;
  xPos: number;
  yPos: number;
  zIndex: number;
  containerHeight: number;
  containerWidth: number;
  playlistId: string;
}

interface TemplateLayout {
  name: string;
  description: string;
  layout: LayoutZone[];
}

const components = [Card, Template];

@Component({
  selector: 'ntv-choose-template',
  standalone: true,
  imports: [components],
  templateUrl: './choose-template.html',
  styleUrl: './choose-template.css',
})
export class ChooseTemplate {
  private readonly stateService = inject(InstallationFlowStateService);

  public readonly mockLayouts = mockLayouts;

  get selectedTemplate() {
    // Return a function that gets the current template value from the state
    return () =>
      this.stateService.getDraftState()()['createScreen']?.[
        'selectedTemplate'
      ] ?? null;
  }

  selectTemplate(name: string) {
    const currentTemplate =
      this.stateService.getDraftState()()['createScreen']?.['selectedTemplate'];
    if (name !== currentTemplate) {
      this.stateService.updateStepState('createScreen', {
        selectedTemplate: name,
        assignedPlaylists: {}, // Reset assigned playlists
      });
    }
  }

  onTemplateCardKeydown(event: KeyboardEvent, name: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectTemplate(name);
    }
  }
}
