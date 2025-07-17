import type { Meta, StoryObj } from '@storybook/angular';
import { Accordion } from './accordion';
import { Component } from '@angular/core';

const meta: Meta<Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A simple accordion component with ng-content projection for header and body.

## Features
- Multiple visual variants (default, bordered, flush)
- Flexible sizing options (sm, md, lg)
- Toggle functionality
- Smooth animations
- Custom icons and styling
- Accessibility features
- Named content projection with slots
        `,
      },
    },
  },
  argTypes: {
    variant: {
      description: 'Visual style variant of the accordion',
      control: { type: 'select' },
      options: ['default', 'bordered', 'flush'],
    },
    size: {
      description: 'Size of the accordion',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    initialOpen: {
      description: 'Whether the accordion is initially open',
      control: { type: 'boolean' },
    },
    animated: {
      description: 'Whether to show smooth animations',
      control: { type: 'boolean' },
    },
    showIcons: {
      description: 'Whether to show expand/collapse icons',
      control: { type: 'boolean' },
    },
    group: {
      description:
        'Group name for exclusive behavior - accordions with the same group name will be exclusive',
      control: { type: 'text' },
    },
  },
};

export const Simple: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ntv-accordion 
        [variant]="variant" 
        [size]="size" 
        [initialOpen]="initialOpen" 
        [animated]="animated" 
        [showIcons]="showIcons"
        [group]="group">
        <div slot="header">What is Angular?</div>
        <div slot="body">
          Angular is a platform and framework for building single-page client applications using HTML and TypeScript.
          It implements core and optional functionality as a set of TypeScript libraries that you import into your applications.
        </div>
      </ntv-accordion>
    `,
  }),
  args: {
    variant: 'default',
    size: 'md',
    initialOpen: false,
    animated: true,
    showIcons: true,
    group: '',
  },
};

