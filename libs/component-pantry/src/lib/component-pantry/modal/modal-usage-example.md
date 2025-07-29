# Modal Component Usage Examples

The `ntv-modal` component is a highly configurable modal dialog that supports content projection, multiple variants, and extensive customization options.

## Basic Usage

### Simple Modal

```typescript
// Components
export class MyComponent {
  showModal = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
```

```html
<ntv-modal [isVisible]="showModal" (modalClose)="toggleModal()" variant="default" size="medium">
  <h2>Simple Modal</h2>
  <p>This is a basic modal with default settings.</p>
  <button (click)="toggleModal()">Close</button>
</ntv-modal>
```

### Modal with Header

```typescript
// Component
export class MyComponent {
  showModal = false;
  modalConfig = {
    variant: 'default',
    size: 'medium',
    showHeader: true,
    headerTitle: 'User Profile',
    headerSubtitle: 'View and edit user information',
    animation: true,
    centered: true,
    backdrop: 'blur',
  };

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
```

```html
<ntv-modal [config]="modalConfig" [isVisible]="showModal" (modalClose)="toggleModal()">
  <div class="user-profile">
    <h3>John Doe</h3>
    <p>Email: john.doe@example.com</p>
    <p>Role: Administrator</p>
  </div>
</ntv-modal>
```

## Configuration Options

### Using Individual Properties

```html
<ntv-modal [isVisible]="showModal" variant="form" size="large" position="center" backdrop="blur" [closable]="true" [closeOnBackdrop]="true" [closeOnEscape]="true" [fullscreen]="false" [scrollable]="true" [centered]="true" [showHeader]="true" [showFooter]="true" headerTitle="User Registration" headerSubtitle="Please fill in your details" customClass="my-custom-modal" [animation]="true" [preventClose]="false" (modalOpen)="onModalOpen()" (modalClose)="onModalClose()" (backdropClick)="onBackdropClick()" (escapeKey)="onEscapeKey()">
  <!-- Modal content goes here -->
</ntv-modal>
```

### Using Config Object (Recommended)

```typescript
// Component class
export class MyComponent {
  showModal = false;
  modalConfig: ModalConfig = {
    variant: 'form',
    size: 'large',
    position: 'center',
    backdrop: 'blur',
    closable: true,
    closeOnBackdrop: true,
    closeOnEscape: true,
    fullscreen: false,
    scrollable: true,
    centered: true,
    showHeader: true,
    showFooter: true,
    headerTitle: 'User Registration',
    headerSubtitle: 'Please fill in your details',
    customClass: 'my-custom-modal',
    animation: true,
    preventClose: false,
  };

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
```

```html
<ntv-modal [config]="modalConfig" [isVisible]="showModal" (modalClose)="toggleModal()">
  <!-- Modal content goes here -->
</ntv-modal>
```

## Modal Variants

### Form Modal

```typescript
// Component
export class MyComponent {
  showModal = false;
  formConfig = {
    variant: 'form',
    size: 'large',
    showHeader: true,
    showFooter: true,
    headerTitle: 'Contact Form',
    headerSubtitle: 'Please fill in your details',
    animation: true,
    centered: true,
    backdrop: 'blur',
  };

  toggleModal() {
    this.showModal = !this.showModal;
  }

  onSubmit() {
    // Handle form submission
    this.toggleModal();
  }
}
```

```html
<ntv-modal [config]="formConfig" [isVisible]="showModal" (modalClose)="toggleModal()">
  <form (ngSubmit)="onSubmit()">
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required />
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required />
    </div>
    <div modal-footer>
      <button type="button" (click)="toggleModal()">Cancel</button>
      <button type="submit">Submit</button>
    </div>
  </form>
</ntv-modal>
```

### Confirmation Modal

```typescript
// Component
export class MyComponent {
  showModal = false;
  confirmConfig = {
    variant: 'confirmation',
    size: 'small',
    showHeader: false,
    showFooter: false,
    animation: true,
    centered: true,
    backdrop: 'blur',
    closable: false,
    closeOnBackdrop: false,
  };

  toggleModal() {
    this.showModal = !this.showModal;
  }

  deleteUser() {
    // Delete logic here
    this.toggleModal();
  }
}
```

