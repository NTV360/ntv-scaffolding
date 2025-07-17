import type { Meta, StoryObj } from '@storybook/angular';
import { Popover } from './popover';
import { Component } from '@angular/core';

type Story = StoryObj<Popover>;

const meta: Meta<Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
An advanced popover component with flexible positioning and trigger options.

## Features
- Multiple placement options (12 positions)
- Various trigger types (click, hover, focus, manual)
- Multiple visual variants (default, bordered, shadow, minimal)
- Flexible sizing options (sm, md, lg, xl)
- Arrow indicators with smart positioning
- Click outside and escape key closing
- Accessibility features
- Smooth animations
- Custom offset and delay options
        `,
      },
    },
  },
  argTypes: {
    placement: {
      description: 'Placement position of the popover',
      control: { type: 'select' },
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
      ],
    },
    trigger: {
      description: 'Trigger type for showing/hiding the popover',
      control: { type: 'select' },
      options: ['click', 'hover', 'focus', 'manual'],
    },
    variant: {
      description: 'Visual style variant of the popover',
      control: { type: 'select' },
      options: ['default', 'bordered', 'shadow', 'minimal'],
    },
    size: {
      description: 'Size of the popover',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    showArrow: {
      description: 'Whether to show the arrow indicator',
      control: { type: 'boolean' },
    },
    offset: {
      description: 'Offset distance from the trigger element',
      control: { type: 'number', min: 0, max: 50 },
    },
    delay: {
      description: 'Delay before showing/hiding (in milliseconds)',
      control: { type: 'number', min: 0, max: 2000 },
    },
    closeOnClickOutside: {
      description: 'Whether to close when clicking outside',
      control: { type: 'boolean' },
    },
    closeOnEscape: {
      description: 'Whether to close when pressing escape key',
      control: { type: 'boolean' },
    },
    disabled: {
      description: 'Whether the popover is disabled',
      control: { type: 'boolean' },
    },
  },
};

export default meta;

export const Simple: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex justify-center items-center min-h-[200px]">
        <ntv-popover 
          [placement]="placement" 
          [trigger]="trigger" 
          [variant]="variant" 
          [size]="size" 
          [showArrow]="showArrow" 
          [offset]="offset" 
          [delay]="delay" 
          [closeOnClickOutside]="closeOnClickOutside" 
          [closeOnEscape]="closeOnEscape" 
          [disabled]="disabled">
          <button slot="trigger" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            {{ trigger === 'click' ? 'Click me' : trigger === 'hover' ? 'Hover me' : trigger === 'focus' ? 'Focus me' : 'Manual trigger' }}
          </button>
          <div slot="content">
            <div class="flex items-center space-x-2">
              <span>💡</span>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">Quick Tip</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">This is a helpful popover with useful information.</p>
              </div>
            </div>
          </div>
        </ntv-popover>
      </div>
    `,
  }),
  args: {
    placement: 'bottom',
    trigger: 'click',
    variant: 'default',
    size: 'md',
    showArrow: true,
    offset: 8,
    delay: 0,
    closeOnClickOutside: true,
    closeOnEscape: true,
    disabled: false,
  },
};

