import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import playbookStepData from './cxl-playbook-accordion.data.json';

const render = (htmlStr) => {
    const htmlWithoutAnchors = htmlStr.replace(/<a.*?>(.*?)<\/a>/gi, "<span class=\"replaced-for-anchor\">$1</span>");
    return unsafeHTML(htmlWithoutAnchors);
}

export const CXLPlaybookAccordion = ({ FeedbackButtonLabel, PlaybookId }) => html`
  <cxl-playbook-accordion id="cxl-playbook-accordion-${PlaybookId}" class="plural" opened="0">
    ${playbookStepData.map(
      (el) => html`
        <vaadin-accordion-panel theme="cxl-playbook-accordion reverse" data-step-id="${el.id}">
          <header class="entry-header" slot="summary">
            <vaadin-checkbox value="${el.id}"></vaadin-checkbox>
            <h3 class="entry-title no-anchor" itemprop="headline">
              ${el.id}. ${render(el.title.rendered)}
            </h3>
          </header>
          <div class="entry-summary" itemprop="description">${render(el.content.rendered)}</div>
          <div class="entry-footer">
            <vaadin-button
              onclick="alert('Step ID: ' + this.closest('vaadin-accordion-panel').dataset.stepId)"
            >
              <iron-icon icon="vaadin:comment" slot="prefix"></iron-icon>
              ${FeedbackButtonLabel}
            </vaadin-button>
          </div>
        </vaadin-accordion-panel>
      `
    )}
  </cxl-playbook-accordion>
`;
