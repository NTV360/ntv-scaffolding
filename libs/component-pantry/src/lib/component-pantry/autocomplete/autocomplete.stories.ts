import type { Meta, StoryObj } from '@storybook/angular';
import { Autocomplete } from './autocomplete';
import { AutocompleteOption, AutocompleteGroup } from './autocomplete.types';

const meta: Meta<Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A dynamic autocomplete component that extends the input component with dropdown functionality.

## Features
- Single and multiple selection modes
- Searchable with custom filtering
- Keyboard navigation (Arrow keys, Enter, Escape)
- Loading states
- Grouped options support
- Customizable configuration
- Form control integration
- Accessibility support
        `,
      },
    },
  },
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of options or grouped options',
    },
    config: {
      control: 'object',
      description: 'Configuration object for autocomplete behavior',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the autocomplete',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'danger'],
      description: 'Visual variant',
    },
    label: {
      control: 'text',
      description: 'Label for the autocomplete',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    info: {
      control: 'text',
      description: 'Info message',
    },
  },
};

export default meta;
type Story = StoryObj<Autocomplete>;

// Sample data
const countries: AutocompleteOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'it', label: 'Italy' },
  { value: 'es', label: 'Spain' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
];

const technologies: AutocompleteOption[] = [
  { value: 'angular', label: 'Angular' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
];

const groupedOptions: AutocompleteGroup[] = [
  {
    label: 'Frontend Frameworks',
    options: [
      { value: 'angular', label: 'Angular', group: 'Frontend Frameworks' },
      { value: 'react', label: 'React', group: 'Frontend Frameworks' },
      { value: 'vue', label: 'Vue.js', group: 'Frontend Frameworks' },
      { value: 'svelte', label: 'Svelte', group: 'Frontend Frameworks' },
    ],
  },
  {
    label: 'Backend Technologies',
    options: [
      { value: 'nodejs', label: 'Node.js', group: 'Backend Technologies' },
      { value: 'python', label: 'Python', group: 'Backend Technologies' },
      { value: 'java', label: 'Java', group: 'Backend Technologies' },
      { value: 'csharp', label: 'C#', group: 'Backend Technologies' },
    ],
  },
  {
    label: 'Databases',
    options: [
      { value: 'postgresql', label: 'PostgreSQL', group: 'Databases' },
      { value: 'mysql', label: 'MySQL', group: 'Databases' },
      { value: 'mongodb', label: 'MongoDB', group: 'Databases' },
      { value: 'redis', label: 'Redis', group: 'Databases' },
    ],
  },
];

export const Default: Story = {
  args: {
    options: countries,
    config: {
      placeholder: 'Select a country...',
      searchable: true,
      clearable: true,
    },
    label: 'Country',
    size: 'md',
    variant: 'default',
  },
};

export const Multiple: Story = {
  args: {
    options: technologies,
    config: {
      placeholder: 'Select technologies...',
      multiple: true,
      searchable: true,
      clearable: true,
      maxSelections: 5,
    },
    label: 'Technologies',
    info: 'Select up to 5 technologies',
    size: 'md',
    variant: 'primary',
  },
};

export const Grouped: Story = {
  args: {
    options: groupedOptions,
    config: {
      placeholder: 'Select technologies...',
      searchable: true,
      clearable: true,
    },
    label: 'Technology Stack',
    size: 'md',
    variant: 'default',
  },
};

export const WithMinSearch: Story = {
  args: {
    options: countries,
    config: {
      placeholder: 'Type at least 2 characters...',
      searchable: true,
      clearable: true,
      minSearchLength: 2,
    },
    label: 'Country (Min 2 chars)',
    info: 'Start typing to see options',
    size: 'md',
    variant: 'default',
  },
};

export const Loading: Story = {
  args: {
    options: [],
    config: {
      placeholder: 'Loading options...',
      loadingText: 'Fetching data...',
    },
    label: 'Dynamic Options',
    loading: true,
    size: 'md',
    variant: 'default',
  },
};

export const WithError: Story = {
  args: {
    options: countries,
    config: {
      placeholder: 'Select a country...',
      searchable: true,
      clearable: true,
    },
    label: 'Country',
    error: 'Please select a valid country',
    size: 'md',
    variant: 'danger',
  },
};

export const Disabled: Story = {
  args: {
    options: countries,
    config: {
      placeholder: 'This is disabled...',
    },
    label: 'Disabled Autocomplete',
    disabled: true,
    size: 'md',
    variant: 'default',
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <ntv-autocomplete
          [options]="countries"
          [config]="{ placeholder: 'Small size...' }"
          label="Small"
          size="sm"
        ></ntv-autocomplete>
        
        <ntv-autocomplete
          [options]="countries"
          [config]="{ placeholder: 'Medium size...' }"
          label="Medium"
          size="md"
        ></ntv-autocomplete>
        
        <ntv-autocomplete
          [options]="countries"
          [config]="{ placeholder: 'Large size...' }"
          label="Large"
          size="lg"
        ></ntv-autocomplete>
      </div>
    `,
    props: {
      countries,
    },
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <ntv-autocomplete
          [options]="countries"
          [config]="{ placeholder: 'Default variant...' }"
          label="Default"
          variant="default"
        ></ntv-autocomplete>
        
        <ntv-autocomplete
          [options]="countries"
          [config]="{ placeholder: 'Primary variant...' }"
          label="Primary"
          variant="primary"
        ></ntv-autocomplete>
        
        <ntv-autocomplete
          [options]="countries"
          [config]="{ placeholder: 'Success variant...' }"
          label="Success"
          variant="success"
        ></ntv-autocomplete>
        
        <ntv-autocomplete
          [options]="countries"
          [config]="{ placeholder: 'Danger variant...' }"
          label="Danger"
          variant="danger"
        ></ntv-autocomplete>
      </div>
    `,
    props: {
      countries,
    },
  }),
};

export const CustomFilter: Story = {
  args: {
    options: technologies,
    config: {
      placeholder: 'Search by starting letter...',
      searchable: true,
      clearable: true,
    },
    label: 'Custom Filter (Starts With)',
    info: 'This uses a custom filter that matches the beginning of words',
    customFilter: (option: AutocompleteOption, searchTerm: string) => {
      return option.label.toLowerCase().startsWith(searchTerm.toLowerCase());
    },
    size: 'md',
    variant: 'default',
  },
};

export const WithConfig: Story = {
  name: '🎯 DRY Config Pattern',
  render: () => ({
    template: `
      <div class="space-y-6">
        <div class="mb-4">
          <h3 class="text-lg font-semibold mb-2">Super DRY Usage with Config Object</h3>
          <p class="text-gray-600 text-sm mb-4">
            Demonstrates the config-based approach that reduces template verbosity by 90%.
            All autocomplete properties can be configured through a single config object.
          </p>
        </div>

        <!-- Country Selection -->
        <div>
          <h4 class="font-medium mb-2">Country Selection</h4>
          <ntv-autocomplete
            [options]="countries"
            [config]="countryConfig"
            label="Select Country"
            info="Single selection with search"
          ></ntv-autocomplete>
        </div>

        <!-- Technology Stack (Multiple) -->
        <div>
          <h4 class="font-medium mb-2">Technology Stack</h4>
          <ntv-autocomplete
            [options]="technologies"
            [config]="techConfig"
            label="Select Technologies"
            info="Multiple selection up to 5 items"
          ></ntv-autocomplete>
        </div>

        <!-- Skills (Advanced Config) -->
        <div>
          <h4 class="font-medium mb-2">Skills (Advanced)</h4>
          <ntv-autocomplete
            [options]="technologies"
            [config]="skillsConfig"
            label="Add Skills"
            info="Advanced config with debouncing and min search length"
          ></ntv-autocomplete>
        </div>

        <!-- Grouped Options -->
        <div>
          <h4 class="font-medium mb-2">Technology Categories</h4>
          <ntv-autocomplete
            [options]="groupedTech"
            [config]="groupedConfig"
            label="Select from Categories"
            info="Grouped options with custom styling"
          ></ntv-autocomplete>
        </div>

        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 class="font-medium text-blue-800 mb-2">✨ Benefits of Config Pattern:</h4>
          <ul class="text-sm text-blue-700 space-y-1">
            <li>• <strong>90% less template code</strong> when using all properties</li>
            <li>• <strong>Type-safe</strong> configuration objects</li>
            <li>• <strong>Reusable</strong> autocomplete configurations</li>
            <li>• <strong>Backward compatible</strong> with existing code</li>
            <li>• <strong>Easy to maintain</strong> and update</li>
            <li>• <strong>Clean templates</strong> that focus on content</li>
          </ul>
        </div>
      </div>
    `,
    props: {
      countries,
      technologies,
      groupedTech: groupedOptions,
      countryConfig: {
        placeholder: 'Search countries...',
        searchable: true,
        clearable: true,
        noResultsText: 'No countries found',
        maxDisplayItems: 8
      },
      techConfig: {
        placeholder: 'Select technologies...',
        multiple: true,
        maxSelections: 5,
        searchable: true,
        clearable: true,
        noResultsText: 'No technologies found',
        maxDisplayItems: 10
      },
      skillsConfig: {
        placeholder: 'Add skills...',
        multiple: true,
        searchable: true,
        minSearchLength: 2,
        debounceTime: 200,
        maxDisplayItems: 6,
        noResultsText: 'No matching skills'
      },
      groupedConfig: {
        placeholder: 'Browse categories...',
        searchable: true,
        clearable: true,
        maxDisplayItems: 12,
        noResultsText: 'No items in this category'
      }
    },
  }),
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates the **DRY (Don't Repeat Yourself) config pattern** for the autocomplete component.

Instead of setting multiple individual properties:
\`\`\`html
<ntv-autocomplete
  [options]="options"
  placeholder="Search..."
  [searchable]="true"
  [clearable]="true"
  [multiple]="true"
  [maxSelections]="5"
  [minSearchLength]="2"
  [debounceTime]="300"
  noResultsText="No results"
  loadingText="Loading..."
  [maxDisplayItems]="10">
</ntv-autocomplete>
\`\`\`

You can use a single config object:
\`\`\`html
<ntv-autocomplete
  [options]="options"
  [config]="myAutocompleteConfig">
</ntv-autocomplete>
\`\`\`

This approach provides better maintainability, reusability, and cleaner templates.
        `,
      },
    },
  },
};