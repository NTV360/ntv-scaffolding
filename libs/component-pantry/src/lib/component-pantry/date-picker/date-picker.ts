import {
  Component,
  ElementRef,
  inject,
  input,
  OnChanges,
  output,
  signal,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarService } from '../calendar/service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FILE_ICONS } from '../../utils';
import { Popover } from '../popover/popover';
import { MONTHS } from '../calendar/calendar.constants';
import { isSameDay } from '../calendar/utils';

@Component({
  selector: 'ntv-date-picker',
  imports: [CommonModule, Popover],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.css',
  providers: [CalendarService],
})
export class DatePicker implements OnChanges {
  /** Calendar service for reusing some functions */
  private _calendarService = inject(CalendarService);

  /** Used to sanitize potentially unsafe HTML content for safe binding */
  private _sanitizer = inject(DomSanitizer);

  /** Reference to the host element */
  private _elRef = inject<ElementRef<HTMLDivElement>>(ElementRef);
  /** Popover reference to hide the popover programatically */
  private _popoverRef = viewChild<Popover>('datePicker');

  /** Date picker variants */
  public variant = input<'date-range' | 'birthday' | 'events'>('events');

  /** Selected date input (used in date-range) */
  public startDate = input<Date | null>(null);

  /** End range date (used in date-range) */
  public endDate = input<Date | null>(null);

  /** Placeholder to be displayed in the input (defaults to formatted current date) */
  public placeholder = input<string>('');

  /** Emits selected date */
  public selectDate = output<Date>();

  /** Selected date */
  public selectedDate = signal<Date>(this._calendarService.getToday());

  /** Current viewing month */
  public currentViewingMonth = signal<Date>(new Date());

  /** Comment later */
  public hasSelectedStartDate = signal<boolean>(this.startDate() !== null);

  /** */
  public showYearsList = signal<boolean>(false);

  /** See reactive monthWeeks docs */
  public monthOfWeeks = this._calendarService.monthWeeks;

  /** List of week days */
  public weekDays = ['S', 'M', 'T', 'W', 'TH', 'F', 'S'];

  /** List of months */
  public months = MONTHS;

  /** Current year */
  public currentYear = this._calendarService.currentYear;

  /** Available years */
  public availableYears = this._calendarService.availableYears;

  /** Sanitized SVG Icons */
  public readonly calendarIcon: SafeHtml;
  public readonly arrowLeftIcon: SafeHtml;
  public readonly arrowRightIcon: SafeHtml;
  public readonly arrowDown: SafeHtml;

  constructor() {
    this.calendarIcon = this._sanitizer.bypassSecurityTrustHtml(
      FILE_ICONS['CALENDAR']
    );
    this.arrowLeftIcon = this._sanitizer.bypassSecurityTrustHtml(
      FILE_ICONS['CHEVRON_LEFT']
    );
    this.arrowRightIcon = this._sanitizer.bypassSecurityTrustHtml(
      FILE_ICONS['CHEVRON_RIGHT']
    );
    this.arrowDown = this._sanitizer.bypassSecurityTrustHtml(
      FILE_ICONS['CHEVRON_DOWN']
    );
  }

  /** Update the hasSelectedStartDate when startDate changes
   * so the start-range-day class will be added (used in date-range)
   * UI Purposes only */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDate']) {
      if (changes['startDate'].currentValue) {
        this.hasSelectedStartDate.set(true);
      }
    }
  }

  /** Get start date */
  public getStartDate(): Date | null {
    return this.startDate();
  }

  /** get end date */
  public getEndDate(): Date | null {
    return this.endDate() ?? null;
  }

  /** Navigate forward by month */
  public goNext(): void {
    this._calendarService.goNext('month');
    const newCurrentDate = this._calendarService.getCurrentDate();
    this.currentViewingMonth.set(newCurrentDate);
  }

  /** Navigate backward by month */
  public goPrev(): void {
    this._calendarService.goPrev('month');
    const newCurrentDate = this._calendarService.getCurrentDate();
    this.currentViewingMonth.set(newCurrentDate);
  }

  /** Navigate backward next set of available years */
  public goPrevYears(): void {
    this._calendarService.goPrevYears();
  }

  /** Navigate forward next set of available years */
  public goNextYears(): void {
    this._calendarService.goNextYears();
  }

  /** Set selected date on day click */
  public onSelectDate(date: Date, event: MouseEvent): void {
    this.selectedDate.set(date);

    this.selectDate.emit(date);

    // Close the popover after selecting a date
    this._popoverRef()?.toggle(event);
  }

  /** Toggle year selection view */
  public toggleSelectYear(year?: number): void {
    const isSelectYearViewOpen = this.showYearsList();
    if (isSelectYearViewOpen && year) {
      this._calendarService.selectYear(year);
      const newCurrentViewingMonth = this.currentViewingMonth();
      newCurrentViewingMonth.setFullYear(year);
      this.currentViewingMonth.set(newCurrentViewingMonth);
    }
    this.showYearsList.update((prev) => !prev);
  }

  /** Utilities */

  /** Checks if both dates are the same */
  public isSameDay(d1: Date, d2: Date | null): boolean {
    if (!d2) return false;
    return isSameDay(d1, d2);
  }

  /** Checks if dateToCheck is between startDate and endDate (inclusive) */
  public isInRange(
    dateToCheck: Date,
    startDate: Date | null,
    endDate?: Date | null
  ): boolean {
    if (!endDate || !startDate) return false;

    // Ensure startDate is before endDate
    const start = startDate <= endDate ? startDate : endDate;
    const end = startDate <= endDate ? endDate : startDate;

    return dateToCheck > start && dateToCheck < end;
  }

  /** Checks if the provided date is before the selected startDate
   *
   * Used in the end-date-picker so only the days ahead of the selectedDate is selectable as endDate
   * @param date - Date to be checked
   */
  public isDateRangeInvalid(date: Date): boolean {
    const startDate = this.startDate();
    if (startDate) return date <= startDate;

    return false;
  }

  /** If endDate is selected first and no startDate yet, then all proceding dates after the selected end date
   *  will be disabled - can no longer be selected as startDate
   * @param date - Date to check based on the input endDate
   */
  public isInvalidSelectableStartDate(date: Date): boolean {
    const endDate = this.endDate();
    const startDate = this.startDate();
    if (endDate && !startDate) return date > endDate;
    return false;
  }

  /** Comment here later */
  public getInputLabel(): string {
    return this.placeholder()
      ? this.placeholder()
      : this.formatDateForInput(this.selectedDate());
  }

  /**
   * Formats date for the date picker input trigger label
   * @param {Date} date - Date to be formatted
   * @returns Formatted date with the following format `month / day / year`
   */
  public formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month} / ${day} / ${year}`;
  }
}