export const AllPlacements: Story = {
  render: () => ({
    template: `
      <div class="p-8">
        <h3 class="text-lg font-semibold mb-6 text-center">All Placement Options</h3>
        <div class="grid grid-cols-4 gap-8 max-w-4xl mx-auto">
          <!-- Top placements -->
          <div class="col-span-4 flex justify-center space-x-4">
            <ntv-popover placement="top-start">
              <button slot="trigger" class="px-3 py-2 bg-gray-500 text-white rounded text-sm">Top Start</button>
              <div slot="content"><p class="text-sm">Top start placement</p></div>
            </ntv-popover>
            <ntv-popover placement="top">
              <button slot="trigger" class="px-3 py-2 bg-gray-500 text-white rounded text-sm">Top</button>
              <div slot="content"><p class="text-sm">Top center placement</p></div>
            </ntv-popover>
            <ntv-popover placement="top-end">
              <button slot="trigger" class="px-3 py-2 bg-gray-500 text-white rounded text-sm">Top End</button>
              <div slot="content"><p class="text-sm">Top end placement</p></div>
            </ntv-popover>
          </div>
          
          <!-- Left and Right placements -->
          <div class="col-span-1 flex flex-col space-y-4">
            <ntv-popover placement="left-start">
              <button slot="trigger" class="px-3 py-2 bg-gray-500 text-white rounded text-sm">Left Start</button>
              <div slot="content"><p class="text-sm">Left start</p></div>
            </ntv-popover>
            <ntv-popover placement="left">
              <button slot="trigger" class="px-3 py-2 bg-gray-500 text-white rounded text-sm">Left</button>
              <div slot="content"><p class="text-sm">Left center</p></div>
            </ntv-popover>
            <ntv-popover placement="left-end">
              <button slot="trigger" class="px-3 py-2 bg-gray-500 text-white rounded text-sm">Left End</button>
              <div slot="content"><p class="text-sm">Left end</p></div>
            </ntv-popover>
          </div>
          
          <div class="col-span-2 flex justify-center items-center">
            <div class="text-center text-gray-500">
              <p class="text-sm">Click any button to see placement</p>
            </div>
          </div>
          
          <div class="col-span-1 flex flex-col space-y-4">
            <ntv-popover placement="right-start">
              <button slot="trigger" class="px-3 py-2 bg-gray-500 text-white rounded text-sm">Right Start</button>
              <div slot="content"><p class="text-sm">Right start</p></div>
            </ntv-popover>
            <ntv-popover placement="right">
              <button slot="trigger" class="px-3 py-2 bg-gray-500 text-white rounded text-sm">Right</button>
              <div slot="content"><p class="text-sm">Right center</p></div>
            </ntv-popover>
            <ntv-popover placement="right-end">
              <button slot="trigger" class="px-3 py-2 bg-gray-500 text-white rounded text-sm">Right End</button>
              <div slot="content"><p class="text-sm">Right end</p></div>
            </ntv-popover>
          </div>
          
          <!-- Bottom placements -->
          <div class="col-span-4 flex justify-center space-x-4">
            <ntv-popover placement="bottom-start">
              <button slot="trigger" class="px-3 py-2 bg-gray-500 text-white rounded text-sm">Bottom Start</button>
              <div slot="content"><p class="text-sm">Bottom start placement</p></div>
            </ntv-popover>
            <ntv-popover placement="bottom">
              <button slot="trigger" class="px-3 py-2 bg-gray-500 text-white rounded text-sm">Bottom</button>
              <div slot="content"><p class="text-sm">Bottom center placement</p></div>
            </ntv-popover>
            <ntv-popover placement="bottom-end">
              <button slot="trigger" class="px-3 py-2 bg-gray-500 text-white rounded text-sm">Bottom End</button>
              <div slot="content"><p class="text-sm">Bottom end placement</p></div>
            </ntv-popover>
          </div>
        </div>
      </div>
    `,
  }),
};

