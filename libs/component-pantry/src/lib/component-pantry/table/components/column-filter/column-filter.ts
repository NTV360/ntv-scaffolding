import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

//Local
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FILE_ICONS } from '../../../../utils/file-icons';
import { TableColumn } from '../../table.types';

@Component({
  selector: 'ntv-column-filter',
  imports: [CommonModule],
  templateUrl: './column-filter.html',
  styleUrl: './column-filter.css',
})
export class ColumnFilter {
  // Used to sanitize potentially unsafe HTML content for safe binding
  private sanitizer = inject(DomSanitizer);

  // Inputs
  column = input.required<TableColumn>();
  data = input<any[]>([]);
  filterValue = input<any>('');
  sortField = input<string | null>(null);
  sortOrder = input<'asc' | 'desc'>('asc');
  isPopupOpen = input<boolean>(false);

  // Outputs
  filterChange = output<{ field: string; value: any }>();
  sortChange = output<string>();
  togglePopup = output<{ field: string; event?: Event }>();
  closePopup = output<void>();

  // SVG
  public readonly filtersIcon: SafeHtml;

  constructor() {
    this.filtersIcon = this.sanitizer.bypassSecurityTrustHtml(
      FILE_ICONS['FILTER']
    );
  }

  onFilterInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filterChange.emit({ field: this.column().field, value: target.value });
  }

  onFilterSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filterChange.emit({ field: this.column().field, value: target.value });
  }

  onToggleFilterPopup(event?: Event): void {
    this.togglePopup.emit({ field: this.column().field, event });
  }

  onCloseFilterPopup(): void {
    this.closePopup.emit();
  }

  onSort(): void {
    this.sortChange.emit(this.column().field);
  }

  onClearFilter(): void {
    this.filterChange.emit({ field: this.column().field, value: '' });
  }

  getSortIcon(): string {
    const sortField = this.sortField();
    const sortOrder = this.sortOrder();
    const columnField = this.column().field;

    if (sortField !== columnField) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  }

  getUniqueValues(): string[] {
    const data = this.data();
    const field = this.column().field;
    // Get all unique values from the original data, excluding current column's filter
    const values = data
      .map((item) => item[field])
      .filter((value) => value !== null && value !== undefined);
    return [...new Set(values)].sort();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
