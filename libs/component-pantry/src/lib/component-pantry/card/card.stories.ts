import type { Meta, StoryObj } from '@storybook/angular';
import { Card } from './card';
import { CardConfig } from './card.types';
import { Button } from '../button/button';

const meta: Meta<Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `

A flexible and customizable card component with comprehensive styling options.

## Features
- Visual variants (default, elevated, outlined, filled)
- Content-driven sizing (no artificial size constraints)
- Flexible border radius options
- Shadow customization (none, sm, md, lg, xl)
- Custom background and border colors
- Gradient support
- Hover effects and clickable states
- Full-width layout option
- DRY configuration pattern
- Content projection with ng-content
- Responsive design support

## Usage

### Basic Usage
\`\`\`html
<ntv-card variant="elevated" shadow="md">
  <p>Card content goes here</p>
</ntv-card>
\`\`\`

### DRY Config Pattern
\`\`\`html
<ntv-card [config]="cardConfig">
  <div>Dynamic card content</div>
</ntv-card>
\`\`\`

### Clickable Card
\`\`\`html
<ntv-card 
  [config]="{ clickable: true, hoverEffect: true, variant: 'outlined' }"
  (cardClick)="handleCardClick($event)">
  <h3>Clickable Card</h3>
</ntv-card>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined', 'filled'],
      description: 'Visual variant of the card',
    },
    rounded: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Border radius style',
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Shadow intensity',
    },

    backgroundColor: {
      control: { type: 'color' },
      description: 'Custom background color',
    },
    borderColor: {
      control: { type: 'color' },
      description: 'Custom border color',
    },
    gradient: {
      control: { type: 'text' },
      description:
        'CSS gradient background (takes priority over backgroundColor)',
    },
    hoverEffect: {
      control: { type: 'boolean' },
      description: 'Whether to apply hover effects',
    },
    clickable: {
      control: { type: 'boolean' },
      description: 'Whether the card is clickable',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether the card should take full width',
    },
    config: {
      control: { type: 'object' },
      description: 'Configuration object for DRY usage',
    },
  },
  args: {
    variant: 'default',
    rounded: 'md',
    shadow: 'sm',

    backgroundColor: '',
    borderColor: '',
    gradient: '',
    hoverEffect: false,
    clickable: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<Card>;

// Default story
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ntv-card 
        [variant]="variant"
        [rounded]="rounded"
        [shadow]="shadow"

        [backgroundColor]="backgroundColor"
        [borderColor]="borderColor"
        [gradient]="gradient"
        [hoverEffect]="hoverEffect"
        [clickable]="clickable"
        [fullWidth]="fullWidth"
        (cardClick)="onCardClick($event)">
        <div style="padding: 24px;">
          <div style="display: flex; align-items: center; margin-bottom: 12px;">
            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="white"/>
              </svg>
            </div>
            <div>
              <h3 style="margin: 0 0 4px 0; color: #1f2937; font-size: 18px; font-weight: 600;">Premium Card</h3>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Enhanced with beautiful styling</p>
            </div>
          </div>
          <p style="margin: 0 0 16px 0; color: #4b5563; line-height: 1.6;">This is a beautifully styled card with enhanced content presentation. The card supports gradients, custom colors, and rich content layouts.</p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <span style="background: #dbeafe; color: #1e40af; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;">✨ Enhanced</span>
            <span style="background: #dcfce7; color: #166534; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;">🎨 Stylized</span>
            <span style="background: #fef3c7; color: #92400e; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;">🚀 Modern</span>
          </div>
        </div>
      </ntv-card>
    `,
    methods: {
      onCardClick: (event: Event) => {
        console.log('Card clicked:', event);
      },
    },
  }),
};