export const MultipleAccordions: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-6 max-w-4xl">
        <!-- Tutorial Section -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-blue-900 mb-3">📖 How to Use Exclusive Groups</h3>
          <div class="space-y-3 text-sm text-blue-800">
              <p><strong>Independent Accordions:</strong> When group is empty or undefined, accordions work independently - multiple can be open simultaneously.</p>
              <p><strong>Exclusive Groups:</strong> When group has any value (e.g., <code class="bg-blue-100 px-1 rounded">"my-group"</code>), only one accordion can be open at a time.</p>
              <div class="bg-blue-100 rounded p-3 mt-3">
                <p class="font-medium mb-2">💡 Try it below:</p>
                <p>• Type any group name to enable exclusive behavior</p>
                <p>• Clear the group field to allow multiple accordions open</p>
                <p>• Accordions with the same group name will be exclusive to each other</p>
              </div>
            </div>
        </div>

        <!-- Accordions with Group Behavior -->
        <div class="space-y-4">
          <ntv-accordion 
            [variant]="variant" 
            [size]="size" 
            [initialOpen]="true" 
            [animated]="animated" 
            [showIcons]="showIcons"
            >
            <div slot="header">
              <div class="flex items-center space-x-2">
                <span class="text-blue-600">📚</span>
                <span class="font-medium">Getting Started</span>
                <span class="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Beginner</span>
              </div>
            </div>
            <div slot="body">
              <div class="prose prose-sm max-w-none">
                <p class="text-gray-700 mb-3">Welcome to our comprehensive guide! This section covers the fundamentals you need to know.</p>
                <ul class="list-disc list-inside space-y-1 text-gray-600">
                  <li>Installation and setup</li>
                  <li>Basic configuration</li>
                  <li>Your first project</li>
                </ul>
                <div class="bg-gray-100 p-3 rounded mt-3">
                   <p class="text-xs text-gray-600">💡 <strong>Group:</strong> None (independent)</p>
                 </div>
              </div>
            </div>
          </ntv-accordion>

          <ntv-accordion 
            [variant]="variant" 
            [size]="size" 
            [initialOpen]="false" 
            [animated]="animated" 
            [showIcons]="showIcons"
            [group]="group">
            <div slot="header">
              <div class="flex items-center space-x-2">
                <span class="text-green-600">⚙️</span>
                <span class="font-medium">Advanced Configuration</span>
                <span class="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Intermediate</span>
              </div>
            </div>
            <div slot="body">
              <div class="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 class="font-semibold text-gray-800 mb-2">Configuration Options</h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="font-medium text-gray-700">Environment:</span>
                    <span class="text-gray-600">Production</span>
                  </div>
                  <div>
                    <span class="font-medium text-gray-700">Debug Mode:</span>
                    <span class="text-gray-600">Disabled</span>
                  </div>
                </div>
              </div>
              <p class="text-gray-700">Learn how to customize and optimize your setup for production environments.</p>
              <div class="bg-gray-100 p-3 rounded mt-3">
                 <p class="text-xs text-gray-600">💡 <strong>Group:</strong> {{ group || 'None (independent)' }}</p>
               </div>
            </div>
          </ntv-accordion>

          <ntv-accordion 
            [variant]="variant" 
            [size]="size" 
            [initialOpen]="false" 
            [animated]="animated" 
            [showIcons]="showIcons"
            [group]="group">
            <div slot="header">
              <div class="flex items-center space-x-2">
                <span class="text-purple-600">🚀</span>
                <span class="font-medium">Deployment & Scaling</span>
                <span class="ml-auto bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Advanced</span>
              </div>
            </div>
            <div slot="body">
              <div class="space-y-4">
                <div class="border-l-4 border-purple-500 pl-4">
                  <h4 class="font-semibold text-gray-800">Deployment Strategies</h4>
                  <p class="text-gray-600 text-sm mt-1">Choose the right deployment approach for your needs.</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div class="bg-white border border-gray-200 rounded-lg p-3">
                    <h5 class="font-medium text-gray-800">Cloud Deployment</h5>
                    <p class="text-xs text-gray-600 mt-1">Scalable and managed infrastructure</p>
                  </div>
                  <div class="bg-white border border-gray-200 rounded-lg p-3">
                    <h5 class="font-medium text-gray-800">On-Premise</h5>
                    <p class="text-xs text-gray-600 mt-1">Full control over your environment</p>
                  </div>
                </div>
                <div class="bg-gray-100 p-3 rounded">
                   <p class="text-xs text-gray-600">💡 <strong>Group:</strong> {{ group || 'None (independent)' }}</p>
                 </div>
              </div>
            </div>
          </ntv-accordion>

          <ntv-accordion 
            [variant]="variant" 
            [size]="size" 
            [initialOpen]="false" 
            [animated]="animated" 
            [showIcons]="showIcons"
            [group]="group">
            <div slot="header">
              <div class="flex items-center space-x-2">
                <span class="text-red-600">🛠️</span>
                <span class="font-medium">Troubleshooting</span>
                <span class="ml-auto bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Support</span>
              </div>
            </div>
            <div slot="body">
              <div class="space-y-3">
                <div class="bg-red-50 border border-red-200 rounded-lg p-3">
                  <h4 class="font-medium text-red-800 flex items-center">
                    <span class="mr-2">⚠️</span>
                    Common Issues
                  </h4>
                  <ul class="mt-2 text-sm text-red-700 space-y-1">
                    <li>• Connection timeouts</li>
                    <li>• Configuration errors</li>
                    <li>• Performance bottlenecks</li>
                  </ul>
                </div>
                <div class="flex space-x-2">
                  <button class="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">
                    Contact Support
                  </button>
                  <button class="px-3 py-1 border border-red-600 text-red-600 text-xs rounded hover:bg-red-50">
                    View Docs
                  </button>
                </div>
                <div class="bg-gray-100 p-3 rounded">
                   <p class="text-xs text-gray-600">💡 <strong>Group:</strong> {{ group || 'None (independent)' }}</p>
                 </div>
              </div>
            </div>
          </ntv-accordion>
        </div>
      </div>
    `,
  }),
  args: {
    variant: 'bordered',
    size: 'md',
    initialOpen: false,
    animated: true,
    showIcons: true,
    group: 'exclusive-group',
  },
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates multiple accordions with exclusive group behavior and includes an interactive tutorial.
This example shows how to use the \`group\` property to control accordion behavior:

**Key Features:**
- **Tutorial Section**: Explains how group behavior works
- **Interactive Demo**: Change the group control to see different behaviors
- **Visual Indicators**: Each accordion shows its current group assignment
- **Exclusive Behavior**: When group is set, only one accordion can be open at a time

**Try This:**
 1. Clear the group field - accordions work independently (multiple can be open)
 2. Type any group name (e.g., \`"my-group"\`) - exclusive behavior (only one can be open)
 3. Change or clear the group name to see the difference in behavior
        `,
      },
    },
  },
};

