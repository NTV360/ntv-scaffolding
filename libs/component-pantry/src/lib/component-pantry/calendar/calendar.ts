import {
  Component,
  computed,
  input,
  output,
  signal,
  HostListener,
  viewChild,
  ElementRef,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

// Components
import { Button } from '../button/button';
import { Popover } from '../popover/popover';
import { CapitalizePipe, TruncatePipe } from '../../pipes';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FILE_ICONS } from '../../utils';

const components = [Button];

/**
 * Calendar Component
 *
 * This component displays a calendar with support for multiple views (month, week, day),
 * event management (create, edit, delete), and year navigation.
 */
@Component({
  standalone: true,
  selector: 'ntv-calendar',
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
  imports: [FormsModule, components, Popover, CapitalizePipe, TruncatePipe],
})
export class Calendar {
  /** Used to sanitize potentially unsafe HTML content for safe binding */
  private sanitizer = inject(DomSanitizer);

  /** Reference to the yearPickerList DOM element */
  private _yearPickerList =
    viewChild<ElementRef<HTMLDivElement>>('yearPickerList');

  /** Popover reference for switching calendar views */
  private _viewPopover = viewChild.required<Popover>('viewPopover');

  /** Number of years to display in the year picker */
  private readonly _numberOfYearsToShow = 20;

  /** Today's date */
  public today = new Date();

  /** Current date signal */
  public currentDate = signal(this.today);

  /** Current view mode of the calendar */
  public view = signal<'day' | 'week' | 'month'>('month');

  /** Available calendar views */
  public views = signal(['month', 'week', 'day']);

  /** Currently selected date for highlight */
  public selectedDateForHighlight = signal<Date | null>(null);

  /** Emits selected date to parent component */
  public selectedDateData = output<Date>();

  /** Accepts selected date from parent component */
  public savedSelectedDate = input<Date>();

  /** The selected date for event creation/editing */
  public selectedDate = signal<Date | null>(null);

  /** Modal visibility state */
  public showModal = signal(false);

  /** Year picker visibility state */
  public showYearPicker = signal(false);

  /** Date for which events are being viewed */
  public viewingEventsFor = signal<Date | null>(null);

  /** Currently editing event */
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

  /** New event title */
  public newEventTitle = '';

  /** New event description */
  public newEventDescription = '';

  /** New event background color */
  public newEventColor = '#3B82F6';

  /** Flag to indicate if new event is all-day */
  public newEventIsAllDay = true;

  /** New event start time */
  public newEventStartTime = '09:00';

  /** New event end time */
  public newEventEndTime = '10:00';

  /** New event date */
  public newEventDate = '';

  /** Available pastel colors for event backgrounds */

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

  /** SVG icons (sanitized HTML) */
  public readonly goPrevIcon: SafeHtml;
  public readonly goNextIcon: SafeHtml;
  public readonly downArrow: SafeHtml;
  public readonly calendar: SafeHtml;

  constructor() {
    this.goPrevIcon = this.sanitizer.bypassSecurityTrustHtml(
      FILE_ICONS['CHEVRON_LEFT']
    );
    this.goNextIcon = this.sanitizer.bypassSecurityTrustHtml(
      FILE_ICONS['CHEVRON_RIGHT']
    );
    this.downArrow = this.sanitizer.bypassSecurityTrustHtml(
      FILE_ICONS['CHEVRON_DOWN']
    );
    this.calendar = this.sanitizer.bypassSecurityTrustHtml(
      FILE_ICONS['CALENDAR']
    );
  }

  /** Current year */
  public year = this.today.getFullYear();

  /** Reactive list of events */
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

  /** List of month names */
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

  /** Abbreviated weekday names */
  public weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  /** Current month name (computed) */
  public currentMonthName = computed(() =>
    this.currentDate().toLocaleString('default', { month: 'long' })
  );

  /** Current year (computed) */
  public currentYear = computed(() => this.currentDate().getFullYear());

  /** Available years for the year picker */
  public availableYears = signal<number[]>(
    this.generateYears(this.currentYear())
  );