// Content-driven sizing demonstration
export const ContentDrivenSizing: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-start;">
        <ntv-card variant="outlined" rounded="lg">
          <div style="text-align: center; padding: 12px;">
            <div style="font-size: 20px; margin-bottom: 4px;">📱</div>
            <div style="font-weight: 600; color: #374151; font-size: 12px;">Compact</div>
          </div>
        </ntv-card>
        <ntv-card variant="outlined" rounded="lg">
          <div style="text-align: center; padding: 16px;">
            <div style="font-size: 24px; margin-bottom: 6px;">💻</div>
            <div style="font-weight: 600; color: #374151; font-size: 14px;">Small Content</div>
            <div style="color: #6b7280; font-size: 12px;">Naturally sized</div>
          </div>
        </ntv-card>
        <ntv-card variant="outlined" rounded="lg">
          <div style="text-align: center; padding: 20px;">
            <div style="font-size: 28px; margin-bottom: 8px;">🖥️</div>
            <div style="font-weight: 600; color: #374151; font-size: 16px;">Medium Content</div>
            <div style="color: #6b7280; font-size: 14px;">Adapts to content size</div>
            <div style="color: #9ca3af; font-size: 12px; margin-top: 4px;">No artificial constraints</div>
          </div>
        </ntv-card>
        <ntv-card variant="outlined" rounded="lg">
          <div style="text-align: center; padding: 24px;">
            <div style="font-size: 32px; margin-bottom: 10px;">📺</div>
            <div style="font-weight: 600; color: #374151; font-size: 18px;">Larger Content</div>
            <div style="color: #6b7280; font-size: 16px;">Content drives the size</div>
            <div style="color: #9ca3af; font-size: 12px; margin-top: 4px;">Perfect for responsive design</div>
            <div style="color: #9ca3af; font-size: 12px;">Flexible and natural</div>
          </div>
        </ntv-card>
       </div>
     `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Cards that size naturally based on their content without artificial constraints.',
      },
    },
  },
};

// Visual variants
export const VisualVariants: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">
        <ntv-card variant="default" rounded="lg">
          <div style="padding: 20px;">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <div style="width: 40px; height: 40px; background: #f3f4f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                <span style="font-size: 20px;">📄</span>
              </div>
              <div>
                <h4 style="margin: 0 0 4px 0; color: #1f2937; font-weight: 600;">Default</h4>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">Standard border style</p>
              </div>
            </div>
            <p style="margin: 0; color: #4b5563; line-height: 1.5;">Clean and minimal design with subtle border styling.</p>
          </div>
        </ntv-card>
        <ntv-card variant="elevated" rounded="lg">
          <div style="padding: 20px;">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                <span style="font-size: 20px;">✨</span>
              </div>
              <div>
                <h4 style="margin: 0 0 4px 0; color: #1f2937; font-weight: 600;">Elevated</h4>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">Floating with shadows</p>
              </div>
            </div>
            <p style="margin: 0; color: #4b5563; line-height: 1.5;">Elevated appearance with beautiful shadow effects.</p>
          </div>
        </ntv-card>
        <ntv-card variant="outlined" rounded="lg">
          <div style="padding: 20px;">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <div style="width: 40px; height: 40px; background: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                <span style="font-size: 20px;">🔲</span>
              </div>
              <div>
                <h4 style="margin: 0 0 4px 0; color: #1f2937; font-weight: 600;">Outlined</h4>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">Prominent borders</p>
              </div>
            </div>
            <p style="margin: 0; color: #4b5563; line-height: 1.5;">Bold outline design that stands out prominently.</p>
          </div>
        </ntv-card>
        <ntv-card variant="filled" rounded="lg">
          <div style="padding: 20px;">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <div style="width: 40px; height: 40px; background: #dcfce7; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                <span style="font-size: 20px;">🎨</span>
              </div>
              <div>
                <h4 style="margin: 0 0 4px 0; color: #1f2937; font-weight: 600;">Filled</h4>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">Background filled</p>
              </div>
            </div>
            <p style="margin: 0; color: #4b5563; line-height: 1.5;">Subtle background fill for enhanced visual hierarchy.</p>
          </div>
        </ntv-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Different visual variants of the card component.',
      },
    },
  },
};

// Shadow variants
export const ShadowVariants: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 24px; padding: 24px;">
        <ntv-card shadow="none" variant="outlined">
          <div style="text-align: center; color: #6b7280; padding: 20px;">No Shadow</div>
        </ntv-card>
        <ntv-card shadow="sm">
          <div style="text-align: center; color: #6b7280; padding: 20px;">Small Shadow</div>
        </ntv-card>
        <ntv-card shadow="md">
          <div style="text-align: center; color: #6b7280; padding: 20px;">Medium Shadow</div>
        </ntv-card>
        <ntv-card shadow="lg">
          <div style="text-align: center; color: #6b7280; padding: 20px;">Large Shadow</div>
        </ntv-card>
        <ntv-card shadow="xl">
          <div style="text-align: center; color: #6b7280; padding: 20px;">Extra Large Shadow</div>
        </ntv-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Different shadow intensities for the card component.',
      },
    },
  },
};

// Border radius variants
export const BorderRadiusVariants: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 16px;">
        <ntv-card rounded="none" variant="outlined">
          <div style="text-align: center; color: #6b7280; font-size: 12px; padding: 16px;">No Radius</div>
        </ntv-card>
        <ntv-card rounded="sm" variant="outlined">
          <div style="text-align: center; color: #6b7280; font-size: 12px; padding: 16px;">Small</div>
        </ntv-card>
        <ntv-card rounded="md" variant="outlined">
          <div style="text-align: center; color: #6b7280; font-size: 12px; padding: 16px;">Medium</div>
        </ntv-card>
        <ntv-card rounded="lg" variant="outlined">
          <div style="text-align: center; color: #6b7280; font-size: 12px; padding: 16px;">Large</div>
        </ntv-card>
        <ntv-card rounded="xl" variant="outlined">
          <div style="text-align: center; color: #6b7280; font-size: 12px; padding: 16px;">Extra Large</div>
        </ntv-card>
        <ntv-card rounded="full" variant="outlined" size="xs">
          <div style="text-align: center; color: #6b7280; font-size: 12px; padding: 16px;">Full</div>
        </ntv-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Different border radius options for the card component.',
      },
    },
  },
};

// Interactive cards
export const InteractiveCards: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
        <ntv-card 
          variant="outlined" 
          hoverEffect="true" 
          rounded="lg"
          shadow="sm"
          (cardClick)="onCardClick('Hover Effect Card')">
          <div style="padding: 20px;">
            <div style="display: flex; align-items: center; margin-bottom: 16px;">
              <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                <span style="font-size: 24px;">🎯</span>
              </div>
              <div>
                <h4 style="margin: 0 0 4px 0; color: #1f2937; font-weight: 600; font-size: 18px;">Hover Effect</h4>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">Interactive hover states</p>
              </div>
            </div>
            <p style="margin: 0 0 12px 0; color: #4b5563; line-height: 1.5;">Hover over this card to see smooth animations and visual feedback.</p>
            <div style="background: #fef3c7; color: #92400e; padding: 8px 12px; border-radius: 6px; font-size: 12px; font-weight: 500;">💡 Try hovering!</div>
          </div>
        </ntv-card>
        
        <ntv-card 
          variant="elevated" 
          clickable="true" 
          hoverEffect="true"
          rounded="lg"
          shadow="md"
          (cardClick)="onCardClick('Clickable Card')">
          <div style="padding: 20px;">
            <div style="display: flex; align-items: center; margin-bottom: 16px;">
              <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                <span style="font-size: 24px;">👆</span>
              </div>
              <div>
                <h4 style="margin: 0 0 4px 0; color: #1f2937; font-weight: 600; font-size: 18px;">Clickable Card</h4>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">Full click interaction</p>
              </div>
            </div>
            <p style="margin: 0 0 12px 0; color: #4b5563; line-height: 1.5;">Click this card to trigger events and see console output.</p>
            <div style="background: #dbeafe; color: #1e40af; padding: 8px 12px; border-radius: 6px; font-size: 12px; font-weight: 500;">🖱️ Click me!</div>
          </div>
        </ntv-card>
        
        <ntv-card 
          variant="filled" 
          clickable="true" 
          hoverEffect="true"
          shadow="lg"
          rounded="lg"
          (cardClick)="onCardClick('Interactive Card')">
          <div style="padding: 20px;">
            <div style="display: flex; align-items: center; margin-bottom: 16px;">
              <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                <span style="font-size: 24px;">⚡</span>
              </div>
              <div>
                <h4 style="margin: 0 0 4px 0; color: #1f2937; font-weight: 600; font-size: 18px;">Interactive</h4>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">Combined interactions</p>
              </div>
            </div>
            <p style="margin: 0 0 12px 0; color: #4b5563; line-height: 1.5;">Experience the full interactive potential with hover and click effects.</p>
            <div style="background: #dcfce7; color: #166534; padding: 8px 12px; border-radius: 6px; font-size: 12px; font-weight: 500;">🚀 Fully interactive!</div>
          </div>
        </ntv-card>
      </div>
    `,
    methods: {
      onCardClick: (cardName: string) => {
        console.log(`${cardName} clicked!`);
        alert(`${cardName} was clicked!`);
      },
    },
  }),
  parameters: {
    docs: {
      description: {
        story: 'Interactive cards with hover effects and click handlers.',
      },
    },
  },
};

