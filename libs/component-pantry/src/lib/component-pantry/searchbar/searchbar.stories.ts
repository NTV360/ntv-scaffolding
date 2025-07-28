import type { Meta, StoryObj } from '@storybook/angular';
import { Searchbar } from './searchbar';

const meta: Meta<Searchbar> = {
  title: 'Components/Searchbar',
  component: Searchbar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A searchbar component that combines an input field with a search button and minimum character validation.

## Features
- Built on top of the existing Input component
- Search button with minimum character validation
- Configurable minimum character requirement
- Search icon in the input field
- Responsive design (stacks on mobile)
- Keyboard support (Enter key to search)
- Disabled state management
- Event emissions for search and value changes
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for the search input',
    },
    minCharacters: {
      control: { type: 'number' },
      description:
        'Minimum number of characters required to enable search button',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of the search input',
    },
    buttonBgColor: {
      control: { type: 'color' },
      description: 'Background color of the search button',
    },
    borderRadius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Border radius of the searchbar components',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'danger'],
      description:
        'Visual variant of the searchbar (inherited from input component)',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the searchbar is disabled',
    },
    data: {
      control: { type: 'object' },
      description: 'Array of location data for search results',
    },
    selectedValue: { action: 'selectedValue' },
    searchValueChange: { action: 'searchValueChange' },
  },
  args: {
    placeholder: 'Search locations...',
    minCharacters: 3,
    size: 'md',
    buttonBgColor: 'red',
    borderRadius: 'md',
    variant: 'default',
    disabled: false,
    data: [
      {
        id: 1,
        name: 'London1',
        country: 'United States',
      },
      {
        id: 2,
        name: 'London',
        country: 'United Kingdom',
      },
      { id: 3, name: 'Tokyo', country: 'Japan' },
      {
        id: 4,
        name: 'London4',
        country: 'France',
      },
      {
        id: 5,
        name: 'London5',
        country: 'Australia',
      },
      {
        id: 6,
        name: 'Dubai',
        country: 'United Arab Emirates',
      },
      {
        id: 7,
        name: 'Singapore',
        country: 'Singapore',
      },
      {
        id: 8,
        name: 'Los Angeles',
        country: 'United States',
      },
      {
        id: 9,
        name: 'Barcelona',
        country: 'Spain',
      },
      {
        id: 10,
        name: 'Toronto',
        country: 'Canada',
      },
      {
        id: 11,
        name: 'Berlin',
        country: 'Germany',
      },
      {
        id: 12,
        name: 'Mumbai',
        country: 'India',
      },
      {
        id: 13,
        name: 'Rome',
        country: 'Italy',
      },
      {
        id: 14,
        name: 'Bangkok',
        country: 'Thailand',
      },
      {
        id: 15,
        name: 'Amsterdam',
        country: 'Netherlands',
      },
      {
        id: 16,
        name: 'Eiffel Tower',
        country: 'France',
      },
      {
        id: 17,
        name: 'Statue of Liberty',
        country: 'United States',
      },
      {
        id: 18,
        name: 'Great Wall of China',
        country: 'China',
      },
      {
        id: 19,
        name: 'Machu Picchu',
        country: 'Peru',
      },
      {
        id: 20,
        name: 'Taj Mahal',
        country: 'India',
      },
    ],
  },
};

export default meta;
type Story = StoryObj<Searchbar>;

// Default story
export const Default: Story = {
  args: {},
  render: (args) => ({
    props: {
      ...args,
      searchValueChange: (value: string) => {
        console.log('searchValueChange', value);
      },
      selectedValue: (value: any) => {
        console.log('selectedValue', value);
      },
    },
    template: `<ntv-searchbar 
      [placeholder]="placeholder"
      [minCharacters]="minCharacters"
      [size]="size"
      [buttonBgColor]="buttonBgColor"
      [borderRadius]="borderRadius"
      [disabled]="disabled"
      [data]="data"
      (selectedValue)="selectedValue($event)"
      (searchValueChange)="searchValueChange($event)">
    </ntv-searchbar>`,
  }),
};

