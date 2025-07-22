import {
  Component,
  computed,
  input,
  output,
  signal,
  HostListener,
  viewChild,
  ElementRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

//Components
import { Button } from '../button/button';
import { Popover } from '../popover/popover';
import { Capitalize } from '../../pipes';

const components = [Button];
@Component({
  standalone: true,
  selector: 'ntv-calendar',
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
  imports: [FormsModule, components, Popover, Capitalize],
})
export class Calendar {
  // Element reference of the yearPickerList div
  private _yearPickerList =
    viewChild<ElementRef<HTMLDivElement>>('yearPickerList');

  // Popover reference
  private _viewPopover = viewChild.required<Popover>('viewPopover');

  // Number of years (in the date year picker) to show
  private readonly _numberOfYearsToShow = 50;

  // Today's date
  public today = new Date();

  // Reactive signal for the current date
  public currentDate = signal(this.today);

  // Current calendar view mode
  public view = signal<'day' | 'week' | 'month'>('month');

  // Calendar view modes
  public views = signal(['month', 'week', 'day']);

  // Date selected for UI highlight
  public selectedDateForHighlight = signal<Date | null>(null);

  // Emits selected date to parent components
  public selectedDateData = output<Date>();

  // Accepts selected date from parent components
  public savedSelectedDate = input<Date>();

  // Tracks the currently selected date
  public selectedDate = signal<Date | null>(null);

  // Controls visibility of the modal
  public showModal = signal(false);

  // Controls visibility of the year picker
  public showYearPicker = signal(false);

  // Tracks the date currently being viewed for events
  public viewingEventsFor = signal<Date | null>(null);

  // Holds the event currently being edited
  public editingEvent = signal<{
    id: string;
    title: string;
    description?: string;
    date: Date;
    bgColor?: string;
    isAllDay?: boolean;
    startTime?: string;
    endTime?: string;
  } | null>(null);

  // New event input: title
  public newEventTitle = '';

  // New event input: description
  public newEventDescription = '';

  // New event input: background color
  public newEventColor = '#3B82F6';

  // New event input: all-day toggle
  public newEventIsAllDay = true;

  // New event input: start time
  public newEventStartTime = '09:00';

  // New event input: end time
  public newEventEndTime = '10:00';

  // New event input: selected date
  public newEventDate = '';

  // Color palette for event backgrounds
  public pastelColors = [
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#F97316', // Orange
    '#6B7280', // Gray
    '#8FA8B2', // Muted Blue-Gray
    '#B5A5A5', // Muted Rose
    '#8FAF8F', // Army Green
    '#C4B896', // Muted Khaki
    '#A89CC8', // Muted Lavender
    '#C4A5B5', // Dusty Rose
    '#7FB3B3', // Sage Blue
    '#A8B88F', // Olive Green
    '#C4A584', // Muted Tan
    '#A5A5A5', // Medium Gray
  ];

  // Current year value
  public year = this.today.getFullYear();

  // Reactive list of all calendar events
  public events = signal<
    {
      id: string;
      title: string;
      description?: string;
      date: Date;
      bgColor?: string;
      isAllDay?: boolean;
      startTime?: string;
      endTime?: string;
    }[]
  >([]);

  // List of month names
  public months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Abbreviated day names for weekly view
  public weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Computed name of the current month
  public currentMonthName = computed(() =>
    this.currentDate().toLocaleString('default', { month: 'long' })
  );

  // Computed value of the current year
  public currentYear = computed(() => this.currentDate().getFullYear());

  // List of years for year picker (current year ± 50 years)
  public availableYears = signal<number[]>(
    this.generateYears(this.currentYear()) // Returns 50 years ago until currentYear as default list
  );

  // Week view computed properties
  public currentWeekStart = computed(() => {
    const date = this.currentDate();
    return this.startOfWeek(date);
  });

  public currentWeekDays = computed(() => {
    const start = this.currentWeekStart();
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      const selected = this.selectedDateForHighlight();
      date.setDate(start.getDate() + i);
      days.push({
        date,
        events: this.getEventsForDate(date),
        isToday: this.isSameDay(date, this.today),
        isCurrentMonth: date.getMonth() === this.currentDate().getMonth(),
        isSelected: selected ? this.isSameDay(date, selected) : false,
        isPast: this.isPastDate(date),
      });
    }
    return days;
  });

  /**
   * Computes the weeks for the current month view, including days from adjacent months
   * to fill complete weeks. Each week contains 7 days with associated metadata.
   *
   * @returns {Array<Array<{date: Date, events: any[], isToday: boolean, isCurrentMonth: boolean, isSelected: boolean, isPast: boolean}>>}
   *   Array of weeks, where each week is an array of day objects containing:
   *   - date: The Date object for the day
   *   - events: Array of events for this date
   *   - isToday: Whether this date is today
   *   - isCurrentMonth: Whether this date belongs to the current month being viewed
   *   - isSelected: Whether this date is currently selected
   *   - isPast: Whether this date is in the past
   */
  public monthWeeks = computed(() => {
    const start = this.startOfWeek(this.startOfMonth(this.currentDate()));
    const end = this.endOfWeek(this.endOfMonth(this.currentDate()));
    const weeks = [];

    const currentDate = new Date(start);
    while (currentDate <= end) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        week.push({
          date,
          events: this.getEventsForDate(date),
          isToday: this.isSameDay(date, this.today),
          isCurrentMonth: date.getMonth() === this.currentDate().getMonth(),
          isSelected: this.selectedDateForHighlight()
            ? this.isSameDay(
                date,
                this.selectedDateForHighlight() || new Date()
              )
            : this.savedSelectedDate()
            ? this.isSameDay(date, this.savedSelectedDate() || new Date())
            : false,
          isPast: this.isPastDate(date),
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      weeks.push(week);

      console.log(week, 'week');
    }
    return weeks;
  });

  // Day view computed properties
  public currentDayEvents = computed(() => {
    return this.getEventsForDate(this.currentDate());
  });

  public eventsOnSelectedDay = computed(() => {
    const target = this.viewingEventsFor();
    return target ? this.getEventsForDate(target) : [];
  });

  public getEventsForDate(date: Date) {
    return this.events().filter((event) => this.isSameDay(date, event.date));
  }

  public isSameDay(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString();
  }

  // Check if a date is in the past (before today)
  public isPastDate(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0); // Reset time to start of day
    return checkDate < today;
  }

  // Navigation methods
  public goNext = () => {
    const view = this.view();
    const current = this.currentDate();

    if (view === 'day') {
      this.currentDate.set(this.addDays(current, 1));
    } else if (view === 'week') {
      this.currentDate.set(this.addDays(current, 7));
    } else if (view === 'month') {
      this.currentDate.set(this.addMonths(current, 1));
    }
  };

  public goPrev = () => {
    const view = this.view();
    const current = this.currentDate();

    if (view === 'day') {
      this.currentDate.set(this.addDays(current, -1));
    } else if (view === 'week') {
      this.currentDate.set(this.addDays(current, -7));
    } else if (view === 'month') {
      this.currentDate.set(this.addMonths(current, -1));
    }
  };

  public goToToday = () => {
    this.currentDate.set(new Date(this.today));
    this.selectedDateForHighlight.set(new Date(this.today));
  };

  public setView(newView: 'day' | 'week' | 'month', event?: MouseEvent) {
    this.view.set(newView);

    this._viewPopover().toggle(event as MouseEvent);
  }

  // Year picker methods
  public toggleYearPicker = () => {
    this.showYearPicker.set(!this.showYearPicker());
  };

  public selectYear = (year: number) => {
    const currentDate = this.currentDate();
    const newDate = new Date(
      year,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    this.currentDate.set(newDate);
    this.showYearPicker.set(false);
  };

  // Go back 50 years
  public goPrevYears = (event: Event) => {
    event.stopPropagation();
    const firstElementYear = this.availableYears()[0];
    // Subtract 1 since the first element year was already visible / displayed in the avialableYears array
    this.availableYears.set(this.generateYears(firstElementYear - 1));

    this.scrollToTop();
  };

  // Go next 50 years
  public goNextYears = (event: Event) => {
    event.stopPropagation();
    const lastElementYear =
      this.availableYears()[this.availableYears().length - 1];
    this.availableYears.set(this.generateYears(lastElementYear + 1, 'forward'));

    this.scrollToTop();
  };

  public closeYearPicker = (event?: Event) => {
    event?.stopPropagation();
    this.showYearPicker.set(false);
  };

  // Close year picker when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const yearPickerContainer = target.closest(
      '.calendar__year-picker-container'
    );

    if (!yearPickerContainer && this.showYearPicker()) {
      this.closeYearPicker();
    }
  }

  // Enhanced selectDate method with better feedback
  public selectDate(date: Date) {
    // Allow selection of past dates for viewing, but don't highlight them
    // Only set highlighting for non-past dates
    if (!this.isPastDate(date)) {
      this.selectedDateForHighlight.set(new Date(date));
    }

    this.selectedDateData.emit(new Date(date));

    // Set current date to the selected date
    this.currentDate.set(new Date(date));

    // Switch to day view to show the selected date details
    // this.view.set('day');

    // Optional: Add visual feedback
    this.announceSelection(date);
  }

  // Method to provide accessibility announcement
  private announceSelection(date: Date) {
    const announcement = `Selected ${date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}`;

    // Create a temporary announcement for screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = announcement;
    document.body.appendChild(announcer);

    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }

  public startAddEvent(date?: Date) {
    const selectedDate = date || this.currentDate();

    // Prevent adding events to past dates
    if (this.isPastDate(selectedDate)) {
      return;
    }

    this.selectedDate.set(selectedDate);
    this.newEventTitle = '';
    this.newEventDescription = '';
    this.newEventColor = '#3B82F6';
    this.newEventIsAllDay = true;
    this.newEventStartTime = '09:00';
    this.newEventEndTime = '10:00';
    this.newEventDate = this.formatDateForInput(selectedDate);
    this.editingEvent.set(null);
    this.viewingEventsFor.set(null);
    this.showModal.set(true);
  }

  public startViewEvents(date: Date) {
    this.viewingEventsFor.set(date);
    this.showModal.set(true);
  }

  public startEditEvent(event: any) {
    // Prevent editing events on past dates
    if (this.isPastDate(event.date)) {
      // Just view the event details without allowing editing
      this.startViewEvents(event.date);
      return;
    }

    this.editingEvent.set(event);
    this.selectedDate.set(event.date);
    this.newEventTitle = event.title;
    this.newEventDescription = event.description || '';
    this.newEventColor = event.bgColor || '#3B82F6';
    this.newEventIsAllDay = event.isAllDay || false;
    this.newEventStartTime = event.startTime || '09:00';
    this.newEventEndTime = event.endTime || '10:00';
    this.newEventDate = this.formatDateForInput(event.date);
    this.showModal.set(true);
  }

  public addEvent() {
    if (!this.newEventTitle.trim() || !this.newEventDate) return;

    // Validate time range for non-all-day events
    if (
      !this.newEventIsAllDay &&
      this.newEventStartTime >= this.newEventEndTime
    ) {
      alert('End time must be after start time');
      return;
    }

    const eventDate = this.createLocalDate(this.newEventDate);

    const newEvent = {
      id: this.editingEvent()?.id || this.generateId(),
      title: this.newEventTitle.trim(),
      description: this.newEventDescription.trim(),
      date: eventDate,
      bgColor: this.newEventColor,
      isAllDay: this.newEventIsAllDay,
      startTime: this.newEventIsAllDay ? undefined : this.newEventStartTime,
      endTime: this.newEventIsAllDay ? undefined : this.newEventEndTime,
    };

    if (this.editingEvent()) {
      this.events.update((events) =>
        events.map((e) => (e.id === this.editingEvent()?.id ? newEvent : e))
      );
    } else this.events.update((events) => [...events, newEvent]);

    this.closeModal();
  }

  public deleteEvent(eventId: string) {
    this.events.update((events) => events.filter((e) => e.id !== eventId));
    this.closeModal();
  }

  public closeModal() {
    this.showModal.set(false);
    this.editingEvent.set(null);
    this.selectedDate.set(null);
    this.viewingEventsFor.set(null);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Utility methods
  private startOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  private endOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  private startOfWeek(date: Date): Date {
    const result = new Date(date);
    const day = result.getDay();
    const diff = result.getDate() - day;
    result.setDate(diff);
    return result;
  }

  private endOfWeek(date: Date): Date {
    const result = new Date(date);
    const day = result.getDay();
    const diff = result.getDate() + (6 - day);
    result.setDate(diff);
    return result;
  }

  public addDays(date: Date, n: number): Date {
    const result = new Date(date);
    result.setDate(date.getDate() + n);
    return result;
  }

  private addMonths(date: Date, n: number): Date {
    const result = new Date(date);
    result.setMonth(date.getMonth() + n);
    return result;
  }

  public formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  private formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private createLocalDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  public formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  }

  /**
   * Generate 50 years based on the provided baseYear and direction
   *
   * @param baseYear - Starting date you want to generate from
   * @param direction - (`forward` | `backward`) - Either go 50 years ahead or go 50 years back. `Default: 'backward'`
   * @returns {number[]} `Length: 50` Array of years generated in ascending order
   */
  private generateYears(
    baseYear: number,
    direction: 'forward' | 'backward' = 'backward'
  ): number[] {
    const years: number[] = [];

    switch (direction) {
      case 'forward':
        // From baseYear+1 to baseYear+50
        for (
          let i = baseYear;
          i <= baseYear + (this._numberOfYearsToShow - 1);
          i++
        ) {
          years.push(i);
        }
        break;

      default:
        // Previous years from baseYear-49 to baseYear (ascending)
        for (
          let i = baseYear - (this._numberOfYearsToShow - 1);
          i <= baseYear;
          i++
        ) {
          years.push(i);
        }
    }

    return years;
  }

  // Scroll to the top of the list when year picker navigation is clicked
  private scrollToTop = (): void => {
    const yearPickerList = this._yearPickerList();
    if (yearPickerList) {
      yearPickerList.nativeElement.scrollTop = 0;
    }
  };
}
