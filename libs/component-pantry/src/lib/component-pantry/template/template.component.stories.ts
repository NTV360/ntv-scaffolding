import { Meta, StoryObj } from '@storybook/angular';
import { TemplateComponent } from './template.component';
import type { ZoneData } from './zone/zone.component';
import { mockLayouts } from './mockLayouts';

const meta: Meta<TemplateComponent> = {
  title: 'Components/Template',
  component: TemplateComponent,
  tags: ['autodocs'],
  render: (args: any) => ({
    props: args,
  }),
  parameters: {
    docs: {
      description: {
        component:
          'A flexible template component for rendering multiple zones with custom layouts and dynamic content, such as images and videos.',
      },
    },
  },
  argTypes: {
    zones: {
      control: 'object',
      description:
        'Array of zone definitions (ZoneData[]) to render in the template.',
      table: {
        type: { summary: 'ZoneData[]' },
        defaultValue: { summary: '[]' },
      },
    },
  },
};
export default meta;

type Story = StoryObj<TemplateComponent>;

export const StandardLayout: Story = {
  name: 'Standard Layout',
  args: {
    zones: mockLayouts[0].layout,
  },
  render: (args) => ({
    template: `
      <div style="
        width: 480px;
        height: 340px;
        margin: 40px auto;
        background: #f3f4f6;
        border-radius: 12px;
        box-shadow: 0 2px 12px rgba(0,0,0,0.07);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid #e5e7eb;
        padding: 16px;
        box-sizing: border-box;
      ">
        <ntv-template [zones]="zones" style="width: 100%; height: 100%;"></ntv-template>
        <div style="margin-top: 12px; font-weight: 500; font-size: 1.1rem;">Standard Layout</div>
      </div>
    `,
    props: args,
  }),
};

export const WideContentLayout: Story = {
  name: 'Wide Content Layout',
  args: {
    zones: mockLayouts[1].layout,
  },
  render: (args) => ({
    template: `
      <div style="
        width: 480px;
        height: 340px;
        margin: 40px auto;
        background: #f3f4f6;
        border-radius: 12px;
        box-shadow: 0 2px 12px rgba(0,0,0,0.07);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid #e5e7eb;
        padding: 16px;
        box-sizing: border-box;
      ">
        <ntv-template [zones]="zones" style="width: 100%; height: 100%;"></ntv-template>
        <div style="margin-top: 12px; font-weight: 500; font-size: 1.1rem;">Wide Content Layout</div>
      </div>
    `,
    props: args,
  }),
};

export const BalancedLayout: Story = {
  name: 'Balanced Layout',
  args: {
    zones: mockLayouts[2].layout,
  },
  render: (args) => ({
    template: `
      <div style="
        width: 480px;
        height: 340px;
        margin: 40px auto;
        background: #f3f4f6;
        border-radius: 12px;
        box-shadow: 0 2px 12px rgba(0,0,0,0.07);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid #e5e7eb;
        padding: 16px;
        box-sizing: border-box;
      ">
        <ntv-template [zones]="zones" style="width: 100%; height: 100%;"></ntv-template>
        <div style="margin-top: 12px; font-weight: 500; font-size: 1.1rem;">Balanced Layout</div>
      </div>
    `,
    props: args,
  }),
};

export const PresentationLayout: Story = {
  name: 'Presentation Layout',
  args: {
    zones: mockLayouts[3].layout,
  },
  render: (args) => ({
    template: `
      <div style="
        width: 480px;
        height: 340px;
        margin: 40px auto;
        background: #f3f4f6;
        border-radius: 12px;
        box-shadow: 0 2px 12px rgba(0,0,0,0.07);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid #e5e7eb;
        padding: 16px;
        box-sizing: border-box;
      ">
        <ntv-template [zones]="zones" style="width: 100%; height: 100%;"></ntv-template>
        <div style="margin-top: 12px; font-weight: 500; font-size: 1.1rem;">Presentation Layout</div>
      </div>
    `,
    props: args,
  }),
};

