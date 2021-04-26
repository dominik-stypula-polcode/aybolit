import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import playbookStepData from './cxl-playbook-accordion.data.json';

let tmpTimeoutId = 0;

const hideAll = () => {
  document.querySelectorAll(`[icon="vaadin:comment"]`).forEach((el) => {
    el.classList.add('hidden');
  });
};
const onload = () => {
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('cxl-playbook-accordion').forEach((el) => {
      el.addEventListener('mouseleave', () => {
        window.clearTimeout(tmpTimeoutId);
        tmpTimeoutId = window.setTimeout(() => hideAll(), 2000);
      });
    });

    document.querySelectorAll('vaadin-accordion-panel').forEach((el) => {
      el.addEventListener('mouseenter', (evt) => {
        window.clearTimeout(tmpTimeoutId);
        tmpTimeoutId = window.setTimeout(() => hideAll(), 2000);

        const t = evt.target;
        const stepId = t.getAttribute('data-step-id');
        const commentIcon = document.querySelector(
          `[icon="vaadin:comment"][data-step-id="${stepId}"]`
        );
        hideAll();
        commentIcon.classList.remove('hidden');
      });

      el.addEventListener('mouseleave', () => {
        window.clearTimeout(tmpTimeoutId);
        tmpTimeoutId = window.setTimeout(() => hideAll(), 2000);
      });
    });
  });
};

export const CXLPlaybookAccordion = () => html`
  <style>
    .hidden {
      visibility: hidden;
    }
    vaadin-accordion-panel {
      position: relative;
    }
    iron-icon {
      position: absolute;
      top: 10%;
      right: -2em;
    }
  </style>
  ${onload()}
  <cxl-playbook-accordion id="playbook-3895" class="plural" opened="0">
    ${playbookStepData.map(
      (el) => html`
        <vaadin-accordion-panel
          class="playbook-step"
          theme="cxl-playbook-accordion reverse"
          data-step-id="${el.id}"
        >
          <header class="entry-header" slot="summary">
            <h3 class="entry-title no-anchor" itemprop="headline">
              <vaadin-checkbox value="${el.id}"></vaadin-checkbox>
              ${el.id}. ${unsafeHTML(el.title.rendered)}
            </h3>
            <iron-icon icon="vaadin:comment" class="hidden" data-step-id="${el.id}"></iron-icon>
          </header>
          <div class="entry-summary" itemprop="description">${unsafeHTML(el.content.rendered)}</div>
        </vaadin-accordion-panel>
      `
    )}
  </cxl-playbook-accordion>
`;
