import { Component, input, output, computed, signal, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionConfig, AccordionVariant, AccordionSize } from './accordion.types';

/**
 * Simple accordion component with ng-content projection
 * 
 * @description A clean accordion component that supports:
 * - Named content projection for header and body
 * - Multiple visual variants (default, bordered, flush)
 * - Flexible sizing options (sm, md, lg)
 * - Toggle functionality
 * - Smooth animations
 * - Custom icons and styling
 * - Accessibility features
 * 
 * @example
 * // Basic usage with ng-content slots
 * <ntv-accordion variant="bordered">
 *   <div slot="header">Click to expand</div>
 *   <div slot="body">This is the accordion content</div>
 * </ntv-accordion>
 * 
 * @example
 * // With configuration object
 * <ntv-accordion [config]="accordionConfig">
 *   <h3 slot="header">My Header</h3>
 *   <p slot="body">My content goes here</p>
 * </ntv-accordion>
 */
@Component({
  selector: 'ntv-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.html',
  styleUrls: ['./accordion.css'],
})
export class Accordion implements OnInit, AfterViewInit, OnDestroy {
  // Signal inputs
  
  /** Visual style variant of the accordion */
  variant = input<AccordionVariant>('default');
  
  /** Size of the accordion (sm, md, lg) */
  size = input<AccordionSize>('md');
  
  /** Whether to show smooth animations */
  animated = input<boolean>(true);
  
  /** Whether to show expand/collapse icons */
  showIcons = input<boolean>(true);
  
  /** Initial open state */
  initialOpen = input<boolean>(false);
  
  /** Whether the accordion is disabled */
  disabled = input<boolean>(false);
  
  /** Configuration object for DRY usage */
  config = input<AccordionConfig>();
  
  /** Group name for exclusive behavior - only one accordion in the same group can be open */
  group = input<string | undefined>(undefined);

  // Signal outputs
  
  /**
   * Event emitted when the accordion is toggled
   */
  accordionToggle = output<boolean>();

  // Internal state
  public _isOpen = signal<boolean>(false);
  private _accordionId = signal<string>('accordion-' + Math.random().toString(36).substr(2, 9));
  
  // Static group management for exclusive behavior
  private static _groupInstances = new Map<string, Set<Accordion>>();
  
  private addToGroup(): void {
    const groupName = this.group();
    if (groupName) {
      if (!Accordion._groupInstances.has(groupName)) {
        Accordion._groupInstances.set(groupName, new Set());
      }
      const group = Accordion._groupInstances.get(groupName);
      if (group) {
        group.add(this);
      }
    }
  }
  
  private removeFromGroup(): void {
    const groupName = this.group();
    if (groupName && Accordion._groupInstances.has(groupName)) {
      const group = Accordion._groupInstances.get(groupName);
      if (group) {
        group.delete(this);
        if (group.size === 0) {
          Accordion._groupInstances.delete(groupName);
        }
      }
    }
  }
  
  private closeOthersInGroup(): void {
    const groupName = this.group();
    if (groupName && Accordion._groupInstances.has(groupName)) {
      const group = Accordion._groupInstances.get(groupName);
      if (group) {
        group.forEach(accordion => {
          if (accordion !== this && accordion.isOpen()) {
            accordion._isOpen.set(false);
            accordion.accordionToggle.emit(false);
          }
        });
      }
    }
  }

  // Computed properties that merge config with individual inputs
  
  readonly mergedVariant = computed(
    () => this.config()?.variant ?? this.variant()
  );
  
  readonly mergedSize = computed(
    () => this.config()?.size ?? this.size()
  );
  
  readonly mergedAnimated = computed(
    () => this.config()?.animated ?? this.animated()
  );
  
  readonly mergedShowIcons = computed(
    () => this.config()?.showIcons ?? this.showIcons()
  );
  
  readonly mergedInitialOpen = computed(
    () => this.config()?.initialOpen ?? this.initialOpen()
  );
  
  readonly mergedDisabled = computed(
    () => this.config()?.disabled ?? this.disabled()
  );

  /** Computed CSS classes for the accordion container */
  accordionClasses = computed(() => {
    const baseClasses = 'accordion';
    const variantClass = `accordion--${this.mergedVariant()}`;
    const sizeClass = `accordion--${this.mergedSize()}`;
    const animatedClass = this.mergedAnimated() ? 'accordion--animated' : '';
    const disabledClass = this.mergedDisabled() ? 'accordion--disabled' : '';

    return [baseClasses, variantClass, sizeClass, animatedClass, disabledClass]
      .filter(Boolean)
      .join(' ');
  });

  /** Computed property for the open state */
  isOpen = computed(() => this._isOpen());
  
  /** Computed property for the accordion ID */
  accordionId = computed(() => this._accordionId());

  /**
   * Toggles the open/closed state of the accordion
   */
  toggle(): void {
    // Don't toggle if disabled
    if (this.mergedDisabled()) {
      return;
    }
    
    const newState = !this._isOpen();
    
    // If opening and in a group, close others first
    if (newState && this.group()) {
      this.closeOthersInGroup();
    }
    
    this._isOpen.set(newState);
    this.accordionToggle.emit(newState);
  }

  /**
   * Initializes the accordion with the initial open state
   */
  ngOnInit(): void {
    this._isOpen.set(this.mergedInitialOpen());
  }
  
  /**
   * Adds accordion to group after view initialization
   */
  ngAfterViewInit(): void {
    this.addToGroup();
  }
  
  /**
   * Removes accordion from group on destroy
   */
  ngOnDestroy(): void {
    this.removeFromGroup();
  }
}
