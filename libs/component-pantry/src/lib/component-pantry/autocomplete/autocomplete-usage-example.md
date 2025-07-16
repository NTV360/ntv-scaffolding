# Autocomplete Component - Usage Examples

## ✨ NEW: Super DRY Usage with Config Object

### Before (Verbose):
```html
<ntv-autocomplete
  [options]="countries"
  [config]="{
    placeholder: 'Search countries...',
    searchable: true,
    clearable: true,
    multiple: false,
    maxSelections: 1,
    minSearchLength: 2,
    debounceTime: 300,
    noResultsText: 'No countries found',
    loadingText: 'Loading countries...',
    maxDisplayItems: 10
  }"
  [size]="'lg'"
  [variant]="'primary'"
  [disabled]="false"
  [loading]="isLoading"
  label="Select Country"
  info="Choose your country of residence"
  error="Country selection is required"
  (selectionChange)="onCountrySelect($event)"
  (searchChange)="onSearch($event)"
  (dropdownToggle)="onDropdownToggle($event)">
</ntv-autocomplete>
```

### After (DRY & Clean):
```html
<ntv-autocomplete
  [options]="countries"
  [config]="countryAutocompleteConfig"
  (selectionChange)="onCountrySelect($event)">
</ntv-autocomplete>
```

## Component Setup

```typescript
import { AutocompleteConfig, AutocompleteOption } from '@ntv/component-pantry';

@Component({
  // ...
})
export class MyComponent {
  // Define your autocomplete configuration
  countryAutocompleteConfig: AutocompleteConfig = {
    placeholder: 'Search countries...',
    searchable: true,
    clearable: true,
    multiple: false,
    maxSelections: 1,
    minSearchLength: 2,
    debounceTime: 300,
    noResultsText: 'No countries found',
    loadingText: 'Loading countries...',
    maxDisplayItems: 10
  };
  
  countries: AutocompleteOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    // ... more options
  ];
  
  isLoading = false;
  
  onCountrySelect(event: AutocompleteChangeEvent) {
    console.log('Selected:', event.value, event.option);
  }
}
```

## Multiple Autocomplete Configurations

```typescript
export class MyComponent {
  // Different autocomplete configs for different scenarios
  countryConfig: AutocompleteConfig = {
    placeholder: 'Select country...',
    searchable: true,
    clearable: true,
    noResultsText: 'No countries found'
  };
  
  technologyConfig: AutocompleteConfig = {
    placeholder: 'Select technologies...',
    multiple: true,
    maxSelections: 5,
    searchable: true,
    clearable: true,
    noResultsText: 'No technologies found'
  };
  
  skillsConfig: AutocompleteConfig = {
    placeholder: 'Add skills...',
    multiple: true,
    searchable: true,
    minSearchLength: 1,
    debounceTime: 200,
    maxDisplayItems: 8
  };
}
```

```html
<div class="form-group">
  <ntv-autocomplete 
    [options]="countries" 
    [config]="countryConfig" 
    label="Country"
    (selectionChange)="onCountrySelect($event)">
  </ntv-autocomplete>
  
  <ntv-autocomplete 
    [options]="technologies" 
    [config]="technologyConfig" 
    label="Technologies"
    (selectionChange)="onTechSelect($event)">
  </ntv-autocomplete>
  
  <ntv-autocomplete 
    [options]="skills" 
    [config]="skillsConfig" 
    label="Skills"
    (selectionChange)="onSkillsSelect($event)">
  </ntv-autocomplete>
</div>
```

## Backward Compatibility

The component still supports individual properties for simple use cases:

```html
<!-- Simple usage -->
<ntv-autocomplete [options]="options"></ntv-autocomplete>

<!-- Individual properties still work -->
<ntv-autocomplete 
  [options]="options" 
  placeholder="Search..." 
  [searchable]="true">
</ntv-autocomplete>

<!-- Mix config with individual overrides -->
<ntv-autocomplete 
  [options]="options" 
  [config]="baseConfig" 
  placeholder="Override placeholder">
</ntv-autocomplete>
```

## Form Integration with Config

```typescript
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-example',
  imports: [ReactiveFormsModule, Autocomplete],
  template: `
    <form [formGroup]="form">
      <ntv-autocomplete
        formControlName="country"
        [options]="countries"
        [config]="countryConfig">
      </ntv-autocomplete>
      
      <ntv-autocomplete
        formControlName="skills"
        [options]="skills"
        [config]="skillsConfig">
      </ntv-autocomplete>
    </form>
  `
})
export class FormExampleComponent {
  form = new FormGroup({
    country: new FormControl(''),
    skills: new FormControl([])
  });

  countryConfig: AutocompleteConfig = {
    placeholder: 'Select country...',
    searchable: true,
    clearable: true
  };
  
  skillsConfig: AutocompleteConfig = {
    placeholder: 'Add skills...',
    multiple: true,
    maxSelections: 10,
    searchable: true
  };
  
  countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' }
  ];
  
  skills = [
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'angular', label: 'Angular' }
  ];
}
```

## Benefits

