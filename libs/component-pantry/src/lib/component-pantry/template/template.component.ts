// ✅ UPDATED: template.component.ts
import {
  Component,
  input,
  output,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Playlist, ZoneComponent, ZoneData } from './zone/zone.component';

@Component({
  selector: 'ntv-template',
  standalone: true,
  imports: [ZoneComponent],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush, // ✅ Add OnPush
})
export class Template {
  public readonly zones = input<ZoneData[]>();
  public readonly availablePlaylists = input<Playlist[]>([]);
  public readonly showZoneInfo = input<boolean>(false);
  public selectedZone = signal<string | null>(null);
  public zoneSelected = output<string>();

  onZoneSelected(zoneName: string | null) {
    this.selectedZone.set(zoneName);
    if (zoneName) {
      this.zoneSelected.emit(zoneName);
    }
  }
}
