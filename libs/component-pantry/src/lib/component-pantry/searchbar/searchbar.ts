import {
  Component,
  input,
  output,
  signal,
  computed,
  ElementRef,
  inject,
  effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Input } from '../input/input';
import { SearchbarVariant } from './searchbar.types';

interface Location {
  id: number;
  name: string;
  country: string;
}

@Component({
  selector: 'ntv-searchbar',
  standalone: true,
  imports: [Input, FormsModule, CommonModule],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.css',
})
export class Searchbar {
  /** Injects a reference to the host DOM element of the component */
  private el = inject(ElementRef);

  /** Placeholder text for the search input */
  readonly placeholder = input<string>('Search...');

  /** Minimum number of characters required to enable search button */
  readonly minCharacters = input<number>(3);

  /** Size of the search input */
  readonly size = input<'xs' | 'sm' | 'md' | 'lg'>('md');

  /** Button BG color */
  readonly buttonBgColor = input<string>('#8DCB2C');

  /** Border radius of the searchbar components */
  readonly borderRadius = input<'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'>(
    'md'
  );

  /** Visual variant of the searchbar */
  readonly variant = input<SearchbarVariant>('default');

  /** Whether the search input is disabled */
  readonly disabled = input<boolean>(false);

  /** Event emitted when search is performed */
  readonly selectedValue = output<Location>();

  /** Event emitted when search input value changes */
  readonly searchValueChange = output<string>();

  /** Data source for search results */
  readonly data = input<Location[]>([]);

  /** Current search value */
  readonly searchValue = signal<string>('');

  /** Search results visibility */
  readonly showResults = signal<boolean>(false);

  /** Loading state for search results */
  readonly isLoading = signal<boolean>(false);

  /** Filtered search results */
  readonly searchResults = computed(() => {
    const query = this.searchValue().toLowerCase().trim();
    if (query.length < this.minCharacters()) {
      return [];
    }

    return this.data()
      .filter(
        (location) =>
          location.name.toLowerCase().includes(query) ||
          location.country.toLowerCase().includes(query)
      )
      .slice(0, 8); // Limit to 8 results
  });

  /** Whether the search button should be disabled */
  readonly isSearchDisabled = computed(() => {
    return this.searchValue().length < this.minCharacters() || this.disabled();
  });

  /** Computed CSS classes for the search button */
  readonly buttonClasses = computed(() => {
    // Match input padding based on size
    const verticalPadding =
      this.size() === 'sm' ? 'py-2' : this.size() === 'lg' ? 'py-4' : 'py-3';

    // Match input border radius
    const radius =
      {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      }[this.borderRadius()] || 'rounded-md';

    const baseClasses = `inline-flex items-center gap-2 px-4 ${verticalPadding} text-sm font-medium text-white border border-transparent ${radius} shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`;
    return `${baseClasses} `;
  });

  constructor() {
    effect(() => {
      this.el.nativeElement.style.setProperty(
        '--header-bg-color',
        this.buttonBgColor()
      );
    });
  }

  /** Handle input value changes */
  onSearchValueChange(value: string): void {
    this.searchValue.set(value);
    this.searchValueChange.emit(value);

    // Hide results when user changes input - they need to click search button again
    this.showResults.set(false);
  }

  /** Handle search button click */
  onSearch(): void {
    if (!this.isSearchDisabled()) {
      this.onSearchWithLoading();
    }
  }

  /** Handle search with loading simulation */
  onSearchWithLoading(): void {
    if (!this.isSearchDisabled()) {
      // Only show loading if there are no results to display
      const currentResults = this.searchResults();
      if (currentResults.length === 0) {
        this.isLoading.set(true);
        this.showResults.set(true);

        // Simulate API loading delay when no data is available
        setTimeout(() => {
          this.isLoading.set(false);
        }, 1000);
      } else {
        // If we have results, show them immediately
        this.showResults.set(true);
      }
    }
  }

  /** Handle Enter key press in search input */
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !this.isSearchDisabled()) {
      this.onSearch();
    } else if (event.key === 'Escape') {
      this.showResults.set(false);
    }
  }

  /** Handle location selection from results */
  onLocationSelect(location: Location): void {
    console.log(location, 'uhu');
    this.searchValue.set(location.name);
    this.searchValueChange.emit(location.name);
    this.selectedValue.emit(location);
    this.showResults.set(false);
  }

  /** Handle input blur to hide results */
  onInputBlur(): void {
    // Don't automatically hide results on blur since we want them to persist after search button click
    // Results will be hidden when user selects a location or manually dismisses them
  }

  /** Handle input focus to show results if applicable */
  onInputFocus(): void {
    // Don't show results on focus, only show after search button click
  }
}