export const Stylized: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="max-w-3xl mx-auto">
        <div class="bg-white shadow-lg rounded-xl overflow-hidden">
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <h2 class="text-xl font-bold text-white">Premium Features</h2>
            <p class="text-blue-100 text-sm mt-1">Explore our advanced capabilities</p>
          </div>
          
          <div class="divide-y divide-gray-200">
            <ntv-accordion 
              [variant]="'flush'" 
              [size]="size" 
              [initialOpen]="true" 
              [animated]="animated" 
              [showIcons]="showIcons">
              <div slot="header">
                <div class="flex items-center justify-between w-full px-6 py-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span class="text-blue-600 text-lg">🎯</span>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900">Smart Analytics</h3>
                      <p class="text-sm text-gray-500">Real-time insights and reporting</p>
                    </div>
                  </div>
                  <div class="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                    NEW
                  </div>
                </div>
              </div>
              <div slot="body">
                <div class="px-6 pb-6">
                  <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
                    <div class="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div class="text-2xl font-bold text-blue-600">98%</div>
                        <div class="text-xs text-gray-600">Accuracy</div>
                      </div>
                      <div>
                        <div class="text-2xl font-bold text-blue-600">24/7</div>
                        <div class="text-xs text-gray-600">Monitoring</div>
                      </div>
                      <div>
                        <div class="text-2xl font-bold text-blue-600">< 1s</div>
                        <div class="text-xs text-gray-600">Response</div>
                      </div>
                    </div>
                  </div>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    Get comprehensive insights into your data with our advanced analytics engine. 
                    Track performance metrics, user behavior, and business KPIs in real-time.
                  </p>
                </div>
              </div>
            </ntv-accordion>

            <ntv-accordion 
              [variant]="'flush'" 
              [size]="size" 
              [initialOpen]="false" 
              [animated]="animated" 
              [showIcons]="showIcons">
              <div slot="header">
                <div class="flex items-center justify-between w-full px-6 py-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span class="text-green-600 text-lg">🔒</span>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900">Enterprise Security</h3>
                      <p class="text-sm text-gray-500">Bank-grade protection</p>
                    </div>
                  </div>
                  <div class="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                    SECURE
                  </div>
                </div>
              </div>
              <div slot="body">
                <div class="px-6 pb-6">
                  <div class="space-y-3">
                    <div class="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <span class="text-green-600">✓</span>
                      <span class="text-sm text-gray-700">End-to-end encryption</span>
                    </div>
                    <div class="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <span class="text-green-600">✓</span>
                      <span class="text-sm text-gray-700">Multi-factor authentication</span>
                    </div>
                    <div class="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <span class="text-green-600">✓</span>
                      <span class="text-sm text-gray-700">SOC 2 Type II compliance</span>
                    </div>
                  </div>
                </div>
              </div>
            </ntv-accordion>

            <ntv-accordion 
              [variant]="'flush'" 
              [size]="size" 
              [initialOpen]="false" 
              [animated]="animated" 
              [showIcons]="showIcons">
              <div slot="header">
                <div class="flex items-center justify-between w-full px-6 py-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span class="text-purple-600 text-lg">⚡</span>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900">Performance Optimization</h3>
                      <p class="text-sm text-gray-500">Lightning-fast processing</p>
                    </div>
                  </div>
                  <div class="bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                    FAST
                  </div>
                </div>
              </div>
              <div slot="body">
                <div class="px-6 pb-6">
                  <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                    <h4 class="font-semibold text-gray-800 mb-3">Performance Metrics</h4>
                    <div class="space-y-2">
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Load Time</span>
                        <div class="flex items-center space-x-2">
                          <div class="w-24 bg-gray-200 rounded-full h-2">
                            <div class="bg-purple-600 h-2 rounded-full" style="width: 95%"></div>
                          </div>
                          <span class="text-xs text-gray-500">0.3s</span>
                        </div>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Throughput</span>
                        <div class="flex items-center space-x-2">
                          <div class="w-24 bg-gray-200 rounded-full h-2">
                            <div class="bg-purple-600 h-2 rounded-full" style="width: 88%"></div>
                          </div>
                          <span class="text-xs text-gray-500">10k/s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ntv-accordion>
          </div>
        </div>
      </div>
    `,
  }),
  args: {
    variant: 'flush',
    size: 'lg',
    initialOpen: false,
    animated: true,
    showIcons: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
A Stylized design showcasing professional styling with gradients, cards, progress bars, and modern UI elements.
This example demonstrates how to create visually appealing accordion interfaces for enterprise applications.
        `,
      },
    },
  },
};

