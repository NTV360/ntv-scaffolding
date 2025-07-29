# Calendar Component

```html
<ntv-calendar [inputEvents]="calendarEvents" [isModifyingEvent]="isModifyingEvent" [isDeletingEvent]="isDeletingEvent" [viewMode]="viewMode" [startDay]="startDay" [showWeekends]="showWeekends" [highlightToday]="highlightToday" (event)="onAddEvent($event)" (eventDelete)="onDeleteEvent($event)" (viewChange)="onViewChange($event)"> </ntv-calendar>
```

---

## Component Setup

```typescript
import { CalendarConfig, Event } from './calendar.types';

@Component({
  // ...
})
export class MyComponent {
  // Handle loading states
  isAddingEvent = signal(false);
  isDeletingEvent = signal(false);
  events = signal<Event[]>([
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
  ]);

  async onAddEvent(event: Event) {
    this.isAddingEvent.set(true);
    console.log('Added event:', event);
    // await 3s (mock)
    this.isAddingEvent.set(false);
  }

  async onDeleteEvent(eventId: string) {
    this.isDeletingEvent.set(true);
    console.log('Deleted event:', eventId);
    // await 3s (mock)
    this.isDeletingEvent.set(false);
  }

  onViewChange(view: string) {
    console.log('Calendar view changed to:', view);
  }
}
```