export const TriggerTypes: Story = {
  render: () => ({
    template: `
      <div class="space-y-8 max-w-2xl mx-auto">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-blue-900 mb-3">🎯 Trigger Types Demo</h3>
          <p class="text-sm text-blue-800">Try different ways to activate popovers:</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Click Trigger -->
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <h4 class="font-semibold mb-3">Click Trigger</h4>
            <ntv-popover trigger="click" placement="top">
              <button slot="trigger" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Click to toggle
              </button>
              <div slot="content">
                <h4 class="font-semibold mb-2">Click Trigger</h4>
                <p class="text-sm">Click the button to show/hide this popover.</p>
              </div>
            </ntv-popover>
          </div>
          
          <!-- Hover Trigger -->
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <h4 class="font-semibold mb-3">Hover Trigger</h4>
            <ntv-popover trigger="hover" placement="top" [delay]="300">
              <span slot="trigger" class="text-blue-500 underline cursor-help">
                Hover me
              </span>
              <div slot="content">
                <h4 class="font-semibold mb-2">Hover Trigger</h4>
                <p class="text-sm">This appears when you hover over the trigger.</p>
              </div>
            </ntv-popover>
          </div>
          
          <!-- Focus Trigger -->
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <h4 class="font-semibold mb-3">Focus Trigger</h4>
            <ntv-popover trigger="focus" placement="top">
              <input slot="trigger" 
                     type="text" 
                     placeholder="Focus me" 
                     class="border rounded px-3 py-2 w-full">
              <div slot="content">
                <h4 class="font-semibold mb-2">Focus Trigger</h4>
                <p class="text-sm">This appears when the input receives focus.</p>
              </div>
            </ntv-popover>
          </div>
          
          <!-- Manual Trigger -->
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <h4 class="font-semibold mb-3">Manual Trigger</h4>
            <ntv-popover #manualPopover trigger="manual" placement="top">
              <button slot="trigger" class="px-4 py-2 bg-gray-500 text-white rounded">
                Manual Control
              </button>
              <div slot="content">
                <h4 class="font-semibold mb-2">Manual Trigger</h4>
                <p class="text-sm">Controlled programmatically.</p>
              </div>
            </ntv-popover>
            <div class="mt-2 space-x-2">
              <button (click)="manualPopover.show()" class="px-2 py-1 bg-green-500 text-white rounded text-xs">
                Show
              </button>
              <button (click)="manualPopover.hide()" class="px-2 py-1 bg-red-500 text-white rounded text-xs">
                Hide
              </button>
              <button (click)="manualPopover.toggle()" class="px-2 py-1 bg-blue-500 text-white rounded text-xs">
                Toggle
              </button>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="space-y-8">
        <div class="text-center">
          <h3 class="text-lg font-semibold mb-2">Visual Variants</h3>
          <p class="text-gray-600">Different styling options for various use cases</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Default Variant -->
          <div class="text-center">
            <h4 class="font-medium mb-3">Default</h4>
            <ntv-popover variant="default" placement="top">
              <button slot="trigger" class="px-4 py-2 bg-gray-500 text-white rounded">
                Default
              </button>
              <div slot="content">
                <p class="text-sm">Standard popover with default styling.</p>
              </div>
            </ntv-popover>
          </div>
          
          <!-- Bordered Variant -->
          <div class="text-center">
            <h4 class="font-medium mb-3">Bordered</h4>
            <ntv-popover variant="bordered" placement="top">
              <button slot="trigger" class="px-4 py-2 bg-blue-500 text-white rounded">
                Bordered
              </button>
              <div slot="content">
                <p class="text-sm">Popover with enhanced border styling.</p>
              </div>
            </ntv-popover>
          </div>
          
          <!-- Shadow Variant -->
          <div class="text-center">
            <h4 class="font-medium mb-3">Shadow</h4>
            <ntv-popover variant="shadow" placement="top">
              <button slot="trigger" class="px-4 py-2 bg-purple-500 text-white rounded">
                Shadow
              </button>
              <div slot="content">
                <p class="text-sm">Popover with enhanced shadow effects.</p>
              </div>
            </ntv-popover>
          </div>
          
          <!-- Minimal Variant -->
          <div class="text-center">
            <h4 class="font-medium mb-3">Minimal</h4>
            <ntv-popover variant="minimal" placement="top">
              <button slot="trigger" class="px-4 py-2 bg-green-500 text-white rounded">
                Minimal
              </button>
              <div slot="content">
                <p class="text-sm">Clean, minimal popover design.</p>
              </div>
            </ntv-popover>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="space-y-8">
        <div class="text-center">
          <h3 class="text-lg font-semibold mb-2">Size Options</h3>
          <p class="text-gray-600">Different sizes for various content amounts</p>
        </div>
        
        <div class="flex justify-center space-x-6">
          <!-- Small -->
          <ntv-popover size="sm" placement="top">
            <button slot="trigger" class="px-3 py-2 bg-gray-500 text-white rounded text-sm">
              Small
            </button>
            <div slot="content">
              <p>Compact content</p>
            </div>
          </ntv-popover>
          
          <!-- Medium -->
          <ntv-popover size="md" placement="top">
            <button slot="trigger" class="px-4 py-2 bg-blue-500 text-white rounded">
              Medium
            </button>
            <div slot="content">
              <p>Standard content size with more space for information.</p>
            </div>
          </ntv-popover>
          
          <!-- Large -->
          <ntv-popover size="lg" placement="top">
            <button slot="trigger" class="px-4 py-2 bg-purple-500 text-white rounded">
              Large
            </button>
            <div slot="content">
              <h4 class="font-semibold mb-2">Large Popover</h4>
              <p>More spacious content area with room for detailed information and multiple elements.</p>
            </div>
          </ntv-popover>
          
          <!-- Extra Large -->
          <ntv-popover size="xl" placement="top">
            <button slot="trigger" class="px-4 py-2 bg-green-500 text-white rounded">
              Extra Large
            </button>
            <div slot="content">
              <h4 class="font-semibold mb-3">Extra Large Popover</h4>
              <p class="mb-3">Maximum content space for detailed information, forms, or complex layouts.</p>
              <div class="space-y-2">
                <div class="flex items-center space-x-2">
                  <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span class="text-sm">Feature one</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span class="text-sm">Feature two</span>
                </div>
              </div>
            </div>
          </ntv-popover>
        </div>
      </div>
    `,
  }),
};

