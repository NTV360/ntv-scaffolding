import type { Meta, StoryObj } from '@storybook/angular';
import { Calendar } from './calendar';
import { Event } from './calendar.types';

const meta: Meta<Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A fully interactive calendar component with month, week, and day views.

## Features
- Navigate between months and years
- Highlight today's date
- Add and remove events dynamically
- Support for all-day or time-specific events
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    inputEvents: {
      control: { type: 'object' },
      description: 'List of events to display on the calendar',
    },
    event: {
      action: 'onAddEvent',
      description: 'Triggered when a new event is added',
    },
    deleteEvent: {
      action: 'onDeleteEvent',
      description: 'Triggered when an event is deleted',
    },
    isDeletingEvent: {
      control: 'boolean',
      description: 'Shows loading state when deleting an event',
    },
    isModifyingEvent: {
      control: 'boolean',
      description: 'Shows loading state during adding or updating event',
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<Calendar>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      isModifyingEvent: false,
      events: [
        {
          id: 'evt_001',
          title: 'Team Building Activity',
          description: 'Annual company team building event at the beach resort',
          date: new Date('2025-07-24'),
          bgColor: '#3b82f6',
          isAllDay: true,
        },
        {
          id: 'evt_002',
          title: 'Badminton Tournament',
          description: 'Friendly badminton match with colleagues',
          date: new Date('2025-07-25'),
          bgColor: '#f97316',
          isAllDay: true,
        },
      ],
      onAddEvent: (event: Event) => {
        args.isModifyingEvent = true;
        console.log('Added event:', event);

        setTimeout(() => {
          args.isModifyingEvent = false;
        }, 2500);
      },

      onDeleteEvent: (eventId: string) => {
        console.log('Deleted event:', eventId);
      },
    },
    template: `
    <div class="h-[800px] w-[900px]">
      <ntv-calendar
        [isModifyingEvent]="isModifyingEvent"
        [inputEvents]="events"
        (event)="onAddEvent($event)"
        (deleteEvent)="onDeleteEvent($event)"
      />
    </div>`,
  }),
};