export const ExclusiveGroup: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="max-w-2xl space-y-2">
        <ntv-accordion 
          [variant]="variant" 
          [size]="size" 
          [animated]="animated" 
          [showIcons]="showIcons"
          group="setup-wizard">
          <div slot="header">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-blue-600 text-sm font-semibold">1</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Account Setup</h3>
                <p class="text-sm text-gray-500">Create your profile and preferences</p>
              </div>
            </div>
          </div>
          <div slot="body">
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your name">
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email">
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <input type="checkbox" id="terms" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                <label for="terms" class="text-sm text-gray-600">I agree to the terms and conditions</label>
              </div>
            </div>
          </div>
        </ntv-accordion>

        <ntv-accordion 
          [variant]="variant" 
          [size]="size" 
          [animated]="animated" 
          [showIcons]="showIcons"
          group="setup-wizard">
          <div slot="header">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-green-600 text-sm font-semibold">2</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Security Settings</h3>
                <p class="text-sm text-gray-500">Configure your security preferences</p>
              </div>
            </div>
          </div>
          <div slot="body">
            <div class="space-y-4">
              <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div class="flex items-start space-x-3">
                  <span class="text-yellow-600">⚠️</span>
                  <div>
                    <h4 class="font-medium text-yellow-800">Security Recommendation</h4>
                    <p class="text-sm text-yellow-700 mt-1">Enable two-factor authentication for enhanced security.</p>
                  </div>
                </div>
              </div>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="font-medium text-gray-900">Two-Factor Authentication</h4>
                    <p class="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                  <button class="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                    Enable
                  </button>
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="font-medium text-gray-900">Login Notifications</h4>
                    <p class="text-sm text-gray-500">Get notified of new sign-ins</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer" checked>
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </ntv-accordion>

        <ntv-accordion 
          [variant]="variant" 
          [size]="size" 
          [animated]="animated" 
          [showIcons]="showIcons"
          group="setup-wizard">
          <div slot="header">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span class="text-purple-600 text-sm font-semibold">3</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Notification Preferences</h3>
                <p class="text-sm text-gray-500">Choose how you want to be notified</p>
              </div>
            </div>
          </div>
          <div slot="body">
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="text-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer">
                  <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span class="text-purple-600">📧</span>
                  </div>
                  <h4 class="font-medium text-gray-900">Email</h4>
                  <p class="text-xs text-gray-500 mt-1">Daily summaries</p>
                </div>
                <div class="text-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer">
                  <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span class="text-purple-600">📱</span>
                  </div>
                  <h4 class="font-medium text-gray-900">Push</h4>
                  <p class="text-xs text-gray-500 mt-1">Instant alerts</p>
                </div>
                <div class="text-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer">
                  <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span class="text-purple-600">💬</span>
                  </div>
                  <h4 class="font-medium text-gray-900">SMS</h4>
                  <p class="text-xs text-gray-500 mt-1">Critical only</p>
                </div>
              </div>
              <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 class="font-medium text-purple-800 mb-2">Notification Types</h4>
                <div class="space-y-2">
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" class="rounded border-gray-300 text-purple-600 focus:ring-purple-500" checked>
                    <span class="text-sm text-purple-700">Account activity</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" class="rounded border-gray-300 text-purple-600 focus:ring-purple-500">
                    <span class="text-sm text-purple-700">Product updates</span>
                  </label>
                  <label class="flex items-center space-x-2">
                    <input type="checkbox" class="rounded border-gray-300 text-purple-600 focus:ring-purple-500" checked>
                    <span class="text-sm text-purple-700">Security alerts</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </ntv-accordion>

        <ntv-accordion 
          [variant]="variant" 
          [size]="size" 
          [animated]="animated" 
          [showIcons]="showIcons"
          group="setup-wizard">
          <div slot="header">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-green-600">✓</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Complete Setup</h3>
                <p class="text-sm text-gray-500">Review and finish your configuration</p>
              </div>
            </div>
          </div>
          <div slot="body">
            <div class="space-y-4">
              <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <div class="flex items-center space-x-3">
                  <span class="text-green-600 text-xl">🎉</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Almost Done!</h4>
                    <p class="text-sm text-green-700">Your account is ready to use.</p>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Profile:</span>
                  <span class="text-green-600 font-medium">Complete</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Security:</span>
                  <span class="text-green-600 font-medium">Configured</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Notifications:</span>
                  <span class="text-green-600 font-medium">Set</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Status:</span>
                  <span class="text-green-600 font-medium">Active</span>
                </div>
              </div>
              <div class="flex space-x-3 pt-4">
                <button class="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium">
                  Complete Setup
                </button>
                <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                  Review
                </button>
              </div>
            </div>
          </div>
        </ntv-accordion>
      </div>
    `,
  }),
  args: {
    variant: 'bordered',
    size: 'md',
    animated: true,
    showIcons: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates exclusive accordion behavior where only one accordion can be open at a time.
This is perfect for step-by-step processes, setup wizards, or any interface where you want to focus user attention on one section.
Notice how opening one accordion automatically closes the others, and the arrow icons now rotate properly.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<Accordion>;

export const Bordered: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ntv-accordion 
        [variant]="variant" 
        [size]="size" 
        [initialOpen]="initialOpen" 
        [animated]="animated" 
        [showIcons]="showIcons">
        <div slot="header">Getting Started with TypeScript</div>
        <div slot="body">
          TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
          It adds optional static type definitions to JavaScript, enabling better IDE support and catching errors at compile time.
        </div>
      </ntv-accordion>
    `,
  }),
  args: {
    variant: 'bordered',
    size: 'md',
    initialOpen: true,
    animated: true,
    showIcons: true,
  },
};

