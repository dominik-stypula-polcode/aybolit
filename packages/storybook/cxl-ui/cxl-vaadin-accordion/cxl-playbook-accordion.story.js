import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import playbookStepData from './cxl-playbook-accordion.data.json';

let tmpTimeoutId = 0;

const hideAll = () => {
  document.querySelectorAll(`[icon="vaadin:comment"]`).forEach((el) => {
    el.classList.add('hidden');
  });
};

const clearTimeout = () => {
  window.clearTimeout(tmpTimeoutId);
};

const setDelay = () => {
  clearTimeout();
  tmpTimeoutId = window.setTimeout(() => hideAll(), 2000);
};

const isLayoutWide = () => document.querySelector('cxl-app-layout').wide;

const onload = () => {
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('cxl-playbook-accordion').forEach((el) => {
      el.addEventListener('mouseleave', () => {
        setDelay();
      });
    });

    document.querySelectorAll('vaadin-accordion-panel').forEach((el) => {
      el.addEventListener('mouseenter', (evt) => {
        if (!isLayoutWide()) {
          return;
        }
        setDelay();

        const stepId = evt.target.getAttribute('data-step-id');
        const commentIcon = document.querySelector(
          `[icon="vaadin:comment"][data-step-id="${stepId}"]`
        );

        hideAll();

        if (commentIcon) {
          commentIcon.classList.remove('hidden');
        }
      });

      el.addEventListener('mouseleave', () => {
        if (!isLayoutWide()) {
          return;
        }
        setDelay();
      });

      el.querySelectorAll('iron-icon').forEach((icon) => {
        icon.addEventListener('mouseenter', () => {
          clearTimeout();
        });

        icon.addEventListener('mouseleave', () => {
          setDelay();
        });
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
    vaadin-accordion-panel iron-icon {
      position: absolute;
      top: calc(50% - 10px);
      right: calc(var(--lumo-space-l) * -2);
    }
    vaadin-accordion-panel iron-icon:hover {
      cursor: pointer;
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
