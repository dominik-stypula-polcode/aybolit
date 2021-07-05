import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import playbookStepData from './cxl-playbook-accordion.data.json';

export const CXLPlaybookAccordion = ({ PlaybookId }) => html`
  <script src="https://cdn.fastcomments.com/js/embed-v2.min.js"></script>

  <cxl-playbook-accordion id="cxl-playbook-accordion-${PlaybookId}" class="plural" opened="0">
    ${playbookStepData.map(
      (el) => html`
        <vaadin-accordion-panel theme="cxl-playbook-accordion reverse" data-step-id="${el.id}">
          <header class="entry-header" slot="summary">
            <vaadin-checkbox value="${el.id}"></vaadin-checkbox>
            <h3 class="entry-title no-anchor" itemprop="headline">
              ${el.id}. ${unsafeHTML(el.title.rendered)}
            </h3>
          </header>
          <div class="entry-summary" itemprop="description">${unsafeHTML(el.content.rendered)}</div>
          <div class="entry-footer">
            <div id="fastcomments-widget-${el.id}"></div>
            <script>
              window.FastCommentsUI(document.getElementById('fastcomments-widget-${el.id}'), {
                tenantId: 'demo',
                urlId: 'https://${window.location.host}/playbooks/${PlaybookId}/${el.id}',
              });
            </script>
          </div>
        </vaadin-accordion-panel>
      `
    )}
  </cxl-playbook-accordion>
`;
