import type { Meta, StoryObj } from '@storybook/angular';
import { Popover } from './popover';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta<Popover> = {
  title: 'Components/Popover',
  component: Popover,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, Popover],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Popover Component

A highly configurable popover component that supports multiple placement options, trigger methods, and customizable styling.

## Features
- 12 placement options (top, bottom, left, right with start/end variants)
- Click, hover, and manual trigger modes
- Customizable arrow indicator
- Click outside and escape key closing
- Responsive design with viewport boundary detection
- Dark mode support
- Accessibility features

## Usage

\`\`\`typescript
// Basic usage with template reference
<button (click)="popover.toggle($event)">Toggle Popover</button>
<ntv-popover #popover placement="top">
  <p>Popover content goes here</p>
</ntv-popover>

// Configuration pattern
<ntv-popover [config]="{ placement: 'bottom-start', arrow: false }">
  Custom content
</ntv-popover>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
      description: 'Position of the popover relative to the trigger element',
    },
    offset: {
      control: 'number',
      description: 'Distance between the popover and trigger element',
    },
    arrow: {
      control: 'boolean',
      description: 'Whether to show the arrow indicator',
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover', 'manual'],
      description: 'How the popover is triggered',
    },
    closeOnClickOutside: {
      control: 'boolean',
      description: 'Whether to close when clicking outside',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether to close when pressing escape',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the popover is disabled',
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width of the popover',
    },
    zIndex: {
      control: 'number',
      description: 'Z-index for the popover',
    },
  },
};

export default meta;
type Story = StoryObj<Popover>;

// Basic example
export const Default: Story = {
  args: {
    placement: 'bottom',
    offset: 8,
    arrow: true,
    trigger: 'manual',
    closeOnClickOutside: true,
    closeOnEscape: true,
    disabled: false,
    maxWidth: '320px',
    zIndex: 1000,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex items-center justify-center min-h-[200px]">
        <button 
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          (click)="popover.toggle($event)">
          Click to toggle popover
        </button>
        
        <ntv-popover 
          #popover
          [placement]="placement"
          [offset]="offset"
          [arrow]="arrow"
          [trigger]="trigger"
          [closeOnClickOutside]="closeOnClickOutside"
          [closeOnEscape]="closeOnEscape"
          [disabled]="disabled"
          [maxWidth]="maxWidth"
          [zIndex]="zIndex">
          <div class="space-y-2">
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Popover Title</h3>
            <p class="text-gray-600 dark:text-gray-300">This is the popover content. You can put any HTML content here.</p>
            <button class="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Action Button</button>
          </div>
        </ntv-popover>
      </div>
    `,
  }),
};