```html
<ntv-modal [config]="confirmConfig" [isVisible]="showModal" (modalClose)="toggleModal()">
  <div class="confirmation-content">
    <h3>Delete User</h3>
    <p>Are you sure you want to delete this user? This action cannot be undone.</p>
    <div class="actions">
      <button (click)="toggleModal()">Cancel</button>
      <button (click)="deleteUser()">Delete</button>
    </div>
  </div>
</ntv-modal>
```

### Alert Modal

```typescript
// Component
export class MyComponent {
  showModal = false;
  alertConfig = {
    variant: 'alert',
    size: 'small',
    showHeader: false,
    showFooter: false,
    animation: true,
    centered: true,
    backdrop: 'blur',
    closable: false,
  };

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
```

```html
<ntv-modal [config]="alertConfig" [isVisible]="showModal" (modalClose)="toggleModal()">
  <div class="alert-content">
    <h3>Success!</h3>
    <p>Your changes have been saved successfully.</p>
    <button (click)="toggleModal()">OK</button>
  </div>
</ntv-modal>
```

### Info Modal

```typescript
// Component
export class MyComponent {
  showModal = false;
  infoConfig = {
    variant: 'info',
    size: 'medium',
    showHeader: true,
    headerTitle: 'Information',
    animation: true,
    centered: true,
    backdrop: 'blur',
  };

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
```

```html
<ntv-modal [config]="infoConfig" [isVisible]="showModal" (modalClose)="toggleModal()">
  <div class="info-content">
    <h3>Information</h3>
    <p>This is an informational modal with helpful details.</p>
    <button (click)="toggleModal()">Got it</button>
  </div>
</ntv-modal>
```

## Accessibility Features

The modal component includes built-in accessibility features:

- **ARIA attributes**: `role="dialog"`, `aria-modal="true"`
- **Focus management**: Automatically focuses modal content when opened
- **Keyboard navigation**: Escape key support
- **Screen reader support**: Proper labeling and descriptions

## Best Practices

1. **Use Config Objects**: For complex configurations, use the `config` input instead of individual properties
2. **Handle Events**: Always handle `modalClose` events to update your component state
3. **Accessibility**: Ensure your modal content is accessible with proper headings and labels
4. **Performance**: Use `[isVisible]` to control modal visibility
5. **Content Projection**: Use content projection for maximum flexibility
6. **Responsive Design**: Consider different screen sizes when choosing modal sizes

## Complete Example

```typescript
// Component class
export class UserProfileComponent {
  showEditModal = false;
  showDeleteModal = false;

  editConfig = {
    variant: 'form',
    size: 'large',
    showHeader: true,
    showFooter: true,
    headerTitle: 'Edit User Profile',
    headerSubtitle: 'Update user information',
    animation: true,
    centered: true,
    backdrop: 'blur',
  };

  deleteConfig = {
    variant: 'confirmation',
    size: 'small',
    showHeader: false,
    showFooter: false,
    animation: true,
    centered: true,
    backdrop: 'blur',
    closable: false,
    closeOnBackdrop: false,
  };

  toggleEditModal() {
    this.showEditModal = !this.showEditModal;
  }

  toggleDeleteModal() {
    this.showDeleteModal = !this.showDeleteModal;
  }

  deleteUser() {
    // Delete logic here
    this.toggleDeleteModal();
  }
}
```

```html
<!-- Template -->
<button (click)="toggleEditModal()">Edit Profile</button>
<button (click)="toggleDeleteModal()">Delete User</button>

<!-- Edit Modal -->
<ntv-modal [config]="editConfig" [isVisible]="showEditModal" (modalClose)="toggleEditModal()">
  <form>
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required />
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required />
    </div>
    <div modal-footer>
      <button type="button" (click)="toggleEditModal()">Cancel</button>
      <button type="submit">Save Changes</button>
    </div>
  </form>
</ntv-modal>

<!-- Delete Modal -->
<ntv-modal [config]="deleteConfig" [isVisible]="showDeleteModal" (modalClose)="toggleDeleteModal()">
  <div class="confirmation-content">
    <h3>Delete User</h3>
    <p>Are you sure you want to delete this user? This action cannot be undone.</p>
    <div class="actions">
      <button (click)="toggleDeleteModal()">Cancel</button>
      <button (click)="deleteUser()">Delete</button>
    </div>
  </div>
</ntv-modal>
```

