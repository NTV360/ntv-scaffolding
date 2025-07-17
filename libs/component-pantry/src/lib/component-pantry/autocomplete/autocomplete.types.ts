export interface AutocompleteOption {
  value: unknown;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface AutocompleteGroup {
  label: string;
  options: AutocompleteOption[];
}

export type AutocompleteData = AutocompleteOption[] | AutocompleteGroup[];

export interface AutocompleteConfig {
  placeholder?: string;
  searchable?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  maxSelections?: number;
  minSearchLength?: number;
  debounceTime?: number;
  noResultsText?: string;
  loadingText?: string;
  maxDisplayItems?: number;
}

export const DEFAULT_AUTOCOMPLETE_CONFIG: AutocompleteConfig = {
  placeholder: 'Search...',
  searchable: true,
  clearable: true,
  multiple: false,
  minSearchLength: 0,
  debounceTime: 300,
  noResultsText: 'No results found',
  loadingText: 'Loading...',
  maxDisplayItems: 10,
};

export type AutocompleteFilterFn = (option: AutocompleteOption, searchTerm: string) => boolean;

export interface AutocompleteChangeEvent {
  value: unknown;
  option: AutocompleteOption | AutocompleteOption[] | null;
}