export const Flush: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ntv-accordion 
        [variant]="variant" 
        [size]="size" 
        [initialOpen]="initialOpen" 
        [animated]="animated" 
        [showIcons]="showIcons">
        <div slot="header">Component Architecture</div>
        <div slot="body">
          Components are the fundamental building blocks of Angular applications. A component controls a patch of screen called a view.
          You define a component's application logic inside a class, which interacts with the view through an API of properties and methods.
        </div>
      </ntv-accordion>
    `,
  }),
  args: {
    variant: 'flush',
    size: 'md',
    initialOpen: false,
    animated: true,
    showIcons: true,
  },
};

export const Small: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ntv-accordion 
        [variant]="variant" 
        [size]="size" 
        [initialOpen]="initialOpen" 
        [animated]="animated" 
        [showIcons]="showIcons">
        <div slot="header">Small Accordion</div>
        <div slot="body">
          This is a small-sized accordion with compact spacing and typography.
        </div>
      </ntv-accordion>
    `,
  }),
  args: {
    variant: 'default',
    size: 'sm',
    initialOpen: false,
    animated: true,
    showIcons: true,
  },
};

export const Large: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ntv-accordion 
        [variant]="variant" 
        [size]="size" 
        [initialOpen]="initialOpen" 
        [animated]="animated" 
        [showIcons]="showIcons">
        <div slot="header">Large Accordion</div>
        <div slot="body">
          This is a large-sized accordion with generous spacing and larger typography for better readability.
        </div>
      </ntv-accordion>
    `,
  }),
  args: {
    variant: 'default',
    size: 'lg',
    initialOpen: true,
    animated: true,
    showIcons: true,
  },
};

export const WithoutIcons: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ntv-accordion 
        [variant]="variant" 
        [size]="size" 
        [initialOpen]="initialOpen" 
        [animated]="animated" 
        [showIcons]="showIcons">
        <div slot="header">Accordion Without Icons</div>
        <div slot="body">
          This accordion doesn't show expand/collapse icons, providing a cleaner look.
        </div>
      </ntv-accordion>
    `,
  }),
  args: {
    variant: 'default',
    size: 'md',
    initialOpen: false,
    animated: true,
    showIcons: false,
  },
};

export const WithoutAnimation: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ntv-accordion 
        [variant]="variant" 
        [size]="size" 
        [initialOpen]="initialOpen" 
        [animated]="animated" 
        [showIcons]="showIcons">
        <div slot="header">No Animation</div>
        <div slot="body">
          This accordion toggles instantly without smooth animations.
        </div>
      </ntv-accordion>
    `,
  }),
  args: {
    variant: 'default',
    size: 'md',
    initialOpen: false,
    animated: false,
    showIcons: true,
  },
};

export const RichContent: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ntv-accordion 
        [variant]="variant" 
        [size]="size" 
        [initialOpen]="initialOpen" 
        [animated]="animated" 
        [showIcons]="showIcons">
        <div slot="header">
          <div class="flex items-center space-x-2">
            <span class="text-purple-600">👤</span>
            <span>User Profile</span>
            <span class="ml-auto bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Premium</span>
          </div>
        </div>
        <div slot="body">
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                JD
              </div>
              <div>
                <h3 class="font-semibold text-lg">John Doe</h3>
                <p class="text-gray-600">Senior Developer</p>
                <p class="text-sm text-gray-500">john.doe&#64;example.com</p>
              </div>
            </div>
            <div class="mt-4 flex space-x-2">
              <button class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">
                Edit Profile
              </button>
              <button class="px-4 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-50 text-sm">
                View Details
              </button>
            </div>
          </div>
        </div>
      </ntv-accordion>
    `,
  }),
  args: {
    variant: 'flush',
    size: 'lg',
    initialOpen: true,
    animated: true,
    showIcons: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates complex content layout within accordion panels using ng-content slots.
This approach shows how to create rich, visually appealing content directly within the accordion.
        `,
      },
    },
  },
};
