import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePicker } from '../date-picker/date-picker';

@Component({
  selector: 'ntv-date-range-picker',
  imports: [CommonModule, DatePicker],
  templateUrl: './date-range-picker.html',
  styleUrl: './date-range-picker.css',
})
export class DateRangePicker {
  /** Date picker variant */
  public variant = input<'single' | 'double'>('double');

  /** Emits the selected start and end dates values */
  public dates = output<{ start: Date; end: Date }>({});

  /** Start date for the date-range */
  public startDate = signal<Date | null>(null);

  /** End date for the date-range */
  public endDate = signal<Date | null>(null);

  /** Signal if end date is less than start date */
  public isEndDateInvalid = signal<boolean>(false);

  /** On select start date */
  public onSelectStartDate(date: Date) {
    this.startDate.set(date);

    this.isEndDateInvalid.set(this.isDateRangeInvalid());
  }

  /** On select end date and emits the both selected dates */
  public onSelectEndDate(date: Date) {
    this.endDate.set(date);

    this.isEndDateInvalid.set(this.isDateRangeInvalid());

    const _startDate = this.startDate();
    const _endDate = this.endDate();

    if (_startDate && _endDate) {
      this.dates.emit({
        start: _startDate,
        end: _endDate,
      });
    }
  }

  /** Check whether the selected end date is a valid end date */
  private isDateRangeInvalid(): boolean {
    // Check if end date is less than start date
    const endDate = this.endDate();
    const startDate = this.startDate();

    if (endDate && startDate) return endDate <= startDate;
    return false;
  }
}

/**
 * If selected end date is naa, but start date is null pa, then
 * disable nato ang next date based sa endDate so if selecting 26 as end date and wala pa syay startdate then and available options are
 * going to be 25 below dates nalang - DONE
 *
 * Next -> highlight the startDate and endDate
 *
 *
 *
 */
