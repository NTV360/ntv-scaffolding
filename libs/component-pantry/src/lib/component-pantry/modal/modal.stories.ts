import type { Meta, StoryObj } from '@storybook/angular';
import { ModalComponent } from './modal';
import {
  DEFAULT_ALERT_ERROR_CONFIG,
  DEFAULT_ALERT_SUCCESS_CONFIG,
  DEFAULT_MODAL_CONFIG,
  ModalAlertConfig,
  ModalFormConfig,
} from './modal.types';

const meta: Meta<ModalComponent> = {
  title: 'Components/Modal',
  component: ModalComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A highly configurable modal component with content projection support.

## Features
- **Content Projection** - Maximum flexibility for any content (forms, confirmations, custom content)
- **Multiple Variants** - Default, form, confirmation, alert, info
- **Flexible Sizing** - Small (sm), medium (md), large (lg), extra-large (xl), full
- **Customizable Backdrop** - Blur, dark, none
- **Accessibility** - Full ARIA support, keyboard navigation, focus management
- **Animation Support** - Configurable transitions and animations
- **Form Integration** - Built-in submit/cancel handling
- **Confirmation Dialogs** - Destructive actions with warning variants
- **Alert Modals** - Auto-close functionality with different alert types
- **DRY Configuration** - Config object pattern reduces template verbosity
- **Backward Compatibility** - Individual properties still supported

## Quick Start

Use the Controls panel below to:
1. Configure modal properties in real-time
2. Preview your changes instantly
3. Copy the generated code using "Show code"

## Configuration Methods

### 1. Individual Properties
\`\`\`html
<ntv-modal 
  [isVisible]="showModal" 
  variant="default"
  size="medium"
  [closable]="true"
  [closeOnBackdrop]="true"
  [preventClose]="false"
  (modalClose)="toggleModal()"
>
  <!-- Content here -->
</ntv-modal>
\`\`\`

### 2. Config Object (Recommended)
\`\`\`typescript
const modalConfig = {
  variant: 'default',
  size: 'medium',
  closable: true,
  closeOnBackdrop: true,
  preventClose: false
};
\`\`\`

\`\`\`html
<ntv-modal 
  [config]="modalConfig"
  [isVisible]="showModal"
  (modalClose)="toggleModal()"
>
  <!-- Content here -->
</ntv-modal>
\`\`\`

## Common Use Cases

### 1. Basic Modal
- Set \`variant\` to "default"
- Set \`size\` to "medium"
- Enable \`showHeader\` and set \`headerTitle\`
- Keep default closing behavior

### 2. Form Modal
- Set \`variant\` to "form"
- Set \`size\` to "large"
- Enable \`showHeader\` and \`showFooter\`
- Set \`scrollable\` to true for long forms

### 3. Confirmation Modal
- Set \`variant\` to "confirmation"
- Set \`size\` to "small"
- Set \`closable\` and \`closeOnBackdrop\` to false
- Set \`preventClose\` to true

### 4. Alert Modal
- Set \`variant\` to "alert"
- Set \`size\` to "small"
- Disable \`showHeader\` and \`showFooter\`
- Set \`closable\` to false

## Customization Guide

### 1. Size & Position
- **Size**: Choose from predefined sizes or use custom dimensions
- **Position**: Control vertical alignment with \`position\` and \`centered\`
- **Fullscreen**: Toggle \`fullscreen\` for full viewport coverage

### 2. Closing Behavior
- **Close Button**: Toggle with \`closable\`
- **Backdrop Click**: Control with \`closeOnBackdrop\`
- **Escape Key**: Control with \`closeOnEscape\`
- **Prevent All**: Use \`preventClose\` as master switch

### 3. Visual Style
- **Backdrop**: Choose from blur, dark, or none
- **Animation**: Toggle entrance/exit animations
- **Custom Classes**: Add your own styles via \`customClass\`

### 4. Content Structure
- **Header**: Control with \`showHeader\`, \`headerTitle\`, \`headerSubtitle\`
- **Footer**: Toggle with \`showFooter\`
- **Scrolling**: Enable with \`scrollable\` for tall content

## Best Practices

1. **Choose the Right Variant**
   - Use "default" for basic content display
   - Use "form" for data collection
   - Use "confirmation" for destructive actions
   - Use "alert" for notifications, errors and success

2. **Handle Closing Properly**
   - Always handle the \`modalClose\` event
   - Use \`preventClose\` for critical actions
   - Consider backdrop click behavior

3. **Accessibility**
   - Provide clear header titles
   - Use descriptive button labels
   - Maintain keyboard navigation

4. **Responsive Design**
   - Choose appropriate sizes
   - Enable scrolling for tall content
   - Consider mobile viewports

## Try It Out

Use the Controls panel below to experiment with different configurations. The preview will update in real-time, and you can copy the code for your configuration using the "Show code" button.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: [
        'small',
        'medium',
        'large',
        'xlarge',
        'confirmation',
        'success',
        'error',
      ],
      description:
        'Controls the size of the modal. Choose from predefined sizes or use custom dimensions.',
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: 'string' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'form', 'confirmation', 'alert', 'info'],
      description:
        'Sets the modal variant which determines its appearance and behavior.',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'string' },
      },
    },
    position: {
      control: { type: 'select' },
      options: ['center', 'top', 'bottom'],
      description: 'Controls the vertical position of the modal on the screen.',
      table: {
        defaultValue: { summary: 'center' },
        type: { summary: 'string' },
      },
    },
    backdrop: {
      control: { type: 'select' },
      options: ['blur', 'dark', 'none'],
      description:
        'Sets the backdrop style. "blur" adds a frosted glass effect, "dark" dims the background, "none" removes the backdrop.',
      table: {
        defaultValue: { summary: 'blur' },
        type: { summary: 'string' },
      },
    },
    closable: {
      control: { type: 'boolean' },
      description: 'When true, shows a close button in the modal header.',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    closeOnBackdrop: {
      control: { type: 'boolean' },
      description:
        'When true, clicking the backdrop will close the modal. Set to false for confirmation dialogs.',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    closeOnEscape: {
      control: { type: 'boolean' },
      description: 'When true, pressing the Escape key will close the modal.',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    preventClose: {
      control: { type: 'boolean' },
      description:
        'When true, prevents ALL closing actions (backdrop, escape, close button). Use for critical confirmations.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    fullscreen: {
      control: { type: 'boolean' },
      description: 'Makes the modal take up the full screen.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    scrollable: {
      control: { type: 'boolean' },
      description:
        'Enables scrolling for modal content that exceeds the viewport height.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    centered: {
      control: { type: 'boolean' },
      description: 'Centers the modal vertically in the viewport.',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    showHeader: {
      control: { type: 'boolean' },
      description:
        'Shows/hides the modal header section which contains the title and close button.',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    showFooter: {
      control: { type: 'boolean' },
      description: 'Shows/hides the modal footer section for action buttons.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    headerTitle: {
      control: { type: 'text' },
      description: 'Sets the title text in the modal header.',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    headerSubtitle: {
      control: { type: 'text' },
      description: 'Sets the subtitle text in the modal header.',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    customClass: {
      control: { type: 'text' },
      description:
        'Additional CSS classes to apply to the modal for custom styling.',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    animation: {
      control: { type: 'boolean' },
      description: 'Enables/disables modal open/close animations.',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    isVisible: {
      control: { type: 'boolean' },
      description: 'Controls the visibility of the modal.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    size: 'medium',
    variant: 'default',
    position: 'center',
    backdrop: 'blur',
    closable: true, // Show close button by default
    closeOnBackdrop: true, // Allow closing on backdrop click by default
    closeOnEscape: true, // Allow closing on Escape key by default
    preventClose: false, // Don't prevent closing by default
    fullscreen: false,
    scrollable: false,
    centered: true,
    showHeader: true,
    showFooter: false,
    headerTitle: 'Modal Title',
    headerSubtitle: 'Modal subtitle goes here',
    customClass: '',
    animation: true,
    isVisible: true,
  },
};

export default meta;
type Story = StoryObj<ModalComponent>;

// Default Modal Trigger
export const Default: Story = {
  args: {
    isVisible: false,
    closable: true,
  },
  render: (args) => {
    const component = {
      ...args,
      showModal: false,
      toggleModal() {
        this.showModal = !this.showModal;
      },
    };
    return {
      props: component,
      template: `

      <!-- This is the Default Modal Trigger -->
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%); padding: 2rem;">
        <div style="background: white; border-radius: 16px; box-shadow: 0 4px 32px 0 rgba(80, 90, 120, 0.10); padding: 2rem; min-width: 520px; max-width: 98vw;">
          <h3 (click)="toggleModal()" style="
            position: relative;
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
            padding: 1.25rem;
            background: linear-gradient(135deg, #e0f2fe 0%, #bfdbfe 100%);
            border: none;
            border-radius: 16px;
            font-weight: 600;
            font-size: 1.25rem;
            color: #1e40af;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          " onMouseOver="
            this.style.transform='scale(1.02)';
            this.style.boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            this.querySelector('.alert-icon').style.transform='scale(1.1) rotate(10deg)';
            this.querySelector('.alert-text').style.letterSpacing='0.5px';
            this.querySelector('.alert-arrow').style.transform='translateX(5px)';
            this.querySelector('.alert-arrow').style.opacity='1';
          " onMouseOut="
            this.style.transform='scale(1)';
            this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            this.querySelector('.alert-icon').style.transform='scale(1) rotate(0deg)';
            this.querySelector('.alert-text').style.letterSpacing='normal';
            this.querySelector('.alert-arrow').style.transform='translateX(0)';
            this.querySelector('.alert-arrow').style.opacity='0.7';
          ">
            <!-- Icon container -->
            <div class="alert-icon" style="
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 2rem;
              height: 2rem;
              background: #3b82f6;
              border-radius: 50%;
              transition: transform 0.3s ease;
            ">
              <span style="font-size: 1.25rem;">🎯</span>
            </div>

            <!-- Text content -->
            <div style="flex: 1;">
              <span class="alert-text" style="
                display: block;
                transition: all 0.3s ease;
                font-weight: 600;
              ">Show Default Modal</span>
              <span style="
                display: block;
                font-size: 0.875rem;
                color: #1e40af;
                opacity: 0.8;
                font-weight: normal;
              ">Click to view example</span>
            </div>

            <!-- Arrow indicator -->
            <div class="alert-arrow" style="
              display: flex;
              align-items: center;
              padding-left: 1rem;
              font-size: 1.5rem;
              color: #3b82f6;
              opacity: 0.7;
              transition: all 0.3s ease;
            ">
              <span style="transform: rotate(-45deg);">⟶</span>
            </div>
          </h3>
          <!-- End of Default Modal Trigger -->

          <ntv-modal
            [size]="size"
            [variant]="variant"
            [position]="position"
            [backdrop]="backdrop"
            [closable]="closable"
            [closeOnBackdrop]="closeOnBackdrop"
            [closeOnEscape]="closeOnEscape"
            [fullscreen]="fullscreen"
            [scrollable]="scrollable"
            [centered]="centered"
            [showHeader]="showHeader"
            [showFooter]="showFooter"
            [headerTitle]="headerTitle"
            [headerSubtitle]="headerSubtitle"
            [customClass]="customClass"
            [animation]="animation"
            [preventClose]="preventClose"
            [isVisible]="showModal"
            (modalClose)="toggleModal()">
            <div style="padding: 1rem; max-width: 100%;">
              <h3>Modal Content</h3>
              <p>This is the main content area of the modal. You can put any content here including forms, text, images, or other components.</p>
              <p>The modal supports content projection, so you have complete flexibility over what goes inside.</p>
            </div>
          </ntv-modal>
        </div>
      </div>
    `,
    };
  },
};

// Form Modal Trigger
export const FormVariants: Story = {
  args: {
    config: {
      ...DEFAULT_MODAL_CONFIG,
      variant: 'form',
      size: 'medium',
      showHeader: true,
      headerTitle: 'Contact Information',
      headerSubtitle: 'Please fill in the form below',
    } as ModalFormConfig,
    variant: 'form',
    size: 'medium',
    showHeader: true,
    headerTitle: 'Contact Information',
    headerSubtitle: 'Please fill in the form below',
    showFooter: true,
    isVisible: false,
  },
  render: (args) => {
    const component = {
      ...args,
      showModal: false,
      toggleModal() {
        this.showModal = !this.showModal;
      },
    };
    return {
      props: component,
      template: `

     <!-- This is the Form Modal Trigger -->
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 70vh; background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%); padding: 2rem;">
        <div style="background: white; border-radius: 16px; box-shadow: 0 4px 32px 0 rgba(80, 90, 120, 0.10); padding: 2rem; min-width: 520px; max-width: 98vw;">
          <h3 (click)="toggleModal()" style="
            position: relative;
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
            padding: 1.25rem;
            background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
            border: none;
            border-radius: 16px;
            font-weight: 600;
            font-size: 1.25rem;
            color: #6b21a8;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          " onMouseOver="
            this.style.transform='scale(1.02)';
            this.style.boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            this.querySelector('.alert-icon').style.transform='scale(1.1) rotate(10deg)';
            this.querySelector('.alert-text').style.letterSpacing='0.5px';
            this.querySelector('.alert-arrow').style.transform='translateX(5px)';
            this.querySelector('.alert-arrow').style.opacity='1';
          " onMouseOut="
            this.style.transform='scale(1)';
            this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            this.querySelector('.alert-icon').style.transform='scale(1) rotate(0deg)';
            this.querySelector('.alert-text').style.letterSpacing='normal';
            this.querySelector('.alert-arrow').style.transform='translateX(0)';
            this.querySelector('.alert-arrow').style.opacity='0.7';
          ">
            <!-- Icon container -->
            <div class="alert-icon" style="
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 2rem;
              height: 2rem;
              background: #a855f7;
              border-radius: 50%;
              transition: transform 0.3s ease;
            ">
              <span style="font-size: 1.25rem;">📝</span>
            </div>

            <!-- Text content -->
            <div style="flex: 1;">
              <span class="alert-text" style="
                display: block;
                transition: all 0.3s ease;
                font-weight: 600;
              ">Show Form Modal</span>
              <span style="
                display: block;
                font-size: 0.875rem;
                color: #6b21a8;
                opacity: 0.8;
                font-weight: normal;
              ">Click to view example</span>
            </div>

            <!-- Arrow indicator -->
            <div class="alert-arrow" style="
              display: flex;
              align-items: center;
              padding-left: 1rem;
              font-size: 1.5rem;
              color: #a855f7;
              opacity: 0.7;
              transition: all 0.3s ease;
            ">
              <span style="transform: rotate(-45deg);">⟶</span>
            </div>
          </h3>
          <!-- End of Form Modal Trigger -->

          <ntv-modal
            [variant]="variant"
            [size]="size"
            [showHeader]="showHeader"
            [headerTitle]="headerTitle"
            [headerSubtitle]="headerSubtitle"
            [showFooter]="showFooter"
            [isVisible]="showModal"
            (modalClose)="toggleModal()"
          >
            <!-- Form content -->
            <form style="display: flex; flex-direction: column; gap: 1.5rem;">
              <!-- Personal Information Section -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 0.5em;">
                  <label for="firstName" style="font-weight: 500; color: #334155;">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    placeholder="Enter first name"
                    style="width: 100%; padding: 0.75em; border: 1px solid #e2e8f0; border-radius: 8px; transition: all 0.2s;"
                    onFocus="this.style.borderColor='#059669'; this.style.boxShadow='0 0 0 2px rgba(5, 150, 105, 0.1)'"
                    onBlur="this.style.borderColor='#e2e8f0'; this.style.boxShadow='none'"
                  >
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.5em;">
                  <label for="lastName" style="font-weight: 500; color: #334155;">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    placeholder="Enter last name"
                    style="width: 100%; padding: 0.75em; border: 1px solid #e2e8f0; border-radius: 8px; transition: all 0.2s;"
                    onFocus="this.style.borderColor='#059669'; this.style.boxShadow='0 0 0 2px rgba(5, 150, 105, 0.1)'"
                    onBlur="this.style.borderColor='#e2e8f0'; this.style.boxShadow='none'"
                  >
                </div>
              </div>

              <!-- Contact Information Section -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 0.5em;">
                  <label for="email" style="font-weight: 500; color: #334155;">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Enter email"
                    style="width: 100%; padding: 0.75em; border: 1px solid #e2e8f0; border-radius: 8px; transition: all 0.2s;"
                    onFocus="this.style.borderColor='#059669'; this.style.boxShadow='0 0 0 2px rgba(5, 150, 105, 0.1)'"
                    onBlur="this.style.borderColor='#e2e8f0'; this.style.boxShadow='none'"
                  >
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.5em;">
                  <label for="phone" style="font-weight: 500; color: #334155;">Phone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    placeholder="Enter phone number"
                    style="width: 100%; padding: 0.75em; border: 1px solid #e2e8f0; border-radius: 8px; transition: all 0.2s;"
                    onFocus="this.style.borderColor='#059669'; this.style.boxShadow='0 0 0 2px rgba(5, 150, 105, 0.1)'"
                    onBlur="this.style.borderColor='#e2e8f0'; this.style.boxShadow='none'"
                  >
                </div>
              </div>

              <!-- Message Section -->
              <div style="display: flex; flex-direction: column; gap: 0.5em;">
                <label for="message" style="font-weight: 500; color: #334155;">Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  placeholder="Type your message here..."
                  style="width: 100%; padding: 0.75em; border: 1px solid #e2e8f0; border-radius: 8px; resize: vertical; transition: all 0.2s;"
                  onFocus="this.style.borderColor='#059669'; this.style.boxShadow='0 0 0 2px rgba(5, 150, 105, 0.1)'"
                  onBlur="this.style.borderColor='#e2e8f0'; this.style.boxShadow='none'"
                ></textarea>
              </div>
            </form>

            <!-- Use modal-footer slot for buttons -->
            <div modal-footer>
              <button 
                type="button"
                (click)="toggleModal()"
                style="padding: 0.75em 1.5em; background: #f1f5f9; color: #475569; border: none; border-radius: 8px; font-weight: 500; margin-right: 1rem;"
                onMouseOver="this.style.background='#e2e8f0'"
                onMouseOut="this.style.background='#f1f5f9'"
              >
                Cancel
              </button>
              <button 
                type="submit"
                style="padding: 0.75em 1.5em; background: #059669; color: white; border: none; border-radius: 8px; font-weight: 500;"
                onMouseOver="this.style.background='#047857'"
                onMouseOut="this.style.background='#059669'"
              >
                Submit
              </button>
            </div>
          </ntv-modal>
        </div>
      </div>
    `,
    };
  },
};

export const DoubleColumnFormVariants: Story = {
  args: {
    variant: 'form',
    size: 'large',
    showHeader: true,
    showFooter: true,
    headerTitle: 'User Information',
    headerSubtitle: 'Please fill in all required fields',
    isVisible: false,
  },
  render: (args) => {
    const component = {
      ...args,
      showModal: false,
      toggleModal() {
        this.showModal = !this.showModal;
      },
    };
    return {
      props: component,
      template: `

      <!-- This is the Double Column Form Modal Trigger -->
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 80vh; background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%); padding: 2rem;">
        <div style="background: white; border-radius: 16px; box-shadow: 0 4px 32px 0 rgba(80, 90, 120, 0.10); padding: 2rem; min-width: 520px; max-width: 98vw;">
          <h3 (click)="toggleModal()" style="
            position: relative;
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
            padding: 1.25rem;
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border: none;
            border-radius: 16px;
            font-weight: 600;
            font-size: 1.25rem;
            color: #166534;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          " onMouseOver="
            this.style.transform='scale(1.02)';
            this.style.boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            this.querySelector('.alert-icon').style.transform='scale(1.1) rotate(10deg)';
            this.querySelector('.alert-text').style.letterSpacing='0.5px';
            this.querySelector('.alert-arrow').style.transform='translateX(5px)';
            this.querySelector('.alert-arrow').style.opacity='1';
          " onMouseOut="
            this.style.transform='scale(1)';
            this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            this.querySelector('.alert-icon').style.transform='scale(1) rotate(0deg)';
            this.querySelector('.alert-text').style.letterSpacing='normal';
            this.querySelector('.alert-arrow').style.transform='translateX(0)';
            this.querySelector('.alert-arrow').style.opacity='0.7';
          ">
            <!-- Icon container -->
            <div class="alert-icon" style="
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 2rem;
              height: 2rem;
              background: #22c55e;
              border-radius: 50%;
              transition: transform 0.3s ease;
            ">
              <span style="font-size: 1.25rem;">📋</span>
            </div>

            <!-- Text content -->
            <div style="flex: 1;">
              <span class="alert-text" style="
                display: block;
                transition: all 0.3s ease;
                font-weight: 600;
              ">Show Double Column Form</span>
              <span style="
                display: block;
                font-size: 0.875rem;
                color: #166534;
                opacity: 0.8;
                font-weight: normal;
              ">Click to view example</span>
            </div>

            <!-- Arrow indicator -->
            <div class="alert-arrow" style="
              display: flex;
              align-items: center;
              padding-left: 1rem;
              font-size: 1.5rem;
              color: #22c55e;
              opacity: 0.7;
              transition: all 0.3s ease;
            ">
              <span style="transform: rotate(-45deg);">⟶</span>
            </div>
          </h3>
          <!-- End of Form Modal Trigger -->

          <ntv-modal
            [variant]="variant"
            [size]="size"
            [showHeader]="showHeader"
            [showFooter]="showFooter"
            [headerTitle]="headerTitle"
            [headerSubtitle]="headerSubtitle"
            [isVisible]="showModal"
            (modalClose)="toggleModal()"
          >
            <form style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; padding: 1.5rem 0;">
              <div style='display: flex; flex-direction: column;'>
                <label for="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" required placeholder="First Name" style="padding: 0.5em; border: 1px solid #cbd5e1; border-radius: 6px;">
              </div>
              <div style='display: flex; flex-direction: column;'>
                <label for="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" required placeholder="Last Name" style="padding: 0.5em; border: 1px solid #cbd5e1; border-radius: 6px;">
              </div>
              <div style='display: flex; flex-direction: column;'>
                <label for="email">Email</label>
                <input id="email" name="email" type="email" required placeholder="Email" style="padding: 0.5em; border: 1px solid #cbd5e1; border-radius: 6px;">
              </div>
              <div style='display: flex; flex-direction: column;'>
                <label for="phone">Phone</label>
                <input id="phone" name="phone" type="tel" placeholder="Phone" style="padding: 0.5em; border: 1px solid #cbd5e1; border-radius: 6px;">
              </div>
              <div style='display: flex; flex-direction: column;'>
                <label for="address">Address</label>
                <input id="address" name="address" type="text" required placeholder="Address" style="padding: 0.5em; border: 1px solid #cbd5e1; border-radius: 6px;">
              </div>
              <div style='display: flex; flex-direction: column;'>
                <label for="city">City</label>
                <input id="city" name="city" type="text" required placeholder="City" style="padding: 0.5em; border: 1px solid #cbd5e1; border-radius: 6px;">
              </div>
              <div style='display: flex; flex-direction: column;'>
                <label for="state">State</label>
                <input id="state" name="state" type="text" placeholder="State" style="padding: 0.5em; border: 1px solid #cbd5e1; border-radius: 6px;">
              </div>
              <div style='display: flex; flex-direction: column;'>
                <label for="zip">ZIP</label>
                <input id="zip" name="zip" type="text" placeholder="ZIP" style="padding: 0.5em; border: 1px solid #cbd5e1; border-radius: 6px;">
              </div>
              <div style="grid-column: 1 / -1; display: flex; flex-direction: column;">
                <label for="password">Password</label>
                <input id="password" name="password" type="password" required placeholder="Password" style="padding: 0.5em; border: 1px solid #cbd5e1; border-radius: 6px;">
              </div>
            </form>
            <div modal-footer style="display: flex; justify-content: flex-end; gap: 1rem;">
              <button type="button" (click)="toggleModal()" style="padding: 0.5em 1.5em; background: #e5e7eb; color: #334155; border: none; border-radius: 6px; font-weight: 500;">Cancel</button>
              <button type="submit" style="padding: 0.5em 1.5em; background: #22c55e; color: #fff; border: none; border-radius: 6px; font-weight: 500;">Save</button>
            </div>
          </ntv-modal>
        </div>
      </div>
    `,
    };
  },
};

// Confirmation Modal Trigger
export const Confirmation: Story = {
  args: {
    variant: 'confirmation',
    size: 'confirmation',
    showHeader: false,
    closable: false,
    closeOnBackdrop: false,
    preventClose: true,
    isVisible: false,
  },
  render: (args) => {
    const component = {
      ...args,
      showModal: false,
      toggleModal() {
        this.showModal = !this.showModal;
      },
      confirmAction() {
        console.log('Confirmed!');
        this.showModal = false;
      },
    };
    return {
      props: component,
      template: `

      <!-- Form Modal Trigger -->
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 70vh; background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%); padding: 2rem;">
        <div style="background: white; border-radius: 16px; box-shadow: 0 4px 32px 0 rgba(80, 90, 120, 0.10); padding: 2rem; min-width: 520px; max-width: 98vw;">
          <h3 (click)="toggleModal()" style="
            position: relative;
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
            padding: 1.25rem;
            background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
            border: none;
            border-radius: 16px;
            font-weight: 600;
            font-size: 1.25rem;
            color: #9a3412;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          " onMouseOver="
            this.style.transform='scale(1.02)';
            this.style.boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            this.querySelector('.alert-icon').style.transform='scale(1.1) rotate(10deg)';
            this.querySelector('.alert-text').style.letterSpacing='0.5px';
            this.querySelector('.alert-arrow').style.transform='translateX(5px)';
            this.querySelector('.alert-arrow').style.opacity='1';
          " onMouseOut="
            this.style.transform='scale(1)';
            this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            this.querySelector('.alert-icon').style.transform='scale(1) rotate(0deg)';
            this.querySelector('.alert-text').style.letterSpacing='normal';
            this.querySelector('.alert-arrow').style.transform='translateX(0)';
            this.querySelector('.alert-arrow').style.opacity='0.7';
          ">
            <!-- Icon container -->
            <div class="alert-icon" style="
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 2rem;
              height: 2rem;
              background: #fb923c;
              border-radius: 50%;
              transition: transform 0.3s ease;
            ">
              <span style="font-size: 1.25rem;">⚡</span>
            </div>

            <!-- Text content -->
            <div style="flex: 1;">
              <span class="alert-text" style="
                display: block;
                transition: all 0.3s ease;
                font-weight: 600;
              ">Show Confirmation Modal</span>
              <span style="
                display: block;
                font-size: 0.875rem;
                color: #9a3412;
                opacity: 0.8;
                font-weight: normal;
              ">Click to view example</span>
            </div>

            <!-- Arrow indicator -->
            <div class="alert-arrow" style="
              display: flex;
              align-items: center;
              padding-left: 1rem;
              font-size: 1.5rem;
              color: #fb923c;
              opacity: 0.7;
              transition: all 0.3s ease;
            ">
              <span style="transform: rotate(-45deg);">⟶</span>
            </div>
          </h3>
          <!-- End of Form Modal Trigger -->

          <ntv-modal 
            [variant]="variant" 
            [size]="size" 
            [isVisible]="showModal" 
            [showHeader]="showHeader" 
            [closable]="closable"
            [closeOnBackdrop]="closeOnBackdrop"
            [preventClose]="preventClose"
            (modalClose)="toggleModal()"
          >
            <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%; padding: 1.5em; text-align: center;">
              <!-- Content Top -->
              <div>
                <div style="background: #e9f9f1; display: inline-flex; align-items: center; justify-content: center; width: 100px; height: 100px; border-radius: 50%; margin-bottom: 1em;">
                  <span style="font-size: 80px;">✔️</span>
                </div>
                <h2 style="padding-top: 1em; font-weight: 400; font-size: 1.5rem; color: #0f172a;">Confirm</h2>
                <p style="color: #475569; font-size: 14px; margin-bottom: 2em; line-height: 1.5;">
                  Thank you for providing your information. Please take a moment to review and confirm that all the details entered are complete and accurate. By proceeding, you acknowledge that the information submitted reflects your intent and may be used for further processing. If everything looks correct, click 'Confirm' to continue. Otherwise, you may go back to make any necessary changes.
                </p>
              </div>

              <div style="display: flex; justify-content: center; gap: 1em;">
                <button (click)="toggleModal()" style="padding: 0.5em 2em; background: #e5e7eb; color: #334155; border: none; border-radius: 6px; font-weight: 500;">Back</button>
                <button (click)="confirmAction()" style="padding: 0.5em 2em; background: #8dcb2c; color: #166534; border: none; border-radius: 6px; font-weight: 500;">Confirm</button>
              </div>
            </div>
          </ntv-modal>
        </div>
      </div>
    `,
    };
  },
};

export const AlertErrorVariant: Story = {
  args: {
    config: {
      ...DEFAULT_ALERT_ERROR_CONFIG,
      message: 'Failed to save changes. Please try again.',
      alertType: 'error',
    } as ModalAlertConfig,
    isVisible: false,
  },
  render: (args) => {
    const component = {
      ...args,
      showModal: false,
      toggleModal() {
        this.showModal = !this.showModal;
      },
    };
    return {
      props: component,
      template: `

      <!-- This is just the trigger for the modal -->
      <div style="display: flex; flex-direction: column; gap: 3em; align-items: center; justify-content: center; min-height: 50vh; background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%); padding: 2em 0;">
        <div style="background: #fff; border-radius: 16px; box-shadow: 0 4px 32px 0 rgba(80, 90, 120, 0.10); padding: 2em; min-width: 520px; max-width: 98vw;">
          <div style="position: relative;">
            <h3 (click)="toggleModal()" style="
              position: relative;
              display: flex;
              align-items: center;
              gap: 1rem;
              margin-bottom: 1.5rem;
              padding: 1.25rem;
              background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
              border: none;
              border-radius: 16px;
              font-weight: 600;
              font-size: 1.25rem;
              color: #991b1b;
              cursor: pointer;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              overflow: hidden;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            " onMouseOver="
              this.style.transform='scale(1.02)';
              this.style.boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
              this.querySelector('.pulse').style.animation='pulse 1.5s infinite';
              this.querySelector('.alert-icon').style.transform='scale(1.1) rotate(10deg)';
              this.querySelector('.alert-text').style.letterSpacing='0.5px';
              this.querySelector('.alert-arrow').style.transform='translateX(5px)';
              this.querySelector('.alert-arrow').style.opacity='1';
            " onMouseOut="
              this.style.transform='scale(1)';
              this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
              this.querySelector('.pulse').style.animation='none';
              this.querySelector('.alert-icon').style.transform='scale(1) rotate(0deg)';
              this.querySelector('.alert-text').style.letterSpacing='normal';
              this.querySelector('.alert-arrow').style.transform='translateX(0)';
              this.querySelector('.alert-arrow').style.opacity='0.7';
            ">
              <!-- Animated background pulse -->
              <div class="pulse" style="
                position: absolute;
                top: 50%;
                left: 1.25rem;
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                background: #ef4444;
                opacity: 0.2;
                transform: translateY(-50%);
              "></div>

              <!-- Icon container -->
              <div class="alert-icon" style="
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 2rem;
                height: 2rem;
                background: #ef4444;
                border-radius: 50%;
                transition: transform 0.3s ease;
              ">
                <span style="font-size: 1.25rem;">⚠️</span>
              </div>

              <!-- Text content -->
              <div style="flex: 1;">
                <span class="alert-text" style="
                  display: block;
                  transition: all 0.3s ease;
                  font-weight: 600;
                ">Show Error Alert</span>
                <span style="
                  display: block;
                  font-size: 0.875rem;
                  color: #b91c1c;
                  opacity: 0.8;
                  font-weight: normal;
                ">Click to view example</span>
              </div>

              <!-- Arrow indicator -->
              <div class="alert-arrow" style="
                display: flex;
                align-items: center;
                padding-left: 1rem;
                font-size: 1.5rem;
                color: #ef4444;
                opacity: 0.7;
                transition: all 0.3s ease;
              ">
                <span style="transform: rotate(-45deg);">⟶</span>
              </div>
          </h3>

            <style>
              @keyframes pulse {
                0% {
                  transform: translateY(-50%) scale(1);
                  opacity: 0.2;
                }
                50% {
                  transform: translateY(-50%) scale(1.5);
                  opacity: 0.1;
                }
                100% {
                  transform: translateY(-50%) scale(1);
                  opacity: 0.2;
                }
              }
            </style>
          </div>
      <!-- End of trigger -->

          <ntv-modal 
            [config]="config"
            [isVisible]="showModal"
            (modalClose)="toggleModal()"
          >
              <div style="text-align: center;">
                <p style="color: #ef4444; font-size: 0.95rem;">
                  {{ config.message }}
                </p>
           

              <!-- Footer Button -->
              <div style="margin-top: 2em;">
                <button 
                  (click)="toggleModal()" 
                  style="padding: 0.5em 2em; background: #ef4444; color: white; border: none; border-radius: 6px; font-weight: 500; transition: all 0.2s;"
                  onMouseOver="this.style.background='#dc2626'"
                  onMouseOut="this.style.background='#ef4444'"
                >
                  {{ config.buttonLabel }}
                </button>
              </div>
               </div>
          </ntv-modal>
        </div>
      </div>
    `,
    };
  },
};

export const AlertSuccessVariant: Story = {
  args: {
    config: {
      variant: 'alert',
      alertType: 'success',
      message: 'Changes saved successfully!',
      buttonLabel: 'Continue',
      centered: true,
      animation: true,
      size: 'small',
      showHeader: false,
      showFooter: false,
      closable: false,
      closeOnBackdrop: false,
    } as ModalAlertConfig,
    isVisible: false,
  },
  render: (args) => {
    const component = {
      ...args,
      showModal: false,
      toggleModal() {
        this.showModal = !this.showModal;
      },
    };
    return {
      props: component,
      template: `

      <!-- This is just the trigger for the modal -->
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 50vh; background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%); padding: 2rem;">
        <div style="background: white; border-radius: 16px; box-shadow: 0 4px 32px 0 rgba(80, 90, 120, 0.10); padding: 2rem; min-width: 520px; max-width: 98vw;">
          <h3 (click)="toggleModal()" style="
            position: relative;
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
            padding: 1.25rem;
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
            border: none;
            border-radius: 16px;
            font-weight: 600;
            font-size: 1.25rem;
            color: #065f46;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          " onMouseOver="
            this.style.transform='scale(1.02)';
            this.style.boxShadow='0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            this.querySelector('.alert-icon').style.transform='scale(1.1) rotate(10deg)';
            this.querySelector('.alert-text').style.letterSpacing='0.5px';
            this.querySelector('.alert-arrow').style.transform='translateX(5px)';
            this.querySelector('.alert-arrow').style.opacity='1';
          " onMouseOut="
            this.style.transform='scale(1)';
            this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            this.querySelector('.alert-icon').style.transform='scale(1) rotate(0deg)';
            this.querySelector('.alert-text').style.letterSpacing='normal';
            this.querySelector('.alert-arrow').style.transform='translateX(0)';
            this.querySelector('.alert-arrow').style.opacity='0.7';
          ">
            <!-- Icon container -->
            <div class="alert-icon" style="
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 2rem;
              height: 2rem;
              background: #34d399;
              border-radius: 50%;
              transition: transform 0.3s ease;
            ">
              <span style="font-size: 1.25rem;">✨</span>
            </div>

            <!-- Text content -->
            <div style="flex: 1;">
              <span class="alert-text" style="
                display: block;
                transition: all 0.3s ease;
                font-weight: 600;
              ">Show Success Alert</span>
              <span style="
                display: block;
                font-size: 0.875rem;
                color: #047857;
                opacity: 0.8;
                font-weight: normal;
              ">Click to view example</span>
            </div>

            <!-- Arrow indicator -->
            <div class="alert-arrow" style="
              display: flex;
              align-items: center;
              padding-left: 1rem;
              font-size: 1.5rem;
              color: #34d399;
              opacity: 0.7;
              transition: all 0.3s ease;
            ">
              <span style="transform: rotate(-45deg);">⟶</span>
            </div>
          </h3>
          <!-- End of trigger -->


          <ntv-modal 
            [config]="config"
            [isVisible]="showModal"
            (modalClose)="toggleModal()"
          >
            <div style="text-align: center;">
              <p style="color: #047857; line-height: 1.6; max-width: 400px; margin: 0 auto;">
                {{ config.message }}
              </p>

               <!-- Footer Button -->
              <div style="margin-top: 2em;">
                <button 
                  (click)="toggleModal()" 
                  style="padding: 0.5em 2em; background: #8DCB2C; color: white; border: none; border-radius: 6px; font-weight: 500; transition: all 0.2s;"
                  onMouseOver="this.style.background='#66A51C'"
                  onMouseOut="this.style.background='#8DCB2C'"
                >
                  {{ config.buttonLabel }}
                </button>
              </div>
            </div>
          </ntv-modal>
        </div>
      </div>
    `,
    };
  },
};
