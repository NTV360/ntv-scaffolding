import { Component } from '@angular/core';

import {
  Autocomplete,
  Button,
  Card,
  Template,
} from '@ntv-scaffolding/component-pantry';

import { mockLayouts } from '../template-mockup.constant';

const components = [Autocomplete, Button, Card, Template];
@Component({
  selector: 'ntv-assign-playlist',
  imports: [components],
  templateUrl: './assign-playlist.html',
  styleUrl: './assign-playlist.css',
})
export class AssignPlaylist {
  sampleTemplatedata = mockLayouts;

  public options = [
    { value: 'playlist1', label: 'Playlist 1' },
    { value: 'playlist2', label: 'Playlist 2' },
    { value: 'playlist3', label: 'Playlist 3' },
    { value: 'playlist4', label: 'Playlist 4' },
    { value: 'playlist5', label: 'Playlist 5' },
  ];
}
