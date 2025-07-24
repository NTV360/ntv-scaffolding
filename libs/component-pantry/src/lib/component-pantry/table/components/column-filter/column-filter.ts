import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

//Local
import { DomSanitizer } from '@angular/platform-browser';
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

  // Outputs
  filterChange = output<{ field: string; value: any }>();
  sortChange = output<string>();

  onFilterInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filterChange.emit({ field: this.column().field, value: target.value });
  }

  onFilterSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filterChange.emit({ field: this.column().field, value: target.value });
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
