import { Component } from '@angular/core';

import { Button, Card, Template } from '@ntv-scaffolding/component-pantry';

import { mockLayouts } from '../template-mockup.constant';

const components = [Button, Card, Template];
@Component({
  selector: 'ntv-assign-playlist',
  imports: [components],
  templateUrl: './assign-playlist.html',
  styleUrl: './assign-playlist.css',
})
export class AssignPlaylist {
  sampleTemplatedata = mockLayouts;
}
