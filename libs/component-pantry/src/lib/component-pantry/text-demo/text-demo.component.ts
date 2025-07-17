import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ntv-text-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 text-demo-card rounded-lg">
      <h2 class="text-primary text-2xl font-bold mb-4">Global Text Color Demo</h2>
      
      <div class="space-y-3">
        <p class="text-primary">
          <strong>Primary Text:</strong> This is the main content text that automatically adjusts for light and dark modes.
        </p>
        
        <p class="text-secondary">
          <strong>Secondary Text:</strong> This is supporting content text with medium emphasis.
        </p>
        
        <p class="text-tertiary">
          <strong>Tertiary Text:</strong> This is less important content with lighter emphasis.
        </p>
        
        <p class="text-muted">
          <strong>Muted Text:</strong> This is subtle content like placeholders or captions.
        </p>
        
        <div class="bg-blue-500 p-3 rounded mt-4">
          <p class="text-inverted">
            <strong>Inverted Text:</strong> This text is designed for colored backgrounds.
          </p>
        </div>
        
        <p class="text-auto">
          <strong>Auto Text:</strong> This text automatically contrasts with any background.
        </p>
      </div>
      
      <div class="mt-6 p-4 text-demo-tip rounded">
        <p class="text-primary text-sm">
          💡 <strong>Tip:</strong> These text colors automatically adapt when you toggle dark mode using the button above!
        </p>
      </div>
    </div>
  `,
  styles: [`
    .text-demo-card {
      background-color: white;
      border: 1px solid #e5e7eb;
    }
    
    .text-demo-tip {
      background-color: #f3f4f6;
    }
    
    :host-context(.dark) .text-demo-card {
      background-color: #1f2937;
      border-color: #374151;
    }
    
    :host-context(.dark) .text-demo-tip {
      background-color: #374151;
    }
  `]
})
export class TextDemoComponent {
}