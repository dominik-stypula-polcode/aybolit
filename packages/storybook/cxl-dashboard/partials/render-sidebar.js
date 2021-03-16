import { html, render } from 'lit-html';
import sidebarData from '../data/sidebar.data.json';
import '@conversionxl/cxl-ui/src/components/cxl-vaadin-accordion.js';

const tagClickedHandler = (event) => {
  document.querySelectorAll('#selected-tags vaadin-button').forEach((el) => {
    if (el !== event.currentTarget) {
      el.removeAttribute('selected');
    }
  });

  event.currentTarget.toggleAttribute('selected');

  const customEvent = new CustomEvent('cxl-dashboard-tags-changed', {
    detail: {
      element: event.currentTarget,
    },
    bubbles: true,
  });

  event.currentTarget.dispatchEvent(customEvent);
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
  document.querySelector('.cxl-hub-title').innerHTML = categoryNode.getAttribute('title');
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

  const customEvent = new CustomEvent('cxl-dashboard-category-changed', {
    detail: {
      element: event.currentTarget,
      category: elementWithHandler.querySelector('[cxl-sidebar-title]')
        ? elementWithHandler.querySelector('[cxl-sidebar-title]').innerText
        : elementWithHandler.innerText,
    },
    bubbles: true,
  });

  console.log(customEvent);

  elementWithHandler.dispatchEvent(customEvent);

  return false;
};

const RenderSidebarMenuItem = (menuItem) => html`
  ${menuItem.menu.length > 0
    ? html` <vaadin-accordion-panel theme="cxl-dashboard-sidebar">
        <div
          ?checked=${menuItem.isChecked}
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
                ?checked=${subMenu.isChecked}
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
          ?checked=${menuItem.isChecked}
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

const RenderSidebar = (defaultCheckedCategory) =>
  html`
    <h3>My Dashboard</h3>
    <h2 class="cxl-sidebar-header">Navigation</h2>
    <cxl-vaadin-accordion id="dashboard-sidebar-menu" theme="cxl-hub-sidebar">
      ${sidebarData.map((menuItem) => {
        // eslint-disable-next-line no-param-reassign
        menuItem.isChecked = menuItem.title === defaultCheckedCategory;
        // eslint-disable-next-line no-param-reassign
        menuItem.menu = menuItem.menu.map((subMenu) => {
          // eslint-disable-next-line no-param-reassign
          subMenu.isChecked = subMenu.title === defaultCheckedCategory;
          return subMenu;
        });
        return RenderSidebarMenuItem(menuItem);
      })}
    </cxl-vaadin-accordion>
  `;

export default RenderSidebar;
