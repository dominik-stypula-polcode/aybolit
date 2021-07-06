import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import playbookStepData from './cxl-playbook-accordion.data.json';

export const CXLPlaybookAccordion = ({ PlaybookId, UserId, UserEmail, UserName }) => {
  document.timeoutID = {};

  const loadCommentsScript = (el) => {
    const timeoutKey = `${PlaybookId}-${el.id}`;

    document.addEventListener('DOMContentLoaded', () => {
      // purpose: do not reload this script every time user clicks a keyboard key in the storybook attribute field
      // because it slows down the browser massively
      // timeout reloads the script after 1 second since the change
      // and if changes keeps going timeout is reset and restored again for 1 second

      if (document.timeoutID[timeoutKey]) {
        window.clearTimeout(document.timeoutID[timeoutKey]);
      }

      document.timeoutID[timeoutKey] = setTimeout(() => {
        const widgetEl = document.getElementById(`fastcomments-widget-${PlaybookId}-${el.id}`);

        widgetEl.innerHTML = '';

        window.FastCommentsUI(widgetEl, {
          tenantId: 'gGi6z7Ges',
          urlId: `https://${window.location.host}/playbooks/${PlaybookId}/${el.id}`,
          simpleSSO: {
            username: `${UserName}`,
            email: `${UserEmail}`,
            avatarSrc: `https://example.com/avatar/${UserId}`,
            websiteUrl: `https://example.com/profiles/${UserId}`,
          },
        });
      }, 1000);
    });
  };

  return html`
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
            <div class="entry-summary" itemprop="description">
              ${unsafeHTML(el.content.rendered)}
            </div>
            <div class="entry-footer">
              <div id="fastcomments-widget-${PlaybookId}-${el.id}"></div>
              ${loadCommentsScript(el)}
            </div>
          </vaadin-accordion-panel>
        `
      )}
    </cxl-playbook-accordion>
  `;
};