✅ **90% less template code** when using all properties  
✅ **Type-safe** configuration objects  
✅ **Reusable** autocomplete configurations  
✅ **Backward compatible** with existing code  
✅ **Easy to maintain** and update  
✅ **Clean templates** that focus on content  
✅ **Form integration** friendly  
✅ **Advanced features** like debouncing and filtering

## Basic Usage

```typescript
import { Autocomplete, AutocompleteOption } from '@ntv/component-pantry';

@Component({
  selector: 'app-example',
  template: `
    <ntv-autocomplete
      [options]="countries"
      [config]="autocompleteConfig"
      label="Select Country"
      (selectionChange)="onCountrySelect($event)"
    ></ntv-autocomplete>
  `
})
export class ExampleComponent {
  countries: AutocompleteOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    // ... more options
  ];

  autocompleteConfig = {
    placeholder: 'Search countries...',
    searchable: true,
    clearable: true,
  };

  onCountrySelect(event: AutocompleteChangeEvent) {
    console.log('Selected:', event.value, event.option);
  }
}
```

## Multiple Selection

```html
<ntv-autocomplete
  [options]="technologies"
  [config]="{
    placeholder: 'Select technologies...',
    multiple: true,
    maxSelections: 5,
    searchable: true,
    clearable: true
  }"
  label="Technologies"
  info="Select up to 5 technologies"
  (selectionChange)="onTechSelect($event)"
></ntv-autocomplete>
```

## Grouped Options

```typescript
const groupedOptions: AutocompleteGroup[] = [
  {
    label: 'Frontend',
    options: [
      { value: 'angular', label: 'Angular', group: 'Frontend' },
      { value: 'react', label: 'React', group: 'Frontend' },
    ]
  },
  {
    label: 'Backend',
    options: [
      { value: 'nodejs', label: 'Node.js', group: 'Backend' },
      { value: 'python', label: 'Python', group: 'Backend' },
    ]
  }
];
```

## With Form Control

```typescript
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-example',
  imports: [ReactiveFormsModule, Autocomplete],
  template: `
    <form [formGroup]="form">
      <ntv-autocomplete
        formControlName="country"
        [options]="countries"
        [config]="{ placeholder: 'Select country...' }"
        label="Country"
      ></ntv-autocomplete>
    </form>
  `
})
export class FormExampleComponent {
  form = new FormGroup({
    country: new FormControl('')
  });

  countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
  ];
}
```

## Custom Filter

```html
<ntv-autocomplete
  [options]="options"
  [customFilter]="customFilterFn"
  [config]="{ searchable: true }"
  label="Custom Search"
></ntv-autocomplete>
```

```typescript
customFilterFn = (option: AutocompleteOption, searchTerm: string) => {
  // Custom logic: match beginning of words
  return option.label.toLowerCase().startsWith(searchTerm.toLowerCase());
};
```

## Loading State

```html
<ntv-autocomplete
  [options]="dynamicOptions"
  [loading]="isLoading"
  [config]="{
    placeholder: 'Search...',
    loadingText: 'Fetching results...'
  }"
  label="Dynamic Options"
  (searchChange)="onSearch($event)"
></ntv-autocomplete>
```

```typescript
onSearch(searchTerm: string) {
  this.isLoading = true;
  this.apiService.search(searchTerm).subscribe(results => {
    this.dynamicOptions = results;
    this.isLoading = false;
  });
}
```

## Configuration Options

```typescript
interface AutocompleteConfig {
  placeholder?: string;           // Input placeholder
  searchable?: boolean;          // Enable search functionality
  clearable?: boolean;           // Show clear button
  multiple?: boolean;            // Allow multiple selections
  maxSelections?: number;        // Max selections in multiple mode
  minSearchLength?: number;      // Min chars before filtering
  debounceTime?: number;         // Search debounce time (ms)
  noResultsText?: string;        // No results message
  loadingText?: string;          // Loading message
  maxDisplayItems?: number;      // Max items in dropdown
}
```

## Keyboard Navigation

- **Arrow Down/Up**: Navigate through options
- **Enter**: Select highlighted option
- **Escape**: Close dropdown
- **Tab**: Move to next form element

## Accessibility Features

- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Focus management
- High contrast mode support

## Styling Variants

```html
<!-- Different sizes -->
<ntv-autocomplete size="sm" [options]="options"></ntv-autocomplete>
<ntv-autocomplete size="md" [options]="options"></ntv-autocomplete>
<ntv-autocomplete size="lg" [options]="options"></ntv-autocomplete>

<!-- Different variants -->
<ntv-autocomplete variant="default" [options]="options"></ntv-autocomplete>
<ntv-autocomplete variant="primary" [options]="options"></ntv-autocomplete>
<ntv-autocomplete variant="success" [options]="options"></ntv-autocomplete>
<ntv-autocomplete variant="danger" [options]="options"></ntv-autocomplete>
```

## Events

```typescript
// Selection change event
(selectionChange)="onSelectionChange($event)"

// Search input change (debounced)
(searchChange)="onSearchChange($event)"

// Dropdown open/close
(dropdownToggle)="onDropdownToggle($event)"
```