## Alert Modal Examples

### Error Alert Modal

```typescript
// In your component
import { DEFAULT_ALERT_ERROR_CONFIG, ModalAlertConfig } from './modal.types';

export class YourComponent {
  showErrorAlert = false;

  errorConfig: ModalAlertConfig = {
    ...DEFAULT_ALERT_ERROR_CONFIG,
    message: 'Failed to save changes. Please try again.',
  };

  toggleErrorAlert() {
    this.showErrorAlert = !this.showErrorAlert;
  }

  // Example usage in error handling
  async saveChanges() {
    try {
      await this.service.save();
      // Show success alert
    } catch (error) {
      this.errorConfig.message = error.message;
      this.showErrorAlert = true;
    }
  }
}
```

```html
<ntv-modal [config]="errorConfig" [isVisible]="showErrorAlert" (modalClose)="toggleErrorAlert()">
  <!-- The error Lottie animation will be automatically displayed -->
  <div class="text-center">
    <p class="mt-4 text-sm text-red-500">{{ errorConfig.message }}</p>
    <div class="mt-8">
      <button (click)="toggleErrorAlert()" class="px-8 py-2 font-medium text-white transition-all bg-red-500 rounded-md hover:bg-red-600">{{ errorConfig.buttonLabel }}</button>
    </div>
  </div>
</ntv-modal>
```

### Success Alert Modal

```typescript
export class YourComponent {
  showSuccessAlert = false;

  successConfig: ModalAlertConfig = {
    variant: 'alert',
    alertType: 'success',
    size: 'small',
    showHeader: false,
    showFooter: false,
    message: 'Changes saved successfully!',
    buttonLabel: 'OK',
    closable: false,
    closeOnBackdrop: false,
    centered: true,
  };

  toggleSuccessAlert() {
    this.showSuccessAlert = !this.showSuccessAlert;
  }
}
```

```html
<ntv-modal [config]="successConfig" [isVisible]="showSuccessAlert" (modalClose)="toggleSuccessAlert()">
  <!-- The success Lottie animation will be automatically displayed -->
  <div class="text-center">
    <p class="mt-4 text-sm text-green-500">{{ successConfig.message }}</p>
    <div class="mt-8">
      <button (click)="toggleSuccessAlert()" class="px-8 py-2 font-medium text-white transition-all bg-green-500 rounded-md hover:bg-green-600">{{ successConfig.buttonLabel }}</button>
    </div>
  </div>
</ntv-modal>
```

### Alert Modal Configuration

The alert modal supports two types: 'success' and 'error', with built-in Lottie animations. Here are the configuration options:

```typescript
interface ModalAlertConfig {
  variant: 'alert';
  alertType: 'success' | 'error';
  size?: 'small';
  showHeader: false;
  showFooter: false;
  message: string;
  buttonLabel?: string;
  closable?: boolean;
  closeOnBackdrop?: boolean;
  centered?: boolean;
}
```

For error alerts, you can use the `DEFAULT_ALERT_ERROR_CONFIG` as a base:

```typescript
const errorConfig: ModalAlertConfig = {
  ...DEFAULT_ALERT_ERROR_CONFIG,
  message: 'Your error message here',
};
```

### Best Practices for Alert Modals

1. **Error Alerts**

   - Use clear, actionable error messages
   - Let the built-in Lottie animation handle the visual error state
   - Always provide a way to dismiss the alert
   - Keep the message concise and helpful

2. **Success Alerts**

   - Keep success messages brief and positive
   - Let the built-in Lottie animation handle the visual success state
   - Consider auto-dismiss for non-critical confirmations
   - Ensure the message complements the animation

3. **General Guidelines**
   - Center alerts on screen
   - Use appropriate size (small for alerts)
   - Disable backdrop click for important messages
   - Ensure keyboard accessibility
   - Use consistent styling across your application
   - Let the built-in animations handle the visual feedback
