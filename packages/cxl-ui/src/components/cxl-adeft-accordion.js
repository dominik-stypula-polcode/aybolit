import { customElement } from 'lit-element';
import '@conversionxl/cxl-lumo-styles';
import '@vaadin/vaadin-accordion';
import '@vaadin/vaadin-checkbox';
import { registerStyles, css } from '@vaadin/vaadin-themable-mixin/register-styles.js';
import { registerGlobalStyles } from '@conversionxl/cxl-lumo-styles/src/utils';
import cxlAdeftAccordionGlobalStyles from '../styles/global/cxl-adeft-accordion-css.js';
import { CXLVaadinAccordion } from './cxl-vaadin-accordion';

/**
 * Allows opening multiple panels simultaneously.
 * Saves panel state, restores on page load.
 */
@customElement('cxl-adeft-accordion')
export class CXLAdeftAccordion extends CXLVaadinAccordion {
  constructor() {
    super();
    registerStyles('vaadin-accordion-panel', [CXLAdeftAccordion._getAccordionPanelStyles()]);
    registerStyles('vaadin-checkbox', [CXLAdeftAccordion._getVaadinCheckboxStyles()]);
  }

  static _getAccordionPanelStyles() {
    return css`
      [part='summary'] {
        box-shadow: 0 4px 12px rgba(36, 38, 40, 0.12);
        padding: 0;
      }
      :host(.checked) [part='summary'] {
        background-color: #2247f2;
        color: #fff;
      }
      :host(.checked) [part='summary']:hover {
        color: #fff;
      }
      :host(.checked) [part='toggle'] {
        color: #fff !important;
      }
      :host(.emptyContent) [part='toggle'] {
        display: none;
      }
      [part='toggle'] {
        padding: 12px;
      }
      [part='toggle']::before {
        content: var(--lumo-icons-angle-down);
      }
      [part='summary'][aria-expanded='true'] [part='toggle']::before {
        /** QUIRK WARNING: You can't set up correct icon here,
        because some stupid javascripts are turning it 90 degrees counter-clockwise
        so when you want "right" icon here you must set "up" icon etc.
       */
        content: var(--lumo-icons-angle-left) !important;
      }
    `;
  }

  static _getVaadinCheckboxStyles() {
    return css`
      :host([theme~='custom']) [part='checkbox'] {
        border: 2px solid #fff !important;
        width: 18px;
        height: 18px;
      }
      :host([theme~='custom']) [part='label'] {
        display: none;
      }
    `;
  }

  /**
   * Global styles.
   */
  ready() {
    super.ready();
    // Define and register a style sheet for the <vaadin-text-field> component
    registerGlobalStyles(cxlAdeftAccordionGlobalStyles, {
      moduleId: 'cxl-adeft-accordion-global'
    });
  }

  /**
   *
   * @param {HTMLCollection} items
   * @private
   */
  _saveAccordionState(items) {
    const storageId = this.getAttribute('id');

    // Avoid null key.
    if (storageId) {
      const stateItems = [];

      items.forEach((value, key) => {
        stateItems[key] = items[key].opened;
      });
      this._dispatchCustomEvent(stateItems);
      localStorage.setItem(storageId, JSON.stringify(stateItems));
      this._updateClassesWithCheckboxesStatuses();
    }
  }

  _updateClassesWithCheckboxesStatuses() {
    const checkboxes = this.querySelectorAll('vaadin-checkbox');
    const panels = this.querySelectorAll('vaadin-accordion-panel');
    checkboxes.forEach((checkbox, index) => {
      if (!panels[index])
        throw new Error(`vaadin-accordion-panel with index ${index} doesn't exist`);
      const isChecked =
        checkbox.hasAttribute('aria-checked') && checkbox.getAttribute('aria-checked') === 'true';
      const accordionPanel = panels[index];
      accordionPanel.querySelectorAll('.summaryTop').forEach(el => {
        if (isChecked) {
          accordionPanel.removeAttribute('opened');
          el.classList.add('checked');
        } else {
          el.classList.remove('checked');
        }
      });
    });
  }

  _dispatchCustomEvent(stateItems) {
    const event = new CustomEvent('cxl-vaadin-accordion-state-changed', {
      detail: {
        items: stateItems,
        bubbles: true,
        id: this.getAttribute('id')
      }
    });
    this.dispatchEvent(event);
  }
}
