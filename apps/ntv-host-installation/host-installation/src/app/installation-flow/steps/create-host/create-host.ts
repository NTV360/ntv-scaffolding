import { Component } from '@angular/core';
import { Card, Stepper } from '@ntv-scaffolding/component-pantry';

@Component({
  selector: 'ntv-create-host',
  imports: [Card, Stepper],
  templateUrl: './create-host.html',
  styleUrl: './create-host.css',
})
export class CreateHost {}