export const RichContent: Story = {
  render: () => ({
    template: `
      <div class="flex justify-center items-center min-h-[300px]">
        <ntv-popover placement="bottom" size="lg" variant="shadow">
          <button slot="trigger" class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
            👤 User Profile
          </button>
          <div slot="content">
            <div class="flex items-start space-x-4">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                JD
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900 dark:text-white text-lg">John Doe</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Senior Software Engineer</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">📍 San Francisco, CA</p>
                
                <div class="flex items-center space-x-4 mb-3 text-xs text-gray-600 dark:text-gray-300">
                  <div class="flex items-center space-x-1">
                    <span>⭐</span>
                    <span>4.9 rating</span>
                  </div>
                  <div class="flex items-center space-x-1">
                    <span>📊</span>
                    <span>127 projects</span>
                  </div>
                </div>
                
                <div class="flex space-x-2">
                  <button class="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors">
                    View Profile
                  </button>
                  <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ntv-popover>
      </div>
    `,
  }),
};

export const WithoutArrow: Story = {
  render: () => ({
    template: `
      <div class="flex justify-center space-x-6">
        <ntv-popover placement="top" [showArrow]="true">
          <button slot="trigger" class="px-4 py-2 bg-blue-500 text-white rounded">
            With Arrow
          </button>
          <div slot="content">
            <p class="text-sm">This popover shows an arrow indicator.</p>
          </div>
        </ntv-popover>
        
        <ntv-popover placement="top" [showArrow]="false">
          <button slot="trigger" class="px-4 py-2 bg-gray-500 text-white rounded">
            No Arrow
          </button>
          <div slot="content">
            <p class="text-sm">This popover doesn't show an arrow indicator.</p>
          </div>
        </ntv-popover>
      </div>
    `,
  }),
};

export const CustomOffsetAndDelay: Story = {
  render: () => ({
    template: `
      <div class="space-y-8">
        <div class="text-center">
          <h3 class="text-lg font-semibold mb-2">Custom Offset & Delay</h3>
          <p class="text-gray-600">Fine-tune positioning and timing</p>
        </div>
        
        <div class="flex justify-center space-x-8">
          <div class="text-center">
            <h4 class="font-medium mb-3">Default Offset (8px)</h4>
            <ntv-popover placement="top" trigger="hover" [offset]="8">
              <button slot="trigger" class="px-4 py-2 bg-blue-500 text-white rounded">
                Hover me
              </button>
              <div slot="content">
                <p class="text-sm">Standard 8px offset from trigger</p>
              </div>
            </ntv-popover>
          </div>
          
          <div class="text-center">
            <h4 class="font-medium mb-3">Large Offset (24px)</h4>
            <ntv-popover placement="top" trigger="hover" [offset]="24">
              <button slot="trigger" class="px-4 py-2 bg-purple-500 text-white rounded">
                Hover me
              </button>
              <div slot="content">
                <p class="text-sm">Larger 24px offset for more space</p>
              </div>
            </ntv-popover>
          </div>
          
          <div class="text-center">
            <h4 class="font-medium mb-3">Delayed (500ms)</h4>
            <ntv-popover placement="top" trigger="hover" [delay]="500">
              <button slot="trigger" class="px-4 py-2 bg-green-500 text-white rounded">
                Hover me
              </button>
              <div slot="content">
                <p class="text-sm">Appears after 500ms delay</p>
              </div>
            </ntv-popover>
          </div>
        </div>
      </div>
    `,
  }),
};

export const DisabledState: Story = {
  render: () => ({
    template: `
      <div class="flex justify-center space-x-6">
        <ntv-popover placement="top" [disabled]="false">
          <button slot="trigger" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Enabled Popover
          </button>
          <div slot="content">
            <p class="text-sm">This popover is enabled and will show.</p>
          </div>
        </ntv-popover>
        
        <ntv-popover placement="top" [disabled]="true">
          <button slot="trigger" class="px-4 py-2 bg-gray-400 text-gray-600 rounded cursor-not-allowed">
            Disabled Popover
          </button>
          <div slot="content">
            <p class="text-sm">This popover is disabled and won't show.</p>
          </div>
        </ntv-popover>
      </div>
    `,
  }),
};
