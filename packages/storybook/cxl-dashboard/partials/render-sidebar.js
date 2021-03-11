import { html } from 'lit-html';
import sidebarData from '../data/sidebar.data.json';
import '@conversionxl/cxl-ui/src/components/cxl-vaadin-accordion.js';

// eslint-disable-next-line func-names
const sidebarCategoryClickHandler = function (event) {
  event.preventDefault();

  document
    .querySelectorAll('#dashboard-sidebar-menu [is-category]')
    .forEach((el) => el.removeAttribute('checked'));

  if (this.parentNode.tagName.toLowerCase() === 'vaadin-accordion-panel') {
    document
      .querySelectorAll('#dashboard-sidebar-menu vaadin-accordion-panel')
      .forEach((el) => el.removeAttribute('opened'));
  }

  this.setAttribute('checked', true);

  return false;
};

const RenderSidebarMenuItem = (menuItem) => html`
  ${menuItem.menu.length > 0
    ? html` <vaadin-accordion-panel theme="cxl-dashboard-sidebar">
        <div is-category slot="summary" @click="${sidebarCategoryClickHandler}">
          ${menuItem.title}
        </div>
        <div id="cxl-dashboard-items" class="cxl-hub-items">
          ${menuItem.menu.map(
            (subMenu) => html`
              <a
                is-category
                cxl-sidebar-link
                href="${subMenu.url}"
                @click="${sidebarCategoryClickHandler}"
              >
                <span cxl-sidebar-title>${subMenu.title}</span>
                <span cxl-sidebar-playbooks-count>${subMenu.playbooks_count}</span>
              </a>
            `
          )}
        </div>
      </vaadin-accordion-panel>`
    : html`
        <a is-category one-level href="${menuItem.url}" @click="${sidebarCategoryClickHandler}"
          >${menuItem.title}</a
        >
      `}
`;

const RenderSidebar = () =>
  html`
    <cxl-vaadin-accordion id="dashboard-sidebar-menu" theme="cxl-hub-sidebar">
      ${sidebarData.map((menuItem) => RenderSidebarMenuItem(menuItem))}
    </cxl-vaadin-accordion>
  `;

export default RenderSidebar;
