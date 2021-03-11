import { html, render } from 'lit-html';
import sidebarData from '../data/sidebar.data.json';
import '@conversionxl/cxl-ui/src/components/cxl-vaadin-accordion.js';

const tagClickedHandler = (event) => {
  event.currentTarget.toggleAttribute('selected');
};

const displayTags = (tagsJson) => {
  const tagsArr = tagsJson === 'undefined' ? [] : JSON.parse(tagsJson);

  const templateResultObjects = tagsArr.map(
    (tag) =>
      html`<vaadin-button theme="secondary" @click="${tagClickedHandler}">${tag}</vaadin-button>`
  );

  render(templateResultObjects, document.querySelector('#selected-tags'));
};

const displayTitle = (categoryNode) => {
  document.querySelector('.cxl-hub-header h2').innerHTML = categoryNode.getAttribute('title');
};

const sidebarCategoryClickHandler = (event) => {
  const elementWithHandler = event.currentTarget;

  event.preventDefault();

  document
    .querySelectorAll('#dashboard-sidebar-menu [is-category]')
    .forEach((el) => el.removeAttribute('checked'));

  if (elementWithHandler.parentNode.tagName.toLowerCase() === 'vaadin-accordion-panel') {
    document
      .querySelectorAll('#dashboard-sidebar-menu vaadin-accordion-panel')
      .forEach((el) => el.removeAttribute('opened'));
  }

  elementWithHandler.setAttribute('checked', true);

  displayTitle(elementWithHandler);
  displayTags(elementWithHandler.getAttribute('tags'));

  return false;
};

const RenderSidebarMenuItem = (menuItem) => html`
  ${menuItem.menu.length > 0
    ? html` <vaadin-accordion-panel theme="cxl-dashboard-sidebar">
        <div
          is-category
          tags="${JSON.stringify(menuItem.tags)}"
          title="${menuItem.title}"
          slot="summary"
          @click="${sidebarCategoryClickHandler}"
        >
          ${menuItem.title}
        </div>
        <div id="cxl-dashboard-items" class="cxl-hub-items">
          ${menuItem.menu.map(
            (subMenu) => html`
              <a
                is-category
                cxl-sidebar-link
                href="${subMenu.url}"
                tags="${JSON.stringify(subMenu.tags)}"
                title="${subMenu.title}"
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
        <a
          is-category
          one-level
          tags="${JSON.stringify(menuItem.tags)}"
          title="${menuItem.title}"
          href="${menuItem.url}"
          @click="${sidebarCategoryClickHandler}"
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