// Gradient showcase
export const GradientShowcase: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
        <ntv-card 
          variant="elevated"
          gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          shadow="lg"
          rounded="lg">
          <div style="color: white; text-align: center; padding: 24px;">
            <h3 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 700;">🌟 Purple Dream</h3>
            <p style="margin: 0; opacity: 0.9;">Beautiful purple to blue gradient</p>
          </div>
        </ntv-card>
        
        <ntv-card 
          variant="elevated"
          gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
          shadow="lg"
          rounded="lg">
          <div style="color: white; text-align: center; padding: 24px;">
            <h3 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 700;">💖 Pink Sunset</h3>
            <p style="margin: 0; opacity: 0.9;">Vibrant pink to coral gradient</p>
          </div>
        </ntv-card>
        
        <ntv-card 
          variant="elevated"
          gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
          shadow="lg"
          rounded="lg">
          <div style="color: white; text-align: center; padding: 24px;">
            <h3 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 700;">🌊 Ocean Blue</h3>
            <p style="margin: 0; opacity: 0.9;">Cool blue ocean waves</p>
          </div>
        </ntv-card>
        
        <ntv-card 
          variant="elevated"
          gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
          shadow="lg"
          rounded="lg">
          <div style="color: white; text-align: center; padding: 24px;">
            <h3 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 700;">🌅 Sunrise</h3>
            <p style="margin: 0; opacity: 0.9;">Warm sunrise colors</p>
          </div>
        </ntv-card>
        
        <ntv-card 
          variant="elevated"
          gradient="linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
          shadow="lg"
          rounded="lg">
          <div style="color: #374151; text-align: center; padding: 24px;">
            <h3 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 700;">🌸 Soft Pastels</h3>
            <p style="margin: 0; opacity: 0.8;">Gentle pastel gradient</p>
          </div>
        </ntv-card>
        
        <ntv-card 
          variant="elevated"
          gradient="radial-gradient(circle, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)"
          shadow="lg"
          rounded="lg">
          <div style="color: #374151; text-align: center; padding: 24px;">
            <h3 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 700;">🎨 Radial Glow</h3>
            <p style="margin: 0; opacity: 0.8;">Radial gradient effect</p>
          </div>
        </ntv-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of beautiful gradient backgrounds for cards.',
      },
    },
  },
};