// Different sizes showcase
export const Sizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 400px;">
        <div>
          <h3 style="margin-bottom: 0.5rem; font-weight: 600;">Extra Small</h3>
          <ntv-searchbar 
            size="xs"
            placeholder="Search (xs size)..."
            [minCharacters]="2"
            [borderRadius]="borderRadius"
            [data]="data">
          </ntv-searchbar>
        </div>
        
        <div>
          <h3 style="margin-bottom: 0.5rem; font-weight: 600;">Small</h3>
          <ntv-searchbar 
            size="sm"
            placeholder="Search (sm size)..."
            [minCharacters]="2"
            [borderRadius]="borderRadius"
            [data]="data">
          </ntv-searchbar>
        </div>
        
        <div>
          <h3 style="margin-bottom: 0.5rem; font-weight: 600;">Medium</h3>
          <ntv-searchbar 
            size="md"
            placeholder="Search (md size)..."
            [minCharacters]="3"
            [borderRadius]="borderRadius"
            [data]="data">
          </ntv-searchbar>
        </div>
        
        <div>
          <h3 style="margin-bottom: 0.5rem; font-weight: 600;">Large</h3>
          <ntv-searchbar 
            size="lg"
            placeholder="Search (lg size)..."
            [minCharacters]="3"
            [borderRadius]="borderRadius"
            [data]="data">
          </ntv-searchbar>
        </div>
      </div>
    `,
  }),
};

// Different variants showcase
export const Variants: Story = {
  render: (args) => ({
    props: args,
    template: `
       <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 400px;">
         <div>
           <h3 style="margin-bottom: 0.5rem; font-weight: 600;">Default</h3>
           <ntv-searchbar 
             variant="default"
             placeholder="Default variant"
             [minCharacters]="1"
             [borderRadius]="borderRadius"
             [data]="data">
           </ntv-searchbar>
         </div>
         
         <div>
           <h3 style="margin-bottom: 0.5rem; font-weight: 600;">Primary</h3>
           <ntv-searchbar 
             variant="primary"
             placeholder="Primary variant"
             [minCharacters]="1"
             [borderRadius]="borderRadius"
             [data]="data">
           </ntv-searchbar>
         </div>
         
         <div>
           <h3 style="margin-bottom: 0.5rem; font-weight: 600;">Success</h3>
           <ntv-searchbar 
             variant="success"
             placeholder="Success variant"
             [minCharacters]="1"
             [borderRadius]="borderRadius"
             [data]="data">
           </ntv-searchbar>
         </div>
         
         <div>
           <h3 style="margin-bottom: 0.5rem; font-weight: 600;">Danger</h3>
           <ntv-searchbar 
             variant="danger"
             placeholder="Danger variant"
             [minCharacters]="1"
             [borderRadius]="borderRadius"
             [data]="data">
           </ntv-searchbar>
         </div>
       </div>
     `,
  }),
};

// Different minimum character requirements
export const MinCharacterVariations: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 400px;">
        <div>
          <h3 style="margin-bottom: 0.5rem; font-weight: 600;">Min 1 Character</h3>
          <ntv-searchbar 
            placeholder="Search with min 1 char..."
            [minCharacters]="1"
            [borderRadius]="borderRadius"
            [data]="data">
          </ntv-searchbar>
        </div>
        
        <div>
          <h3 style="margin-bottom: 0.5rem; font-weight: 600;">Min 3 Characters (Default)</h3>
          <ntv-searchbar 
            placeholder="Search with min 3 chars..."
            [minCharacters]="3"
            [borderRadius]="borderRadius"
            [data]="data">
          </ntv-searchbar>
        </div>
        
        <div>
          <h3 style="margin-bottom: 0.5rem; font-weight: 600;">Min 5 Characters</h3>
          <ntv-searchbar 
            placeholder="Search with min 5 chars..."
            [minCharacters]="5"
            [borderRadius]="borderRadius"
            [data]="data">
          </ntv-searchbar>
        </div>
      </div>
    `,
  }),
};

