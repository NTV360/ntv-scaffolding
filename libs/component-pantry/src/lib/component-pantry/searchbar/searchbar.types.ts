import { InputSize, InputVariant } from '../input/input.types';

export type SearchbarSize = InputSize;
export type SearchbarVariant = InputVariant;

export interface SearchbarConfig {
  placeholder?: string;
  minCharacters?: number;
  size?: SearchbarSize;
  variant?: SearchbarVariant;
  disabled?: boolean;
}

export const DEFAULT_SEARCHBAR_CONFIG: SearchbarConfig = {
  placeholder: 'Search...',
  minCharacters: 3,
  size: 'md',
  variant: 'default',
  disabled: false,
};

export interface SearchEvent {
  searchTerm: string;
  timestamp: Date;
}

export interface SearchValueChangeEvent {
  value: string;
  previousValue: string;
  timestamp: Date;
}