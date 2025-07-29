import { computed, signal } from '@angular/core';
import { Event } from '../calendar.types';
import {
  isSameDay,
  isPastDate,
  addDays,
  addMonths,
  generateYears,
} from '../utils';

/**
 * Component-Level Service Only
 *
 * Since we're reusing some functionalities into the date-pickers as well so that they won't share the same data (just pure functionality)
 */
export class CalendarService {
  private _numberOfYearsToShow = signal<number>(50);

  /**
   * Today's date
   * @private
   */
  private _today = new Date();

  /**
   * Current date signal
   * @private
   */
  private _currentDate = signal(this._today);

  /**
   * Private version of events that's solely intended to be modified inside the service
   * @private
   */
  private _events = signal<Event[]>([]);

  /** Accepts selected date from parent component
   * @private
   */
  private _savedSelectedDate = signal<Date | null>(null);

  /** Available years to show in the year-picker list
   * @private
   */
  private _availableYears = signal<number[]>(
    this.generateYears(this._today.getFullYear())
  );

  /** Currently selected date for highlight
   * @public
   */
  public selectedDateForHighlight = signal<Date | null>(null);

  /**
   * Public version of events that's intended to be used to the 'using component' as readonly value
   * @public
   */
  public allEvents = this._events.asReadonly();

  /**
   * Current selected date
   * @public
   */
  public currentDate = this._currentDate.asReadonly();

  /**
   * Reactive current year as read-only value
   * @public
   */
  public currentYear = computed(() => this._currentDate().getFullYear());

  /**
   * Reactive available years
   * @public
   */
  public availableYears = this._availableYears.asReadonly();

  // Load initial inputs from parent component
  // Add JSDoc here later --------
  public setInitialInputs(
    events: Event[] | null,
    savedSelectedDate?: Date | null,
    numberOfYearsToShow?: number
  ): void {
    if (events) this._events.set(events);
    if (savedSelectedDate) this._savedSelectedDate.set(savedSelectedDate);
    if (numberOfYearsToShow) this._numberOfYearsToShow.set(numberOfYearsToShow);
  }

  // Add new event
  public addEvent(event: Event): void {
    this._events.set([...this._events(), event]);
  }

  // Updated specific event
  public updateEvent(updatedEvent: Event): void {
    this._events.update((prevEvents) => {
      return prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      );
    });
  }

  // Delete / Remove an event
  public removeEvent(eventId: string): void {
    this._events.update((prevEvents) => {
      return prevEvents.filter((event) => event.id !== eventId);
    });
  }

  /** Setters */
  /** Go to today */
  public goToToday(): void {
    this._currentDate.set(new Date(this._today));
  }

  /** Select a year */
  public selectYear = (year: number) => {
    const currentDate = this._currentDate();
    const newDate = new Date(
      year,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    this._currentDate.set(newDate);
  };

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
    const start = this.startOfWeek(this.startOfMonth(this._currentDate()));
    const end = this.endOfWeek(this.endOfMonth(this._currentDate()));
    const weeks = [];

    const currentDate = new Date(start);
    while (currentDate <= end) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        week.push({
          date,
          events: this.getEventsForDate(date),
          isToday: isSameDay(date, this._today),
          isCurrentMonth: date.getMonth() === this._currentDate().getMonth(),
          isSelected: this.selectedDateForHighlight()
            ? isSameDay(date, this.selectedDateForHighlight() || new Date())
            : this._savedSelectedDate()
            ? isSameDay(date, this._savedSelectedDate() || new Date())
            : false,
          isPast: this.isPastDate(date),
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      weeks.push(week);
    }
    return weeks;
  });

  /** Navigate forward by day/week/month */
  public goNext(view: 'day' | 'week' | 'month') {
    const current = this._currentDate();
    if (view === 'day') this._currentDate.set(addDays(current, 1));
    else if (view === 'week') this._currentDate.set(addDays(current, 7));
    else if (view === 'month') this._currentDate.set(addMonths(current, 1));
  }

  /** Navigate backward by day/week/month */
  public goPrev(view: 'day' | 'week' | 'month') {
    const current = this._currentDate();
    if (view === 'day') this._currentDate.set(addDays(current, -1));
    else if (view === 'week') this._currentDate.set(addDays(current, -7));
    else if (view === 'month') this._currentDate.set(addMonths(current, -1));
  }

  /** Show previous 50 years in the picker */
  public goPrevYears = () => {
    const firstElementYear = this._availableYears()[0];
    this._availableYears.set(this.generateYears(firstElementYear - 1));
  };

  /** Show next 50 years in the picker */
  public goNextYears = () => {
    const lastElementYear =
      this._availableYears()[this._availableYears().length - 1];
    this._availableYears.set(
      this.generateYears(lastElementYear + 1, 'forward')
    );
  };

  /** Getters */
  /** Returns current date */
  public getCurrentDate(): Date {
    return this._currentDate();
  }

  /** Returns today's date */
  public getToday(): Date {
    return this._today;
  }

  /** Returns savedSelectedDate (inputted) */
  public getSavedSelectedDate(): Date | null {
    return this._savedSelectedDate();
  }

  /**
   * Retrieve events for a specific date.
   * @param date Date to check.
   */
  public getEventsForDate(date: Date): Event[] {
    return this._events().filter((event) => isSameDay(date, event.date));
  }

  /**
   * Check if a date is in the past
   * @param date Date to check
   */
  public isPastDate(date: Date): boolean {
    return isPastDate(date);
  }

  /**
   * Generates a random ID for new events.
   *
   * @returns A randomly generated string ID.
   */
  public generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  /**
   * Generates a list of 50 years based on the base year and direction.
   *
   * @param baseYear - The starting year.
   * @param direction - 'forward' for future years or 'backward' for past years. Default is 'backward'.
   * @param numberOfYearsToShow - number of years to show in the list
   * @returns An array of 50 years.
   */
  public generateYears(
    baseYear: number,
    direction: 'forward' | 'backward' = 'backward',
    numberOfYearsToShow = 25
  ) {
    return generateYears(baseYear, direction, numberOfYearsToShow);
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
}
