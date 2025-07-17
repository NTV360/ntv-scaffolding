import {
  Component,
  HostListener,
  model,
  input,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ntv-offcanvas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offcanvas.html',
  styleUrl: './offcanvas.scss',
})
export class OffcanvasComponent {
  // Input signal for the position of the drawer
  public readonly position = input<'top' | 'left' | 'bottom' | 'right'>('left');

  // Use model() for two-way binding of visible state (replaces [(visible)] binding)
  public visible = model<boolean>(false);

  // Input for header text
  public readonly header = input<string>('');

  // Signal for tracking if the component is fully mounted to the DOM
  private mounted = signal(false);

  // Constructor with effects setup
  constructor() {
    // Effect to setup initial state and handle body overflow
    effect(() => {
      if (this.visible()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Mark as mounted after first render
    setTimeout(() => this.mounted.set(true), 0);
  }

  // Method to close the drawer
  close(): void {
    this.visible.set(false);
  }

  // Handle keydown events for accessibility
  handleKeydown(event: KeyboardEvent): void {
    // If 'Esc' key is pressed, close the drawer
    if (event.key === 'Escape') {
      this.close();
    }
  }

  // Allow closing drawer with the 'Escape' key when document has focus
  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.visible() && event.key === 'Escape') {
      this.close();
    }
  }

  // Helper method to determine the animation class based on position
  getPositionClass(): string {
    const pos = this.position();
    return `offcanvas__panel--${pos}`;
  }
}
