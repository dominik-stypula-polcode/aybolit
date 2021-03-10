import { html } from 'lit-html';
import sidebarData from '../data/sidebar.data.json';
import '@conversionxl/cxl-ui/src/components/cxl-vaadin-accordion.js';

const RenderSidebarMenuItem = (menuItem) => html`
  ${menuItem.menu.length > 0
    ? html` <vaadin-accordion-panel theme="cxl-hub-sidebar">
        <div slot="summary">${menuItem.title}</div>
        <div class="cxl-hub-items">
          ${menuItem.menu.map(
            (subMenu) => html`
              <a cxl-sidebar-link href="${subMenu.url}">
                <span cxl-sidebar-title>${subMenu.title}</span>
                <span cxl-sidebar-playbooks-count>${subMenu.playbooks_count}</span>
              </a>
            `
          )}
        </div>
      </vaadin-accordion-panel>`
    : html`
        <a one-level href="${menuItem.url}" theme="cxl-dashboard-sidebar">${menuItem.title}</a>
      `}
`;

const RenderSidebar = () =>
  html`
    <cxl-vaadin-accordion id="dashboard-sidebar-menu" theme="cxl-hub-sidebar">
      ${sidebarData.map((menuItem) => RenderSidebarMenuItem(menuItem))}
    </cxl-vaadin-accordion>
  `;

export default RenderSidebar;
