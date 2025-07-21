import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Popover } from './popover';

/**
 * Demo component showing how to use the Popover component
 * 
 * This demonstrates the exact usage pattern requested by the user:
 * - Button with (click)="op.toggle($event)"
 * - ntv-popover component with content projection
 * - Different placement options
 */
@Component({
  selector: 'ntv-popover-demo',
  standalone: true,
  imports: [CommonModule, Popover],
  template: `
    <div class="p-8 space-y-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Popover Component Demo</h2>
      
      <!-- Basic Usage Example -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Basic Usage</h3>
        <div class="flex gap-4 items-center">
          <button 
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            (click)="op.toggle($event)">
            Click to toggle popover
          </button>
          
          <ntv-popover #op placement="bottom">
            <div class="space-y-2">
              <h4 class="font-semibold">Popover Title</h4>
              <p>This is the popover content. You can put any content you want here!</p>
            </div>
          </ntv-popover>
        </div>
      </div>
      
      <!-- Different Placements -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Different Placements</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <!-- Top -->
          <div>
            <button 
              class="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors w-full"
              (click)="topPopover.toggle($event)">
              Top
            </button>
            <ntv-popover #topPopover placement="top">
              <p>Top placement popover</p>
            </ntv-popover>
          </div>
          
          <!-- Top Start -->
          <div>
            <button 
              class="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors w-full"
              (click)="topStartPopover.toggle($event)">
              Top Start
            </button>
            <ntv-popover #topStartPopover placement="top-start">
              <p>Top start placement</p>
            </ntv-popover>
          </div>
          
          <!-- Top End -->
          <div>
            <button 
              class="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors w-full"
              (click)="topEndPopover.toggle($event)">
              Top End
            </button>
            <ntv-popover #topEndPopover placement="top-end">
              <p>Top end placement</p>
            </ntv-popover>
          </div>
          
          <!-- Bottom -->
          <div>
            <button 
              class="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors w-full"
              (click)="bottomPopover.toggle($event)">
              Bottom
            </button>
            <ntv-popover #bottomPopover placement="bottom">
              <p>Bottom placement popover</p>
            </ntv-popover>
          </div>
          
          <!-- Bottom Start -->
          <div>
            <button 
              class="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors w-full"
              (click)="bottomStartPopover.toggle($event)">
              Bottom Start
            </button>
            <ntv-popover #bottomStartPopover placement="bottom-start">
              <p>Bottom start placement</p>
            </ntv-popover>
          </div>
          
          <!-- Bottom End -->
          <div>
            <button 
              class="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors w-full"
              (click)="bottomEndPopover.toggle($event)">
              Bottom End
            </button>
            <ntv-popover #bottomEndPopover placement="bottom-end">
              <p>Bottom end placement</p>
            </ntv-popover>
          </div>
          
          <!-- Left -->
          <div>
            <button 
              class="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors w-full"
              (click)="leftPopover.toggle($event)">
              Left
            </button>
            <ntv-popover #leftPopover placement="left">
              <p>Left placement popover</p>
            </ntv-popover>
          </div>
          
          <!-- Right -->
          <div>
            <button 
              class="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors w-full"
              (click)="rightPopover.toggle($event)">
              Right
            </button>
            <ntv-popover #rightPopover placement="right">
              <p>Right placement popover</p>
            </ntv-popover>
          </div>
        </div>
      </div>
      
      <!-- Rich Content Example -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Rich Content Example</h3>
        <div>
          <button 
            class="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
            (click)="richPopover.toggle($event)">
            Rich Content Popover
          </button>
          
          <ntv-popover #richPopover placement="bottom" [config]="{ maxWidth: '400px' }">
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span class="text-white font-bold">🚀</span>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-gray-100">Feature Update</h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400">New popover component</p>
                </div>
              </div>
              
              <div class="border-t border-gray-200 dark:border-gray-700 pt-3">
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  The new popover component supports all placement options and can contain any content you want!
                </p>
                
                <div class="flex gap-2">
                  <button class="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Learn More</button>
                  <button class="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" (click)="richPopover.hide()">Close</button>
                </div>
              </div>
            </div>
          </ntv-popover>
        </div>
      </div>
      
      <!-- Configuration Pattern Example -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Configuration Pattern</h3>
        <div>
          <button 
            class="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
            (click)="configPopover.toggle($event)">
            Config Pattern (No Arrow)
          </button>
          
          <ntv-popover 
            #configPopover 
            [config]="{
              placement: 'top',
              arrow: false,
              offset: 12,
              maxWidth: '350px'
            }">
            <div class="text-center space-y-2">
              <h4 class="font-semibold">Configuration Example</h4>
              <p class="text-sm">This popover uses the config pattern with no arrow and custom offset.</p>
            </div>
          </ntv-popover>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    
    @media (prefers-color-scheme: dark) {
      :host {
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      }
    }
  `]
})
export class PopoverDemoComponent {}