// All placements showcase
export const AllPlacements: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-3 gap-8 p-8 min-h-[600px]">
        <!-- Top row -->
        <div class="flex justify-center">
          <div class="space-y-2">
            <button class="px-3 py-1.5 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" (click)="topStart.toggle($event)">Top Start</button>
            <ntv-popover #topStart placement="top-start">
              <p>Top Start placement</p>
            </ntv-popover>
          </div>
        </div>
        
        <div class="flex justify-center">
          <div class="space-y-2">
            <button class="px-3 py-1.5 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" (click)="top.toggle($event)">Top</button>
            <ntv-popover #top placement="top">
              <p>Top placement</p>
            </ntv-popover>
          </div>
        </div>
        
        <div class="flex justify-center">
          <div class="space-y-2">
            <button class="px-3 py-1.5 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" (click)="topEnd.toggle($event)">Top End</button>
            <ntv-popover #topEnd placement="top-end">
              <p>Top End placement</p>
            </ntv-popover>
          </div>
        </div>
        
        <!-- Middle row -->
        <div class="flex justify-center items-center">
          <div class="space-x-2 flex">
            <button class="px-3 py-1.5 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" (click)="leftStart.toggle($event)">Left Start</button>
            <ntv-popover #leftStart placement="left-start">
              <p>Left Start placement</p>
            </ntv-popover>
            
            <button class="px-3 py-1.5 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" (click)="left.toggle($event)">Left</button>
            <ntv-popover #left placement="left">
              <p>Left placement</p>
            </ntv-popover>
            
            <button class="px-3 py-1.5 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" (click)="leftEnd.toggle($event)">Left End</button>
            <ntv-popover #leftEnd placement="left-end">
              <p>Left End placement</p>
            </ntv-popover>
          </div>
        </div>
        
        <div class="flex justify-center items-center">
          <div class="text-center text-gray-500 dark:text-gray-400">
            <p class="text-sm">Popover</p>
            <p class="text-sm">Placements</p>
          </div>
        </div>
        
        <div class="flex justify-center items-center">
          <div class="space-x-2 flex">
            <button class="px-3 py-1.5 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" (click)="rightStart.toggle($event)">Right Start</button>
            <ntv-popover #rightStart placement="right-start">
              <p>Right Start placement</p>
            </ntv-popover>
            
            <button class="px-3 py-1.5 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" (click)="right.toggle($event)">Right</button>
            <ntv-popover #right placement="right">
              <p>Right placement</p>
            </ntv-popover>
            
            <button class="px-3 py-1.5 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" (click)="rightEnd.toggle($event)">Right End</button>
            <ntv-popover #rightEnd placement="right-end">
              <p>Right End placement</p>
            </ntv-popover>
          </div>
        </div>
        
        <!-- Bottom row -->
        <div class="flex justify-center">
          <div class="space-y-2">
            <button class="px-3 py-1.5 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" (click)="bottomStart.toggle($event)">Bottom Start</button>
            <ntv-popover #bottomStart placement="bottom-start">
              <p>Bottom Start placement</p>
            </ntv-popover>
          </div>
        </div>
        
        <div class="flex justify-center">
          <div class="space-y-2">
            <button class="px-3 py-1.5 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" (click)="bottom.toggle($event)">Bottom</button>
            <ntv-popover #bottom placement="bottom">
              <p>Bottom placement</p>
            </ntv-popover>
          </div>
        </div>
        
        <div class="flex justify-center">
          <div class="space-y-2">
            <button class="px-3 py-1.5 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" (click)="bottomEnd.toggle($event)">Bottom End</button>
            <ntv-popover #bottomEnd placement="bottom-end">
              <p>Bottom End placement</p>
            </ntv-popover>
          </div>
        </div>
      </div>
    `,
  }),
};

// Configuration pattern example
export const ConfigurationPattern: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap gap-4 items-center justify-center min-h-[200px]">
        <button 
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          (click)="configPopover.toggle($event)">
          Config Pattern
        </button>
        
        <ntv-popover 
          #configPopover
          [config]="{
            placement: 'top',
            arrow: false,
            offset: 12,
            maxWidth: '400px',
            closeOnClickOutside: true
          }">
          <div class="space-y-3">
            <h3 class="font-bold text-lg text-gray-900 dark:text-gray-100">Configuration Example</h3>
            <p class="text-gray-600 dark:text-gray-300">
              This popover uses the configuration pattern for cleaner templates.
              It has no arrow, custom offset, and wider max-width.
            </p>
            <div class="flex gap-2">
              <button class="px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Confirm</button>
              <button class="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" (click)="configPopover.hide()">Cancel</button>
            </div>
          </div>
        </ntv-popover>
      </div>
    `,
  }),
};

// Rich content example
export const RichContent: Story = {
  render: () => ({
    template: `
      <div class="flex items-center justify-center min-h-[300px]">
        <button 
          class="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          (click)="richPopover.toggle($event)">
          Rich Content Popover
        </button>
        
        <ntv-popover 
          #richPopover
          placement="bottom"
          [config]="{ maxWidth: '480px' }">
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span class="text-white font-bold">👤</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-gray-100">John Doe</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Software Engineer</p>
              </div>
            </div>
            
            <div class="border-t border-gray-200 dark:border-gray-700 pt-3">
              <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Experienced developer with expertise in Angular, React, and Node.js. 
                Passionate about creating user-friendly applications.
              </p>
              
              <div class="flex gap-2">
                <button class="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">View Profile</button>
                <button class="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Send Message</button>
              </div>
            </div>
          </div>
        </ntv-popover>
      </div>
    `,
  }),
};

// No arrow example
export const NoArrow: Story = {
  args: {
    arrow: false,
    placement: 'top',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex items-center justify-center min-h-[200px]">
        <button 
          class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          (click)="noArrowPopover.toggle($event)">
          No Arrow Popover
        </button>
        
        <ntv-popover 
          #noArrowPopover
          [placement]="placement"
          [arrow]="arrow">
          <div class="text-center">
            <p class="text-gray-600 dark:text-gray-300">This popover has no arrow indicator.</p>
          </div>
        </ntv-popover>
      </div>
    `,
  }),
};

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex items-center justify-center min-h-[200px]">
        <button 
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          (click)="disabledPopover.toggle($event)">
          Disabled Popover (Won't Open)
        </button>
        
        <ntv-popover 
          #disabledPopover
          [disabled]="disabled">
          <p>This content won't be shown because the popover is disabled.</p>
        </ntv-popover>
      </div>
    `,
  }),
};