import {
  Component,
  ElementRef,
  ChangeDetectionStrategy,
  effect,
  inject,
  signal,
  input,
  computed,
  forwardRef,
  HostBinding,
  output,
  viewChild,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Input } from '../input/input';
import {
  AutocompleteOption,
  AutocompleteGroup,
  AutocompleteData,
  AutocompleteConfig,
  AutocompleteFilterFn,
  AutocompleteChangeEvent,
  DEFAULT_AUTOCOMPLETE_CONFIG,
} from './autocomplete.types';
import { InputSize } from '../input/input.types';

/**
 * Advanced autocomplete component with comprehensive features
 * 
 * @description A highly configurable autocomplete component that supports:
 * - Single and multiple selection modes
 * - Grouped and flat option structures
 * - Custom filtering with search functionality
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Loading states and error handling
 * - Accessibility features (ARIA support)
 * - Form integration with ControlValueAccessor
 * - Flexible sizing and visual variants
 * - DRY configuration pattern
 * - Custom styling and theming
 * - Dropdown positioning and behavior
 * - Option highlighting and selection
 * - Clear and remove functionality
 * - Backward compatibility
 * 
 * @example
 * // Basic usage
 * <ntv-autocomplete 
 *   [options]="countries" 
 *   [(ngModel)]="selectedCountry">
 * </ntv-autocomplete>
 * 
 * @example
 * // DRY config pattern
 * <ntv-autocomplete [config]="autocompleteConfig"></ntv-autocomplete>
 * 
 * @example
 * // Multiple selection with custom filter
 * <ntv-autocomplete 
 *   [config]="{ multiple: true, searchable: true }"
 *   [options]="skills"
 *   [customFilter]="myCustomFilter"
 *   (selectionChange)="onSelectionChange($event)">
 * </ntv-autocomplete>
 */