// No Border Examples
export const NoBorderCards: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; padding: 24px;">
        <ntv-card variant="elevated" shadow="none" rounded="lg">
          <div style="padding: 20px; text-align: center;">
            <h4 style="margin: 0 0 8px 0; color: #1f2937;">No Border + No Shadow</h4>
            <p style="margin: 0; color: #6b7280;">Clean minimal design</p>
          </div>
        </ntv-card>
        
        <ntv-card variant="elevated" shadow="sm" rounded="lg">
          <div style="padding: 20px; text-align: center;">
            <h4 style="margin: 0 0 8px 0; color: #1f2937;">No Border + Small Shadow</h4>
            <p style="margin: 0; color: #6b7280;">Subtle floating effect</p>
          </div>
        </ntv-card>
        
        <ntv-card variant="elevated" shadow="md" rounded="lg">
          <div style="padding: 20px; text-align: center;">
            <h4 style="margin: 0 0 8px 0; color: #1f2937;">No Border + Medium Shadow</h4>
            <p style="margin: 0; color: #6b7280;">More pronounced elevation</p>
          </div>
        </ntv-card>
        
        <ntv-card variant="elevated" shadow="lg" rounded="lg">
          <div style="padding: 20px; text-align: center;">
            <h4 style="margin: 0 0 8px 0; color: #1f2937;">No Border + Large Shadow</h4>
            <p style="margin: 0; color: #6b7280;">Strong floating appearance</p>
          </div>
        </ntv-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Cards without borders using the elevated variant. Perfect for modern, clean designs.',
      },
    },
  },
};

