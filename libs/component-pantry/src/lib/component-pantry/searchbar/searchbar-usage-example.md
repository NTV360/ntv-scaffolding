# Searchbar Component Usage Examples

The Searchbar component provides a search input field with a search button and minimum character validation.

## Basic Usage

```html
<!-- Basic usage with location search -->
<lib-searchbar
  placeholder="Search for cities, landmarks, or countries..."
  [minCharacters]="2"
  variant="default"
  (search)="onSearch($event)"
  (searchValueChange)="onValueChange($event)">
</lib-searchbar>
```

```typescript
export class MyComponent {
  onSearch(searchTerm: string): void {
    console.log('Searching for:', searchTerm);
    // The searchbar automatically filters through built-in location data
    // You can also implement your own search logic here
  }
  
  onValueChange(value: string): void {
    console.log('Search value changed:', value);
    // Handle real-time value changes
    // Autocomplete dropdown will only show after clicking the search button
  }
}
```

## Configuration Options

### Different Sizes

```html
<!-- Extra Small -->
<lib-searchbar size="xs" placeholder="Search..."></lib-searchbar>

<!-- Small -->
<lib-searchbar size="sm" placeholder="Search..."></lib-searchbar>

<!-- Medium (Default) -->
<lib-searchbar size="md" placeholder="Search..."></lib-searchbar>

<!-- Large -->
<lib-searchbar size="lg" placeholder="Search..."></lib-searchbar>
```

### Visual Variants

The searchbar inherits variants from the ntv-input component:
 
 ```html
 <!-- Default variant -->
 <lib-searchbar variant="default" placeholder="Default style"></lib-searchbar>
 
 <!-- Primary variant -->
 <lib-searchbar variant="primary" placeholder="Primary style"></lib-searchbar>
 
 <!-- Success variant -->
 <lib-searchbar variant="success" placeholder="Success style"></lib-searchbar>
 
 <!-- Danger variant -->
 <lib-searchbar variant="danger" placeholder="Danger style"></lib-searchbar>
 ```

### Minimum Character Requirements

```html
<!-- Require at least 1 character -->
<lib-searchbar [minCharacters]="1" placeholder="Search..."></lib-searchbar>

<!-- Require at least 3 characters (default) -->
<lib-searchbar [minCharacters]="3" placeholder="Search..."></lib-searchbar>

<!-- Require at least 5 characters -->
<lib-searchbar [minCharacters]="5" placeholder="Search..."></lib-searchbar>
```

### Disabled State

```html
<lib-searchbar 
  [disabled]="true" 
  placeholder="Search is disabled...">
</lib-searchbar>
```

## Advanced Usage

### With Form Integration

```html
<form (ngSubmit)="onSubmit()">
  <lib-searchbar
    placeholder="Search users..."
    [minCharacters]="2"
    [disabled]="isLoading"
    (search)="performSearch($event)"
    (searchValueChange)="onSearchValueChange($event)">
  </lib-searchbar>
  
  <div *ngIf="searchResults.length > 0" class="search-results">
    <div *ngFor="let result of searchResults" class="result-item">
      {{ result.name }}
    </div>
  </div>
</form>
```

```typescript
export class SearchComponent {
  searchResults: any[] = [];
  isLoading = false;
  
  performSearch(searchTerm: string): void {
    if (searchTerm.trim()) {
      this.isLoading = true;
      this.searchService.search(searchTerm).subscribe({
        next: (results) => {
          this.searchResults = results;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Search failed:', error);
          this.isLoading = false;
        }
      });
    }
  }
  
  onSearchValueChange(value: string): void {
    // Clear results if search term is too short
    if (value.length < 2) {
      this.searchResults = [];
    }
  }
}
```

### Real-time Search with Debouncing

```typescript
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

export class RealTimeSearchComponent {
  private searchSubject = new Subject<string>();
  searchResults: any[] = [];
  
  constructor(private searchService: SearchService) {
    // Set up debounced search
    this.searchSubject.pipe(
      debounceTime(300), // Wait 300ms after user stops typing
      distinctUntilChanged(), // Only search if the term changed
      switchMap(term => this.searchService.search(term))
    ).subscribe(results => {
      this.searchResults = results;
    });
  }
  
  onSearchValueChange(value: string): void {
    if (value.length >= 2) {
      this.searchSubject.next(value);
    } else {
      this.searchResults = [];
    }
  }
  
  onSearch(searchTerm: string): void {
    // Immediate search when button is clicked
    this.searchService.search(searchTerm).subscribe(results => {
      this.searchResults = results;
    });
  }
}
```

## Component API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `placeholder` | `string` | `'Search...'` | Placeholder text for the search input |
| `minCharacters` | `number` | `3` | Minimum number of characters required to enable search button |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size of the search input |
| `variant` | `'default' \| 'primary' \| 'success' \| 'danger' \| string` | `'default'` | Visual variant of the searchbar (inherited from input component) |
| `disabled` | `boolean` | `false` | Whether the search input is disabled |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `search` | `string` | Emitted when search is performed (button click or Enter key) |
| `searchValueChange` | `string` | Emitted when search input value changes |

## Features

- **Built-in validation**: Search button is disabled until minimum character requirement is met
- **Keyboard support**: Press Enter to search when minimum characters are met
- **Visual variants**: Inherits input component variants (default, primary, success, danger, and custom strings)
- **Location autocomplete**: Built-in search functionality with 20+ cities, landmarks, and regions
- **Smart filtering**: Search by location name, country, or region
- **Dropdown results**: Interactive dropdown with location details and type indicators
- **Responsive design**: Stacks vertically on mobile devices
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Visual feedback**: Shows minimum character requirement message
- **Icon integration**: Search icon in the input field
- **Flexible sizing**: Multiple size options to fit different layouts

## Built-in Location Data

The searchbar includes dummy location data for testing and demonstration:

- **15 Cities**: New York, London, Tokyo, Paris, Sydney, Dubai, Singapore, Los Angeles, Barcelona, Toronto, Berlin, Mumbai, Rome, Bangkok, Amsterdam
- **5 Landmarks**: Eiffel Tower, Statue of Liberty, Great Wall of China, Machu Picchu, Taj Mahal
- **6 Regions**: North America, Europe, Asia, Oceania, Middle East, South America

Users can search by:
- Location name (e.g., "Paris", "Tokyo")
- Country name (e.g., "France", "Japan")
- Region name (e.g., "Europe", "Asia")

## Styling

The component uses Tailwind CSS classes and can be customized through CSS custom properties or by overriding the component styles.

```css
/* Custom search results styling */
.search-results {
  /* Customize dropdown appearance */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.search-result-item:hover {
  /* Custom hover effect */
  background-color: #f0f9ff;
}

/* Custom button color */
.search-button {
  --tw-bg-opacity: 1;
  background-color: rgb(34 197 94 / var(--tw-bg-opacity)); /* Green instead of blue */
}

.search-button:hover {
  background-color: rgb(21 128 61 / var(--tw-bg-opacity));
}
```