@Component({
  selector: 'ntv-autocomplete',
  standalone: true,
  imports: [CommonModule, Input],
  templateUrl: './autocomplete.html',
  styleUrl: './autocomplete.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Autocomplete),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Autocomplete implements ControlValueAccessor {
  /** Reference to the input component (single select) */
  inputRef = viewChild<Input>('inputRef');
  
  /** Reference to the multi-input element (multi select) */
  multiInputRef = viewChild<ElementRef<HTMLInputElement>>('multiInputRef');
  
  /** Reference to the dropdown element */
  dropdownRef = viewChild<ElementRef>('dropdownRef');
  
  /** Reference to the chips container for drag scrolling */
  chipsContainerRef = viewChild<ElementRef<HTMLDivElement>>('chipsContainerRef');

  // === Inputs
  
  /** Array of options or grouped options for the autocomplete */
  readonly options = input<AutocompleteData>([]);
  
  /** 
   * Configuration object for DRY usage - combines all autocomplete properties into a single object
   * @description Reduces template verbosity by 90% when using multiple properties
   */
  readonly config = input<Partial<AutocompleteConfig>>({});
  
  /** Custom filter function for advanced option filtering */
  readonly customFilter = input<AutocompleteFilterFn | null>(null);
  
  /** Whether the autocomplete is in a loading state */
  readonly loading = input<boolean>(false);
  
  /** Whether the autocomplete is disabled */
  readonly disabled = input<boolean>(false);
  
  /** Size of the autocomplete (sm, md, lg) */
  readonly size = input<InputSize>('md');
  
  /** Visual variant or custom hex color for theming */
  readonly variant = input<string>('default');
  
  /** Label text displayed above the autocomplete */
  readonly label = input<string | null>(null);
  
  /** Error message text */
  readonly error = input<string | null>(null);
  
  /** Informational text displayed below the autocomplete */
  readonly info = input<string | null>(null);
  
  /** Unique identifier for the autocomplete element */
  readonly id = input<string>('');
  
  /** Maximum number of chips to display before showing overflow indicator */
  readonly maxDisplayChips = input<number>(5);
  

  
  /** Color scheme for chips (primary, success, warning, error, purple, pink, indigo, gray) */
  readonly chipColor = input<string>('primary');
  
  /** Custom chip colors using CSS custom properties */
  readonly customChipColors = input<{bg?: string, text?: string, border?: string, bgHover?: string}>({});

  // === Outputs
  
  /** Event emitted when selection changes */
  readonly selectionChange = output<AutocompleteChangeEvent>();
  
  /** Event emitted when search term changes */
  readonly searchChange = output<string>();
  
  /** Event emitted when dropdown opens or closes */
  readonly dropdownToggle = output<boolean>();

  // === Internal state
  
  /** Current search term entered by the user */
  readonly searchTerm = signal<string>('');
  
  /** Array of currently selected options */
  readonly selectedOptions = signal<AutocompleteOption[]>([]);
  
  /** Whether the dropdown is currently open */
  readonly isOpen = signal<boolean>(false);
  
  /** Index of the currently highlighted option (-1 if none) */
  readonly highlightedIndex = signal<number>(-1);
  
  /** Internal disabled state managed by form controls */
  readonly disabledState = signal<boolean>(false);
  
  /** Whether to show all chips or limit to maxDisplayChips */
  readonly showAllChips = signal<boolean>(false);

  /** Timeout reference for debounced search */
  private searchTimeout: ReturnType<typeof setTimeout> | null = null;
  
  /** Reference to the host element */
  private el = inject(ElementRef);

  // === Computed
  
  /** 
   * Merged configuration combining default config with provided config object
   * @description Provides a single source of truth for all component configuration
   */
  readonly mergedConfig = computed(() => ({
    ...DEFAULT_AUTOCOMPLETE_CONFIG,
    ...this.config(),
  }));

  /** 
   * Flattened array of all options (converts grouped options to flat structure)
   * @description Handles both flat and grouped option structures
   */
  readonly flatOptions = computed(() => {
    const opts = this.options();
    if (!opts.length) return [];
    
    // Check if it's grouped data
    if ('options' in opts[0]) {
      return (opts as AutocompleteGroup[]).flatMap((group: AutocompleteGroup) => group.options);
    }
    return opts as AutocompleteOption[];
  });

  /** 
   * Filtered options based on search term and configuration
   * @description Applies custom or default filtering logic
   */
  readonly filteredOptions = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const allOptions = this.flatOptions();
    const config = this.mergedConfig();
    const customFilter = this.customFilter();

    if (!config.searchable || term.length < (config.minSearchLength || 0)) {
      return allOptions.slice(0, config.maxDisplayItems);
    }

    const filtered = customFilter
      ? allOptions.filter(option => customFilter(option, term))
      : allOptions.filter(option => 
          option.label.toLowerCase().includes(term) && !option.disabled
        );

    return filtered.slice(0, config.maxDisplayItems);
  });

  /** 
   * Display value for the input field based on selected options
   * @description Handles both single and multiple selection display
   */
  readonly displayValue = computed(() => {
    const selected = this.selectedOptions();
    const config = this.mergedConfig();
    
    if (!selected.length) return '';
    
    if (config.multiple) {
      return selected.map(opt => opt.label).join(', ');
    }
    
    return selected[0]?.label || '';
  });

  /** Whether the dropdown should be visible */
  readonly showDropdown = computed(() => 
    this.isOpen() && !this.disabled() && !this.disabledState()
  );

  /** Whether any options are currently selected */
  readonly hasSelection = computed(() => this.selectedOptions().length > 0);

  /** 
   * Whether more options can be added (for multiple selection)
   * @description Checks against maxSelections configuration
   */
  readonly canAddMore = computed(() => {
    const config = this.mergedConfig();
    if (!config.multiple) return false;
    if (!config.maxSelections) return true;
    return this.selectedOptions().length < config.maxSelections;
  });
  
  /** Get visible chips based on display limit */
  readonly visibleChips = computed(() => {
    const selected = this.selectedOptions();
    const maxDisplay = this.maxDisplayChips();
    const showAll = this.showAllChips();
    
    if (showAll || selected.length <= maxDisplay) {
      return selected;
    }
    
    return selected.slice(0, maxDisplay);
  });
  
  /** Get count of overflow chips */
  readonly overflowCount = computed(() => {
    const selected = this.selectedOptions();
    const maxDisplay = this.maxDisplayChips();
    const showAll = this.showAllChips();
    
    if (showAll || selected.length <= maxDisplay) {
      return 0;
    }
    
    return selected.length - maxDisplay;
  });

  @HostBinding('class')
  get hostClass(): string {
    return `autocomplete-container ${this.isOpen() ? 'open' : ''}`;
  }

  constructor() {
    effect(() => {
      this.disabledState.set(this.disabled());
    });

    // Sync input value with display value
    effect(() => {
      const config = this.mergedConfig();
      const isSearching = this.isOpen() && config.searchable;
      
      if (config.multiple) {
        // For multi-select, only sync the search term to the multi-input field
        const inputValue = this.searchTerm();
        const multiInput = this.multiInputRef()?.nativeElement;
        if (multiInput) {
          multiInput.value = inputValue;
        }
      } else {
        // For single-select, sync display value or search term to the regular input
        const inputValue = isSearching ? this.searchTerm() : this.displayValue();
        const inputComponent = this.inputRef();
        if (inputComponent) {
          inputComponent.writeValue(inputValue);
        }
      }
    });



    // Setup drag scrolling for chips container
    effect(() => {
      const chipsContainer = this.chipsContainerRef()?.nativeElement;
      if (chipsContainer) {
        this.setupDragScrolling(chipsContainer);
      }
    });
  }

  // === ControlValueAccessor implementation
  
  /** Callback function for value changes */
  private onChange: ((val: unknown) => void) | null = null;
  
  /** Callback function for touch events */
  private onTouched: (() => void) | null = null;

  /**
   * Writes a new value to the autocomplete component (ControlValueAccessor)
   * @param value - The value to set (single value or array for multiple selection)
   */
  writeValue(value: unknown): void {
    if (value === null || value === undefined) {
      this.selectedOptions.set([]);
      return;
    }

    const config = this.mergedConfig();
    const allOptions = this.flatOptions();

    if (config.multiple && Array.isArray(value)) {
      const selected = value.map(val => 
        allOptions.find(opt => opt.value === val)
      ).filter(Boolean) as AutocompleteOption[];
      this.selectedOptions.set(selected);
    } else {
      const selected = allOptions.find(opt => opt.value === value);
      this.selectedOptions.set(selected ? [selected] : []);
    }
  }

  /**
   * Registers a callback function for value changes (ControlValueAccessor)
   * @param fn - The callback function to register
   */
  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function for touch events (ControlValueAccessor)
   * @param fn - The callback function to register
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the component (ControlValueAccessor)
   * @param isDisabled - Whether the component should be disabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabledState.set(isDisabled);
  }

  /** Flag to track if user is actively interacting with dropdown options */
  private isInteractingWithDropdown = signal<boolean>(false);

  // === Event handlers
  
  /**
   * Handles input change events with debounced search
   * @param event - The input change event
   */
  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
    
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = null;
    }

    this.searchTimeout = setTimeout(() => {
      this.searchChange.emit(value);
    }, this.mergedConfig().debounceTime);

    if (!this.isOpen()) {
      this.openDropdown();
    }
  }

  /**
   * Handles input focus events and opens the dropdown
   */
  onInputFocus(): void {
    this.openDropdown();
  }

  /**
   * Handles input blur events with delayed dropdown closing
   * @description Delays closing to allow option selection
   */
  onInputBlur(): void {
    // Only close if not actively interacting with dropdown
    if (!this.isInteractingWithDropdown()) {
      // Delay closing to allow option selection
      setTimeout(() => {
        if (!this.isInteractingWithDropdown()) {
          this.closeDropdown();
        }
      }, 150);
    }
  }

  /**
   * Handles mouse down events on dropdown options
   * @param _event - The mouse down event
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onOptionMouseDown(_event: MouseEvent): void {
    // Set interaction flag for any mouse button
    this.isInteractingWithDropdown.set(true);
  }

  /**
   * Handles mouse up events on dropdown options
   * @param _event - The mouse up event
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onOptionMouseUp(_event: MouseEvent): void {
    // Clear interaction flag when mouse is released
    this.isInteractingWithDropdown.set(false);
  }

  /**
   * Handles mouse leave events on dropdown options
   * @param _event - The mouse leave event
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onOptionMouseLeave(_event: MouseEvent): void {
    // Clear interaction flag when mouse leaves the option
    this.isInteractingWithDropdown.set(false);
  }

  /**
   * Handles click events on dropdown options
   * @param option - The clicked option
   * @param event - The mouse click event
   */
  onOptionClick(option: AutocompleteOption, event: MouseEvent): void {
    // Only handle left mouse button clicks (button 0)
    if (event.button !== 0) {
      // Prevent right-click from closing dropdown or triggering selection
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    
    // Prevent the input blur event from firing for left clicks
    event.preventDefault();
    
    // Call the selection logic
    this.onOptionSelect(option);
  }

  /**
   * Handles option selection logic for both single and multiple modes
   * @param option - The option to select
   */
  onOptionSelect(option: AutocompleteOption): void {
    if (option.disabled) return;

    const config = this.mergedConfig();
    const current = this.selectedOptions();

    if (config.multiple) {
      const exists = current.find(opt => opt.value === option.value);
      if (exists) {
        // Remove if already selected
        const updated = current.filter(opt => opt.value !== option.value);
        this.selectedOptions.set(updated);
        this.emitChange(updated);
      } else if (this.canAddMore()) {
        // Add new selection
        const updated = [...current, option];
        this.selectedOptions.set(updated);
        this.emitChange(updated);
      }
      this.searchTerm.set('');
    } else {
      this.selectedOptions.set([option]);
      this.emitChange([option]);
      this.searchTerm.set('');
      this.closeDropdown();
    }

    this.highlightedIndex.set(-1);
  }

  /**
   * Removes a selected option (for multiple selection mode)
   * @param option - The option to remove
   * @param event - The remove event
   */
  onRemoveOption(option: AutocompleteOption, event: Event): void {
    event.stopPropagation();



    // Prevent default behavior for keyboard events
    if ((event as KeyboardEvent).key) {
      event.preventDefault();
    }
    
    const updated = this.selectedOptions().filter(opt => opt.value !== option.value);
    this.selectedOptions.set(updated);
    this.emitChange(updated);
    
    // Focus back to input after removal
    setTimeout(() => this.focusInput(), 0);
  }

  /**
   * Clears all selected options and closes the dropdown
   */
  onClear(event?: Event): void {
    // Prevent default behavior for keyboard events
    if (event && (event as KeyboardEvent).key) {
      event.preventDefault();
    }
    
    this.selectedOptions.set([]);
    this.searchTerm.set('');
    this.emitChange([]);
    this.closeDropdown();
  }

  /**
   * Handles keyboard navigation within the dropdown
   * @param event - The keyboard event
   * @description Supports Arrow keys for navigation, Enter for selection, Escape to close
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.showDropdown()) return;

    const filtered = this.filteredOptions();
    const currentIndex = this.highlightedIndex();

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const nextIndex = currentIndex < filtered.length - 1 ? currentIndex + 1 : 0;
        this.highlightedIndex.set(nextIndex);
        this.scrollHighlightedOptionIntoView(nextIndex);
        break;
      }

      case 'ArrowUp': {
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : filtered.length - 1;
        this.highlightedIndex.set(prevIndex);
        this.scrollHighlightedOptionIntoView(prevIndex);
        break;
      }

      case 'Enter': {
        event.preventDefault();
        if (currentIndex >= 0 && filtered[currentIndex]) {
          this.onOptionSelect(filtered[currentIndex]);
        }
        break;
      }

      case 'Escape': {
        event.preventDefault();
        this.closeDropdown();
        break;
      }
    }
  }

  /**
   * Handles clicks outside the component to close the dropdown
   * @param event - The document click event
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // Only handle left mouse button clicks for closing dropdown
    const mouseEvent = event as MouseEvent;
    // For click events, button property might not be reliable, use which property as fallback
    if (mouseEvent.button !== undefined && mouseEvent.button !== 0) {
      return;
    }
    if (mouseEvent.which !== undefined && mouseEvent.which !== 1) {
      return;
    }
    
    if (!this.el.nativeElement.contains(event.target as Node)) {
      this.closeDropdown();
    }
  }

  // === Helper methods
  
  /**
   * Opens the dropdown if not disabled
   * @private
   */
  private openDropdown(): void {
    if (this.disabled() || this.disabledState()) return;
    this.isOpen.set(true);
    this.dropdownToggle.emit(true);
  }

  /**
   * Closes the dropdown and resets highlight state
   * @private
   */
  closeDropdown(event?: Event): void {
    // Prevent default behavior for keyboard events
    if (event && (event as KeyboardEvent).key) {
      event.preventDefault();
    }
    
    this.isOpen.set(false);
    this.highlightedIndex.set(-1);
    this.dropdownToggle.emit(false);
    this.onTouched?.();
  }

  /**
   * Emits change events for form integration and component output
   * @param selected - Array of selected options
   * @private
   */
  private emitChange(selected: AutocompleteOption[]): void {
    const config = this.mergedConfig();
    const value = config.multiple 
      ? selected.map(opt => opt.value)
      : selected[0]?.value || null;

    this.onChange?.(value);
    this.selectionChange.emit({
      value,
      option: config.multiple ? selected : selected[0] || null
    });
  }

  /**
   * Checks if an option is currently selected
   * @param option - The option to check
   * @returns True if the option is selected
   */
  isOptionSelected(option: AutocompleteOption): boolean {
    return this.selectedOptions().some(selected => selected.value === option.value);
  }

  /**
   * Checks if an option is currently highlighted
   * @param index - The index to check
   * @returns True if the option at the given index is highlighted
   */
  isOptionHighlighted(index: number): boolean {
    return this.highlightedIndex() === index;
  }

  /**
   * Scrolls the highlighted option into view within the dropdown
   * @param _index - The index of the option to scroll into view
   * @private
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private scrollHighlightedOptionIntoView(_index: number): void {
    // Use setTimeout to ensure DOM has been updated with the new highlighted state
    setTimeout(() => {
      const dropdownElement = this.dropdownRef()?.nativeElement;
      if (!dropdownElement) return;

      const dropdown = dropdownElement;
      const highlightedOption = dropdown.querySelector('.dropdown-item.highlighted') as HTMLElement;
      
      if (highlightedOption) {
        // Calculate if the option is visible within the dropdown's scroll area
        const dropdownRect = dropdown.getBoundingClientRect();
        const optionRect = highlightedOption.getBoundingClientRect();
        
        // Check if option is above the visible area
        if (optionRect.top < dropdownRect.top) {
          highlightedOption.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest',
            inline: 'nearest'
          });
        }
        // Check if option is below the visible area
        else if (optionRect.bottom > dropdownRect.bottom) {
          highlightedOption.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest',
            inline: 'nearest'
          });
        }
      }
    }, 0);
  }

  /**
   * Gets CSS classes for the multi-input wrapper
   * @returns String of CSS classes
   */
  getMultiInputClasses(): string {
    const size = this.size();
    const variant = this.variant();
    const hasError = !!this.error();
    
    return [
      'multi-input',
      `multi-input--${size}`,
      `multi-input--${variant}`,
      hasError ? 'multi-input--error' : '',
      this.disabled() || this.disabledState() ? 'multi-input--disabled' : ''
    ].filter(Boolean).join(' ');
  }

  /**
   * Gets the placeholder text for multi-input
   * @returns Placeholder string
   */
  getMultiInputPlaceholder(): string {
    const config = this.mergedConfig();
    const hasSelections = this.selectedOptions().length > 0;
    
    if (hasSelections) {
      return 'Type to search...';
    }
    
    return config.placeholder || 'Search...';
  }

  /**
   * Get chip classes based on color configuration
   */
  getChipClasses(): string {
    const baseClasses = 'selected-chip';
    const colorClass = `chip-${this.chipColor()}`;
    return `${baseClasses} ${colorClass}`;
  }
  
  /**
   * Get chip styles for custom colors
   */
  getChipStyles(): {[key: string]: string} {
    const customColors = this.customChipColors();
    const styles: {[key: string]: string} = {};
    
    if (customColors.bg) {
      styles['--chip-bg'] = customColors.bg;
    }
    if (customColors.text) {
      styles['--chip-text'] = customColors.text;
    }
    if (customColors.border) {
      styles['--chip-border'] = customColors.border;
    }
    if (customColors.bgHover) {
      styles['--chip-bg-hover'] = customColors.bgHover;
    }
    
    return styles;
  }

  /**
   * Focuses the appropriate input field
   */
  focusInput(event?: Event): void {
    // Prevent default behavior for keyboard events
    if (event && (event as KeyboardEvent).key) {
      event.preventDefault();
    }
    
    const config = this.mergedConfig();
    
    if (config.multiple) {
      const multiInput = this.multiInputRef()?.nativeElement;
      if (multiInput) {
        multiInput.focus();
      }
    } else {
      const inputComponent = this.inputRef();
      if (inputComponent) {
        inputComponent.focus();
      }
    }
  }

  /**
   * Handles keydown events for multi-input (including backspace)
   * @param event - The keyboard event
   */
  onMultiInputKeyDown(event: KeyboardEvent): void {
    const config = this.mergedConfig();
    
    if (!config.multiple) return;
    
    const input = event.target as HTMLInputElement;
    const currentValue = input.value;
    const selectedOptions = this.selectedOptions();
    
    // Handle backspace when input is empty and there are selected options
    if (event.key === 'Backspace' && currentValue === '' && selectedOptions.length > 0) {
      event.preventDefault();
      
      // Remove the last selected option
      const lastOption = selectedOptions[selectedOptions.length - 1];
      this.onRemoveOption(lastOption, event);
      
      return;
    }
    
    // Handle other navigation keys
    if (this.showDropdown()) {
      this.onKeyDown(event);
    }
  }
  
  /**
   * Get visible chips for display
   * @returns Array of visible chip options
   */
  getVisibleChips(): AutocompleteOption[] {
    return this.visibleChips();
  }
  
  /**
   * Get count of overflow chips
   * @returns Number of hidden chips
   */
  getOverflowCount(): number {
    return this.overflowCount();
  }
  
  /**
   * Toggle between showing all chips and limited view
   */
  toggleShowAllChips(): void {
    this.showAllChips.set(!this.showAllChips());
  }
  
  /**
   * Setup drag scrolling functionality for chips container
   * @param container - The chips container element
   * @private
   */
  private setupDragScrolling(container: HTMLDivElement): void {
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      // Only handle left mouse button
      if (e.button !== 0) return;
      
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.style.cursor = 'grabbing';
      e.preventDefault();
    };

    const handleMouseLeave = () => {
      isDown = false;
      container.style.cursor = 'grab';
    };

    const handleMouseUp = () => {
      isDown = false;
      container.style.cursor = 'grab';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      container.scrollLeft = scrollLeft - walk;
    };

    // Add event listeners
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);
  }

}