// Custom colors
export const CustomColors: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; padding: 24px;">
        <ntv-card 
          variant="filled"
          backgroundColor="#fef3c7"
          borderColor="#f59e0b">
          <div style="padding: 20px;">
            <h4 style="margin: 0 0 8px 0; color: #92400e;">Warning Card</h4>
            <p style="margin: 0; color: #b45309;">Custom yellow background</p>
          </div>
        </ntv-card>
        
        <ntv-card 
          variant="outlined"
          backgroundColor="#ecfdf5"
          borderColor="#10b981">
          <div style="padding: 20px;">
            <h4 style="margin: 0 0 8px 0; color: #065f46;">Success Card</h4>
            <p style="margin: 0; color: #047857;">Custom green theme</p>
          </div>
        </ntv-card>
        
        <ntv-card 
          variant="elevated"
          backgroundColor="#ede9fe"
          shadow="lg">
          <div style="padding: 20px;">
            <h4 style="margin: 0 0 8px 0; color: #5b21b6;">Purple Card</h4>
            <p style="margin: 0; color: #7c3aed;">Custom purple background</p>
          </div>
        </ntv-card>
        
        <ntv-card 
          variant="outlined"
          backgroundColor="#fef2f2"
          borderColor="#ef4444">
          <div style="padding: 20px;">
            <h4 style="margin: 0 0 8px 0; color: #991b1b;">Error Card</h4>
            <p style="margin: 0; color: #dc2626;">Custom red theme</p>
          </div>
        </ntv-card>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Cards with custom background and border colors.',
      },
    },
  },
};

// DRY Configuration Pattern
export const DRYConfigPattern: Story = {
  render: () => {
    const cardConfigs: Partial<CardConfig>[] = [
      {
        variant: 'elevated',
        shadow: 'lg',
        rounded: 'lg',
        hoverEffect: true,
      },
      {
        variant: 'outlined',
        borderColor: '#3b82f6',
        backgroundColor: '#eff6ff',
        rounded: 'md',
        clickable: true,
        hoverEffect: true,
      },
      {
        variant: 'filled',
        backgroundColor: '#f3f4f6',
        shadow: 'md',
        rounded: 'xl',
        fullWidth: true,
      },
    ];

    return {
      props: { cardConfigs },
      template: `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <ntv-card [config]="cardConfigs[0]">
            <div style="padding: 20px;">
              <h4 style="margin: 0 0 8px 0; color: #1f2937;">DRY Config #1</h4>
              <p style="margin: 0; color: #6b7280;">Elevated card with large shadow and hover effect</p>
            </div>
          </ntv-card>
          
          <ntv-card [config]="cardConfigs[1]" (cardClick)="onCardClick('DRY Config #2')">
            <div style="padding: 20px;">
              <h4 style="margin: 0 0 8px 0; color: #1f2937;">DRY Config #2</h4>
              <p style="margin: 0; color: #6b7280;">Clickable outlined card with custom colors</p>
            </div>
          </ntv-card>
          
          <ntv-card [config]="cardConfigs[2]">
            <div style="padding: 20px;">
              <h4 style="margin: 0 0 8px 0; color: #1f2937;">DRY Config #3</h4>
              <p style="margin: 0; color: #6b7280;">Full-width filled card with extra large padding</p>
            </div>
          </ntv-card>
        </div>
      `,
      methods: {
        onCardClick: (cardName: string) => {
          console.log(`${cardName} clicked!`);
        },
      },
    };
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the DRY configuration pattern that reduces template verbosity by 90%.',
      },
    },
  },
};

