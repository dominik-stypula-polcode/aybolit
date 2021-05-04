import { customElement } from 'lit-element';
import '@conversionxl/cxl-lumo-styles';
import { ProgressBarElement } from '@vaadin/vaadin-progress-bar/src/vaadin-progress-bar';

@customElement('cxl-playbook-progress-bar')
export class CXLPlaybookProgressBar extends ProgressBarElement {
  static get properties() {
    return {
      labelElement: {
        type: HTMLElement,
        value() {
          return this.previousElementSibling.localName === 'label'
            ? this.previousElementSibling
            : null;
        },
      },
      /**
       * @see https://github.com/vaadin/web-components/blob/v20.0.0-beta1/packages/vaadin-context-menu/src/vaadin-context-menu.js#L312-L324
       */
      listenOnClosest: {
        type: String,
        value: 'article.playbook',
      },
    };
  }

  ready() {
    super.ready();

    this.closest(this.listenOnClosest).addEventListener(
      'cxl-playbook-accordion-changed',
      async (event) => {
        const savedStateCheckboxes = event.detail;

        const totalSteps = savedStateCheckboxes.length;
        const completedSteps = savedStateCheckboxes.filter((checkbox) => checkbox === true).length;

        this.value = completedSteps / totalSteps;

        // Update label.
        if (this.labelElement) {
          this.labelElement.textContent = `Completed ${completedSteps} of ${totalSteps} total steps`;
        }

        // Maybe completed.
        this._maybeUpdateTheme();
      }
    );
  }

  _maybeUpdateTheme() {
    const themeAttr = this.getAttribute('theme');
    let themes = themeAttr ? themeAttr.split(' ') : [];

    if (this.value < 1) {
      themes = themes.filter((t) => t !== 'success');
    } else if (!themes.includes('success')) {
      themes.push('success');
    }

    this.setAttribute('theme', themes.join(' '));
  }
}