export const ConferenceLayout: Story = {
  name: 'Conference Layout',
  args: {
    zones: mockLayouts[4].layout,
  },
  render: (args) => ({
    template: `
      <div style="
        width: 480px;
        height: 340px;
        margin: 40px auto;
        background: #f3f4f6;
        border-radius: 12px;
        box-shadow: 0 2px 12px rgba(0,0,0,0.07);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid #e5e7eb;
        padding: 16px;
        box-sizing: border-box;
      ">
        <ntv-template [zones]="zones" style="width: 100%; height: 100%;"></ntv-template>
        <div style="margin-top: 12px; font-weight: 500; font-size: 1.1rem;">Conference Layout</div>
      </div>
    `,
    props: args,
  }),
};

export const EmergencyLayout: Story = {
  name: 'Emergency Layout',
  args: {
    zones: mockLayouts[5].layout,
  },
  render: (args) => ({
    template: `
      <div style="
        width: 480px;
        height: 340px;
        margin: 40px auto;
        background: #f3f4f6;
        border-radius: 12px;
        box-shadow: 0 2px 12px rgba(0,0,0,0.07);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid #e5e7eb;
        padding: 16px;
        box-sizing: border-box;
      ">
        <ntv-template [zones]="zones" style="width: 100%; height: 100%;"></ntv-template>
        <div style="margin-top: 12px; font-weight: 500; font-size: 1.1rem;">Emergency Layout</div>
      </div>
    `,
    props: args,
  }),
};

// --- MEDIA DEMO STORY ---

/**
 * Media Demo: Shows a real-world example with a looping video and cycling images per zone.
 * Each zone has its own duration for image cycling. Footer zone now has unique content.
 * Uses public Pexels URLs for demo purposes. Content is injected using a Storybook decorator.
 *
 * Zone mapping:
 * 0: Background Zone - images
 * 1: Main Content    - video
 * 2: Side Panel      - images
 * 3: Bottom Bar      - images (footer style)
 */

const mediaDemoContent = [
  {
    type: 'images',
    urls: [
      'https://images.pexels.com/photos/34950/pexels-photo.jpg',
      'https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg',
      'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
    ],
    duration: 1500, // 1.5 seconds
  },
  {
    type: 'video',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4', // Known-good MP4
    duration: 0, // Not used for video
  },
  {
    type: 'images',
    urls: [
      'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg',
      'https://images.pexels.com/photos/417142/pexels-photo-417142.jpeg',
      'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg',
    ],
    duration: 2500, // 2.5 seconds
  },
  {
    type: 'images', // Bottom Bar unique content
    urls: [
      'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg',
      'https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg',
      'https://images.pexels.com/photos/167964/pexels-photo-167964.jpeg',
    ],
    duration: 1000, // 1 second
  },
];

export const MediaDemo: Story = {
  name: 'Media Demo (Video & Images per Zone)',
  args: {
    zones: mockLayouts[0].layout,
  },
  render: (args) => ({
    template: `
      <div style="
        width: 480px;
        height: 340px;
        margin: 40px auto;
        background: #f3f4f6;
        border-radius: 12px;
        box-shadow: 0 2px 12px rgba(0,0,0,0.07);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid #e5e7eb;
        padding: 16px;
        box-sizing: border-box;
      ">
        <ntv-template [zones]="zones" style="width: 100%; height: 100%;"></ntv-template>
        <div style="margin-top: 12px; font-weight: 500; font-size: 1.1rem;">Media Demo</div>
      </div>
    `,
    props: args,
  }),
  decorators: [
    (storyFunc, context) => {
      // Render the story, then overlay media content into each zone
      const story = storyFunc();
      setTimeout(() => {
        const zoneEls = document.querySelectorAll('.screen-zone__content');
        zoneEls.forEach((el, i) => {
          el.innerHTML = '';
          const content = mediaDemoContent[i % mediaDemoContent.length];
          if (content.type === 'video' && content.url) {
            const video = document.createElement('video');
            video.src = content.url;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';
            el.appendChild(video);
          } else if (content.type === 'images' && content.urls) {
            let idx = 0;
            const img = document.createElement('img');
            img.src = content.urls[idx];
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            el.appendChild(img);
            setInterval(() => {
              if (!content.urls) return;
              idx = (idx + 1) % content.urls.length;
              img.src = content.urls[idx];
            }, content.duration || 2000);
          }
        });
      }, 100);
      return story;
    },
  ],
};