// Complex content example
export const ComplexContent: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [Button],
    },
    template: `
      <div class="masonry-container" style="columns: 3; column-gap: 20px; column-fill: balance;">
         <style>
           .masonry-card {
              break-inside: avoid;
              margin-bottom: 20px;
              display: block;
              width: 100%;
            }
           @media (max-width: 1024px) {
             .masonry-container { columns: 2 !important; }
           }
           @media (max-width: 640px) {
             .masonry-container { columns: 1 !important; }
           }
         </style>
        <ntv-card 
          class="masonry-card"
          variant="elevated" 
          shadow="lg" 
          rounded="lg" 
          hoverEffect="true">
          <div style="padding: 20px;">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Professional woman profile" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 12px; object-fit: cover;" />
              <div>
                <h3 style="margin: 0; color: #1f2937; font-size: 18px;">User Profile</h3>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">john.doe&#64;example.com</p>
              </div>
            </div>
            <p style="margin: 0 0 16px 0; color: #4b5563; line-height: 1.5;">Software Engineer with 5+ years of experience in web development and cloud technologies.</p>
            <div style="display: flex; gap: 8px;">
              <span style="background: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 12px;">React</span>
              <span style="background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Node.js</span>
              <span style="background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 4px; font-size: 12px;">AWS</span>
            </div>
          </div>
        </ntv-card>
        
        <ntv-card 
          class="masonry-card"
          variant="outlined" 
          borderColor="#e5e7eb" 
          rounded="lg" 
          clickable="true"
          hoverEffect="true"
          (cardClick)="onCardClick('Product Card')">
          <div style="padding: 20px;">
            <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Premium headphones product" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 16px;" />
            <h3 style="margin: 0 0 8px 0; color: #1f2937;">Premium Product</h3>
            <p style="margin: 0 0 12px 0; color: #6b7280; line-height: 1.5;">High-quality product with amazing features and excellent customer reviews.</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 24px; font-weight: bold; color: #1f2937;">$99.99</span>
              <button style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Add to Cart</button>
            </div>
          </div>
        </ntv-card>
        
        <ntv-card 
          class="masonry-card"
          variant="elevated" 
          shadow="md" 
          rounded="lg" 
          hoverEffect="true">
          <div style="padding: 20px;">
            <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Modern web development workspace" style="width: 100%; height: 160px; object-fit: cover; border-radius: 8px; margin-bottom: 16px;" />
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 20px; font-weight: 600;">Featured Article</h3>
            <p style="margin: 0 0 16px 0; color: #6b7280; line-height: 1.5;">Discover the latest trends in web development and learn how to build modern, responsive applications with cutting-edge technologies.</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; gap: 6px;">
                <span style="background: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 500;">Web Dev</span>
                <span style="background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 500;">Tutorial</span>
              </div>
              <ntv-button 
                variant="primary" 
                size="sm" 
                (buttonClick)="onButtonClick('Read Article')">
                Read More
              </ntv-button>
            </div>
          </div>
        </ntv-card>
        
        <ntv-card 
          class="masonry-card"
          variant="outlined" 
          shadow="sm" 
          rounded="lg" 
          hoverEffect="true">
          <div style="padding: 20px;">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Beautiful mountain landscape" style="width: 100%; height: 140px; object-fit: cover; border-radius: 8px; margin-bottom: 16px;" />
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 20px; font-weight: 600;">Travel Guide</h3>
            <p style="margin: 0 0 16px 0; color: #6b7280; line-height: 1.5;">Explore breathtaking destinations and discover hidden gems around the world with our comprehensive travel guides.</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; gap: 6px;">
                <span style="background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 500;">Travel</span>
                <span style="background: #ecfdf5; color: #065f46; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 500;">Adventure</span>
              </div>
              <ntv-button 
                variant="outline" 
                size="sm" 
                (buttonClick)="onButtonClick('Explore Destination')">
                Explore
              </ntv-button>
            </div>
          </div>
        </ntv-card>
      </div>
    `,
    methods: {
      onCardClick: (cardName: string) => {
        console.log(`${cardName} clicked!`);
      },
      onButtonClick: (action: string) => {
        console.log(`${action} button clicked!`);
        alert(`${action} button was clicked!`);
      },
    },
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Examples of cards with complex content including images, buttons, and rich layouts.',
      },
    },
  },
};
