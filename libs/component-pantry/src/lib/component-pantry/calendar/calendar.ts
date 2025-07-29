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
  OnInit,
  effect,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// Types
import { Event as EventType } from './calendar.types';

// Components
import { Button } from '../button/button';
import { Popover } from '../popover/popover';
import { CapitalizePipe, TruncatePipe } from '../../pipes';

// Utilities
import { FILE_ICONS } from '../../utils';
import { CalendarService } from './service';
import { isSameDay } from './utils';

// Constants
import { PASTEL_COLORS } from './calendar.constants';

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
  providers: [CalendarService],
  imports: [FormsModule, components, Popover, CapitalizePipe, TruncatePipe],
})
export class Calendar implements OnInit {
  /** Used to sanitize potentially unsafe HTML content for safe binding */
  private sanitizer = inject(DomSanitizer);

  /** Calendar service */
  private _calendarService = inject(CalendarService);

  /** Reference to the yearPickerList DOM element */
  private _yearPickerList =
    viewChild<ElementRef<HTMLDivElement>>('yearPickerList');

  /** Popover reference for switching calendar views */
  private _viewPopover = viewChild.required<Popover>('viewPopover');

  /** input events  */
  public inputEvents = input<EventType[]>();

  /** Accepts selected date from parent component */
  public savedSelectedDate = input<Date>();

  /** Emits selected date to parent component */
  public selectedDateData = output<Date>();

  /** Emits addded / updated event */
  public event = output<EventType>();

  /** Emits when event is to be deleted (eventId {string} ) */
  public deleteEvent = output<string>();

  /** Today's date */
  public today = new Date();

  /** Current date signal */
  public currentDate = this._calendarService.currentDate;

  /** Current view mode of the calendar */
  public view = signal<'day' | 'week' | 'month'>('month');

  /** Available calendar views */
  public views = signal(['month', 'week', 'day']);

  /** Currently selected date for highlight */
  public selectedDateForHighlight = signal<Date | null>(null);

  /** The selected date for event creation/editing */
  public selectedDate = signal<Date | null>(null);

  /** Modal visibility state */
  public showModal = signal(false);

  /** Year picker visibility state */
  public showYearPicker = signal(false);

  /** Date for which events are being viewed */
  public viewingEventsFor = signal<Date | null>(null);

  /** Currently editing event */
  public editingEvent = signal<EventType | null>(null);

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
  public pastelColors = PASTEL_COLORS;

  /** Input Loading states  */
  /** When modifying event (async) */
  public isModifyingEvent = input(false);

  /** When deleting event (async) */
  public isDeletingEvent = input(false);

  /** Signal loading states to update UI */
  /** When modifying event (internal use) */
  public isModifyingEventInternal = signal(false);

  /** When deleting event (internal use) */
  public isDeletingEventInternal = signal(false);

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

    /** Effect to listen when the loading states change  */
    effect(() => {
      this.isModifyingEventInternal.set(this.isModifyingEvent());
      this.isDeletingEventInternal.set(this.isDeletingEvent());
    });
  }

  /**
   * Load initial values for the calendar service
   *
   * @param {EventType[]} events - Input events, e.g fetched from server
   * @param savedSelectedDate - Initial date value
   * @param {number} numberOfYearsToShow - Number of years to show in the year-picker list view
   */
  ngOnInit(): void {
    this._calendarService.setInitialInputs(this.inputEvents() ?? [], null, 20);
  }

  /** Reactive list of events */
  public allEvents = this._calendarService.allEvents;

  /** Abbreviated weekday names */
  public weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  /** Current month name (computed) */
  public currentMonthName = computed(() =>
    this.currentDate().toLocaleString('default', { month: 'long' })
  );

  /** Current year (computed) */
  public currentYear = computed(() => this.currentDate().getFullYear());

  /** Available years for the year picker */
  public availableYears = this._calendarService.availableYears;

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
        isToday: isSameDay(date, this.today),
        isCurrentMonth: date.getMonth() === this.currentDate().getMonth(),
        isSelected: selected ? isSameDay(date, selected) : false,
        isPast: this.isPastDate(date),
      });
    }
    return days;
  });

  /**
   * Computes the weeks for the current month view, including days from adjacent months
   * to fill complete weeks. Each week contains 7 days with associated metadata
   */
  public monthWeeks = this._calendarService.monthWeeks;

  /** Events for the current day */
  public currentDayEvents = computed(() => {
    return this.getEventsForDate(this.currentDate());
  });

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
    return this._calendarService.getEventsForDate(date);
  }

  /** Check if a date is in the past */
  public isPastDate(date: Date): boolean {
    return this._calendarService.isPastDate(date);
  }

  /** Navigate forward by day/week/month */
  public goNext = () => {
    this._calendarService.goNext(this.view());
  };

  /** Navigate backward by day/week/month */
  public goPrev = () => {
    this._calendarService.goPrev(this.view());
  };

  /** Reset to today's date */
  public goToToday = () => {
    this._calendarService.goToToday();
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
    this._calendarService.selectYear(year);
  };

  /** Show previous 50 years in the picker */
  public goPrevYears = (event: Event) => {
    event.stopPropagation();
    this._calendarService.goPrevYears();
    this.scrollToTop();
  };

  /** Show next 50 years in the picker */
  public goNextYears = (event: Event) => {
    event.stopPropagation();
    this._calendarService.goNextYears();
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
    this.announceSelection(date);
  }

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
  public startEditEvent(event: EventType) {
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

    // If in edit mode
    if (this.editingEvent()) {
      this._calendarService.updateEvent(newEvent);
    } else {
      this._calendarService.addEvent(newEvent);
    }

    // Emit added/updated event to the consumer
    this.event.emit(newEvent);

    // Close the modal if modifying is done (async)
    const isLoading = this.isModifyingEventInternal();
    if (!isLoading) this.closeModal();
  }

  /**
   * Deletes an event by its ID.
   *
   * @param eventId - The ID of the event to delete.
   */
  public onDeleteEvent(eventId: string) {
    this._calendarService.removeEvent(eventId);

    /** Emit eventId to delete */
    this.deleteEvent.emit(eventId);
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
    return this._calendarService.generateId();
  }

  // ------------------- Utility methods -------------------

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
   * Scrolls the year picker to the top when navigating between year sets.
   */
  private scrollToTop = (): void => {
    const yearPickerList = this._yearPickerList();
    if (yearPickerList) {
      yearPickerList.nativeElement.scrollTop = 0;
    }
  };
}
