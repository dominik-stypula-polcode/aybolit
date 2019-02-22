import { CheckboxElement } from '@aybolit/core';
import abwCheckboxStyles from './styles/abw-checkbox-css.js';

export class AbwCheckbox extends CheckboxElement {
  static get styles() {
    return [super.styles, abwCheckboxStyles];
  }
}

customElements.define('abw-checkbox', AbwCheckbox);