// Disabled state
export const Disabled: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 400px;">
        <div>
          <h3 style="margin-bottom: 0.5rem; font-weight: 600;">Disabled Searchbar</h3>
          <ntv-searchbar 
            placeholder="This searchbar is disabled"
            [disabled]="true"
            [minCharacters]="2"
            [borderRadius]="borderRadius"
            [data]="data">
          </ntv-searchbar>
        </div>
        
        <div>
          <h3 style="margin-bottom: 0.5rem; font-weight: 600;">Enabled for Comparison</h3>
          <ntv-searchbar 
            placeholder="This searchbar is enabled"
            [disabled]="false"
            [minCharacters]="2"
            [borderRadius]="borderRadius"
            [data]="data">
          </ntv-searchbar>
        </div>
      </div>
    `,
  }),
};

// Interactive example with event handling and location search
export const Interactive: Story = {
  render: (args) => ({
    props: {
      ...args,
      currentValue: '',
      lastSearch: 'None',
      onSearch: function (value: string) {
        this['lastSearch'] = value;
        console.log('Search performed:', value);
      },
      onValueChange: function (value: string) {
        this['currentValue'] = value;
        console.log('Value changed:', value);
      },
    },
    template: `
      <div style="width: 400px;">
        <ntv-searchbar 
          placeholder="Search for cities, countries, or landmarks..."
          [minCharacters]="2"
          [borderRadius]="borderRadius"
          [data]="data"
          (search)="onSearch($event)"
          (searchValueChange)="onValueChange($event)">
        </ntv-searchbar>
        
        <div style="margin-top: 1rem; padding: 1rem; background-color: #f3f4f6; border-radius: 0.5rem;">
          <h4 style="margin: 0 0 0.5rem 0; font-weight: 600;">Search Events:</h4>
          <p style="margin: 0; font-size: 0.875rem;">Current value: {{ currentValue }}</p>
          <p style="margin: 0; font-size: 0.875rem;">Last search: {{ lastSearch }}</p>
          <div style="margin-top: 0.5rem; font-size: 0.75rem; color: #6b7280;">
            <p style="margin: 0;">💡 Try searching for: "New York", "Paris", "Tokyo", "Eiffel Tower", "Asia", etc.</p>
          </div>
        </div>
      </div>
    `,
  }),
};

// Location Search Demo
export const LocationSearch: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 500px;">
        <h3 style="margin-bottom: 1rem; font-weight: 600;">Location Search with Results on Button Click</h3>
        <ntv-searchbar 
          placeholder="Search for cities, landmarks, or countries..."
          [minCharacters]="2"
          size="lg"
          variant="primary"
          [borderRadius]="borderRadius"
          [data]="data">
        </ntv-searchbar>
        
        <div style="margin-top: 1.5rem; padding: 1rem; background-color: #f9fafb; border-radius: 0.5rem; border: 1px solid #e5e7eb;">
          <h4 style="margin: 0 0 0.75rem 0; font-weight: 600; color: #374151;">How to Use:</h4>
          <p style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #6b7280;">Type a search term and click the "Search" button to see results. Results will only appear after clicking the button, not while typing.</p>
          <h4 style="margin: 0 0 0.75rem 0; font-weight: 600; color: #374151;">Available Locations:</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.5rem; font-size: 0.875rem;">
            <div><strong>Cities:</strong> New York, London, Tokyo, Paris, Sydney, Dubai, Singapore, Los Angeles, Barcelona, Toronto, Berlin, Mumbai, Rome, Bangkok, Amsterdam</div>
            <div><strong>Landmarks:</strong> Eiffel Tower, Statue of Liberty, Great Wall of China, Machu Picchu, Taj Mahal</div>
            <div><strong>Regions:</strong> North America, Europe, Asia, Oceania, Middle East, South America</div>
          </div>
        </div>
      </div>
    `,
  }),
};

// Loading Search Demo
export const LoadingSearch: Story = {
  name: 'Loading Search',
  render: (args) => ({
    props: args,
    template: `
      <ntv-searchbar 
        [placeholder]="placeholder"
        [minCharacters]="minCharacters"
        [size]="size"
        [borderRadius]="borderRadius"
        [variant]="variant"
        [disabled]="disabled"
        [data]="data"
        (selectedValue)="selectedValue($event)"
        (searchValueChange)="searchValueChange($event)">
      </ntv-searchbar>
      <p class="mt-4 text-sm text-gray-600">
        This story demonstrates the built-in loading functionality. The loading spinner appears automatically when no search results are found, simulating real API behavior.
        <br><br>
        Try searching for:
        <br>• "New York" or "London" (immediate results)
        <br>• "xyz" or "nonexistent" (shows loading spinner for 1 second)
      </p>
    `,
  }),
  args: {
    placeholder: 'Search locations...',
    minCharacters: 2,
    size: 'lg',
    variant: 'primary',
    disabled: false,
  },
};