  /** Start date of the current week */
  public currentWeekStart = computed(() =>
    this.startOfWeek(this.currentDate())
  );

  /** Computed days of the current week */
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
   * to fill complete weeks. Each week contains 7 days with associated metadata
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
    }
    return weeks;
  });

  /** Events for the current day */
  public currentDayEvents = computed(() =>
    this.getEventsForDate(this.currentDate())
  );

  /** Events for the selected day */
  public eventsOnSelectedDay = computed(() => {
    const target = this.viewingEventsFor();
    return target ? this.getEventsForDate(target) : [];
  });

  /**
   * Retrieve events for a specific date.
   * @param date Date to check.
   */
  public getEventsForDate(date: Date) {
    return this.events().filter((event) => this.isSameDay(date, event.date));
  }

  /** Check if two dates are the same day */
  public isSameDay(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString();
  }

  /** Check if a date is in the past */
  public isPastDate(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  }

  /** Navigate forward by day/week/month */
  public goNext = () => {
    const view = this.view();
    const current = this.currentDate();
    if (view === 'day') this.currentDate.set(this.addDays(current, 1));
    else if (view === 'week') this.currentDate.set(this.addDays(current, 7));
    else if (view === 'month') this.currentDate.set(this.addMonths(current, 1));
  };

  /** Navigate backward by day/week/month */
  public goPrev = () => {
    const view = this.view();
    const current = this.currentDate();
    if (view === 'day') this.currentDate.set(this.addDays(current, -1));
    else if (view === 'week') this.currentDate.set(this.addDays(current, -7));
    else if (view === 'month')
      this.currentDate.set(this.addMonths(current, -1));
  };

  /** Reset to today's date */
  public goToToday = () => {
    this.currentDate.set(new Date(this.today));
    this.selectedDateForHighlight.set(new Date(this.today));
  };

  /** Set calendar view (day, week, month) */
  public setView(newView: 'day' | 'week' | 'month', event?: MouseEvent) {
    this.view.set(newView);
    this._viewPopover().toggle(event as MouseEvent);
  }

  /** Toggle year picker */
  public toggleYearPicker = () => {
    this.showYearPicker.set(!this.showYearPicker());
  };

  /** Select a year */
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

  /** Show previous 50 years in the picker */
  public goPrevYears = (event: Event) => {
    event.stopPropagation();
    const firstElementYear = this.availableYears()[0];
    this.availableYears.set(this.generateYears(firstElementYear - 1));
    this.scrollToTop();
  };

  /** Show next 50 years in the picker */
  public goNextYears = (event: Event) => {
    event.stopPropagation();
    const lastElementYear =
      this.availableYears()[this.availableYears().length - 1];
    this.availableYears.set(this.generateYears(lastElementYear + 1, 'forward'));
    this.scrollToTop();
  };

  /** Close year picker */
  public closeYearPicker = (event?: Event) => {
    event?.stopPropagation();
    this.showYearPicker.set(false);
  };

  /** Close year picker when clicking outside */
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

  /** Enhanced selectDate method with better feedback */
  public selectDate(date: Date) {
    // Allow selection of past dates for viewing, but don't highlight them
    // Only set highlighting for non-past dates
    if (!this.isPastDate(date)) {
      this.selectedDateForHighlight.set(new Date(date));
    }
    this.selectedDateData.emit(new Date(date));
    this.currentDate.set(new Date(date));
    this.announceSelection(date);
  }

  // STOP HERE

  /**
   * Provides an accessibility announcement for screen readers
   * when a date is selected.
   *
   * @param date - The date that was selected.
   */
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

  /**
   * Opens the event creation modal for the given date.
   *
   * @param date - Optional date to preselect for the event. Defaults to the current date.
   */
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

  /**
   * Opens the event view modal for a specific date.
   *
   * @param date - The date whose events will be displayed.
   */
  public startViewEvents(date: Date) {
    this.viewingEventsFor.set(date);
    this.showModal.set(true);
  }

  /**
   * Opens the edit modal for an existing event.
   * If the event is in the past, it opens in view-only mode.
   *
   * @param event - The event object to edit.
   */
  public startEditEvent(event: any) {
    // Prevent editing events on past dates
    if (this.isPastDate(event.date)) {
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

  /**
   * Adds a new event or updates an existing one if in edit mode.
   */
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
    } else {
      this.events.update((events) => [...events, newEvent]);
    }

    this.closeModal();
  }

  /**
   * Deletes an event by its ID.
   *
   * @param eventId - The ID of the event to delete.
   */
  public deleteEvent(eventId: string) {
    this.events.update((events) => events.filter((e) => e.id !== eventId));
    this.closeModal();
  }

  /**
   * Closes the event modal and resets related states.
   */
  public closeModal() {
    this.showModal.set(false);
    this.editingEvent.set(null);
    this.selectedDate.set(null);
    this.viewingEventsFor.set(null);
  }

  /**
   * Generates a random ID for new events.
   *
   * @returns A randomly generated string ID.
   */
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // ------------------- Utility methods -------------------

  /**
   * Returns the first day of the given month.
   *
   * @param date - Date within the target month.
   * @returns The first day of the month.
   */
  private startOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  /**
   * Returns the last day of the given month.
   *
   * @param date - Date within the target month.
   * @returns The last day of the month.
   */
  private endOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  /**
   * Gets the start of the week (Sunday) for the given date.
   *
   * @param date - The date to calculate from.
   * @returns The starting date of the week.
   */
  private startOfWeek(date: Date): Date {
    const result = new Date(date);
    const day = result.getDay();
    result.setDate(result.getDate() - day);
    return result;
  }

  /**
   * Gets the end of the week (Saturday) for the given date.
   *
   * @param date - The date to calculate from.
   * @returns The ending date of the week.
   */
  private endOfWeek(date: Date): Date {
    const result = new Date(date);
    const day = result.getDay();
    result.setDate(result.getDate() + (6 - day));
    return result;
  }

  /**
   * Adds or subtracts days from a given date.
   *
   * @param date - The starting date.
   * @param n - Number of days to add (negative to subtract).
   * @returns A new date object with the added days.
   */
  public addDays(date: Date, n: number): Date {
    const result = new Date(date);
    result.setDate(date.getDate() + n);
    return result;
  }

  /**
   * Adds or subtracts months from a given date.
   *
   * @param date - The starting date.
   * @param n - Number of months to add (negative to subtract).
   * @returns A new date object with the added months.
   */
  private addMonths(date: Date, n: number): Date {
    const result = new Date(date);
    result.setMonth(date.getMonth() + n);
    return result;
  }

  /**
   * Formats a date into a human-readable string.
   *
   * @param date - Date to format.
   * @returns A formatted string, e.g., "Monday, January 1, 2025".
   */
  public formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  /**
   * Formats a date into `YYYY-MM-DD` format for `<input type="date">`.
   *
   * @param date - Date to format.
   * @returns A formatted date string in `YYYY-MM-DD`.
   */
  private formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Creates a Date object from a `YYYY-MM-DD` string.
   *
   * @param dateString - The date string.
   * @returns A Date object.
   */
  private createLocalDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  /**
   * Formats time (HH:mm) into a 12-hour format with AM/PM.
   *
   * @param time - Time string (e.g., "14:30").
   * @returns A formatted time string (e.g., "2:30 PM").
   */
  public formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  }

  /**
   * Generates a list of 50 years based on the base year and direction.
   *
   * @param baseYear - The starting year.
   * @param direction - 'forward' for future years or 'backward' for past years. Default is 'backward'.
   * @returns An array of 50 years.
   */
  private generateYears(
    baseYear: number,
    direction: 'forward' | 'backward' = 'backward'
  ): number[] {
    const years: number[] = [];
    if (direction === 'forward') {
      for (
        let i = baseYear;
        i <= baseYear + (this._numberOfYearsToShow - 1);
        i++
      ) {
        years.push(i);
      }
    } else {
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

  /**
   * Scrolls the year picker to the top when navigating between year sets.
   */
  private scrollToTop = (): void => {
    const yearPickerList = this._yearPickerList();
    if (yearPickerList) {
      yearPickerList.nativeElement.scrollTop = 0;
    }
  };
}
