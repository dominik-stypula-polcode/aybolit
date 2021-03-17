import { html, render } from 'lit-html';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import '@conversionxl/cxl-ui/src/components/cxl-app-layout.js';
import '@conversionxl/cxl-ui/src/components/cxl-marketing-nav.js';
import '@conversionxl/cxl-ui/src/components/cxl-vaadin-accordion.js';
import '@conversionxl/cxl-ui/src/components/cxl-playbook-breadcrumbs.js';
import { CXLMarketingNav } from '../cxl-ui/cxl-marketing-nav.stories';
import { CXLFooterNav } from '../cxl-ui/footer-nav.stories';
import RenderSidebar from './partials/render-sidebar';
import RenderDashboardItems from './partials/render-playbooks-dashboard';

import coursesData from './data/cxl-dashboard.courses.data.json';
import minidegreesData from './data/cxl-dashboard.minidegrees.data.json';
import playbooksData from './data/cxl-dashboard.playbooks.data.json';
import playbookHubsData from './data/cxl-dashboard.playbook-hubs.data.json';

export default {
  decorators: [withKnobs],
  title: 'CXL Dashboard',
};

let selectedCategory = '';

const getDataByCategory = (category) => {
  let data;
  switch (category) {
    case 'Most Recent':
      data = {
        black: playbookHubsData.concat(minidegreesData),
        white: playbooksData.concat(coursesData),
      };
      break;

    case 'My Roadmap':
      data = { black: minidegreesData, white: coursesData };
      break;

    case 'Courses':
      data = { black: [], white: coursesData };
      break;

    case 'Minidegrees':
    case 'Advanced stuff':
    case 'Average stuff':
      data = { black: coursesData, white: [] };
      break;

    case 'Playbooks':
    case 'Saved playbooks':
    case 'CXL playbooks':
    case 'Wynter playbooks':
    case 'My drafts':
    case 'Peer review playbooks':
      data = { black: playbookHubsData, white: playbooksData };
      break;

    default:
      data = { black: [], white: [] };
      break;
  }
  return data;
};

const filterCardsByCategory = (data, category) => {
  if (data.length < 1 || category.length < 1) {
    return;
  }

  let shouldBeType = '';

  switch (category) {
    case 'Courses':
      shouldBeType = 'course';
      break;

    case 'Playbooks':
    case 'Saved playbooks':
    case 'CXL playbooks':
    case 'Wynter playbooks':
    case 'My drafts':
    case 'Peer review playbooks':
      shouldBeType = 'playbook';
      break;

    case 'Minidegrees':
    case 'Advanced stuff':
    case 'Average stuff':
      shouldBeType = 'course';
      break;

    default:
      break;
  }

  // eslint-disable-next-line consistent-return
  return data.filter((el) => {
    const type = el.cxl_item_type;
    if (shouldBeType.length < 1) {
      return true;
    }
    return !(shouldBeType !== type);
  });
};

export const CXLDashboard = () => {
  const hasPanelsScroll = boolean('Has panels scroll?', false);
  const hasWidgetBackground = boolean('Has widget background?', false);
  const defaultCategorySelected = text('Default category selected?', 'Most Recent');

  document.addEventListener('cxl-dashboard-tags-changed', () => {
    render(
      RenderDashboardItems(
        filterCardsByCategory(minidegreesData, selectedCategory),
        filterCardsByCategory(playbooksData.concat(coursesData), selectedCategory)
      ),
      document.getElementById('cxl-dashboard-playbooks')
    );
  });

  document.addEventListener('cxl-dashboard-category-changed', (event) => {
    selectedCategory = event.detail.category;
    const data = getDataByCategory(selectedCategory);
    render(
      RenderDashboardItems(data.black, data.white),
      document.getElementById('cxl-dashboard-playbooks')
    );
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#dashboard-sidebar-menu > a:nth-child(1)').click();
  });

  return html`
    <style>
      .widget.has-background {
        background-color: var(--lumo-shade-5pct);
      }

      .cxl-sidebar-header {
        font-size: var(--lumo-font-size-s);
        line-height: var(--lumo-line-height-s);
        color: var(--lumo-secondary-text-color);
        font-weight: normal;
      }

      .cxl-title {
        margin-top: var(--lumo-space-xl);
        margin-bottom: var(--lumo-space-xl);
      }

      .cxl-hub-header {
        justify-content: left;
      }

      .cxl-hub-title {
        margin-top: var(--lumo-space-m);
      }

      .cxl-hub-header .add-new,
      .cxl-hub-header .edit {
        margin-left: var(--lumo-space-l);
        display: none;
      }

      .cxl-hub-header,
      .cxl-hub-header .left {
        display: flex;
      }

      .header-category-time {
        color: var(--lumo-contrast-50pct);
        margin-left: var(--lumo-space-m);
        display: none;
      }

      .header-category-time.visible,
      .cxl-hub-header .add-new.visible,
      .cxl-hub-header .edit.visible {
        display: block;
      }

      .middle {
        justify-content: center;
        align-items: center;
        display: flex;
      }

      [slot='sidebar'] h3 {
        margin-top: var(--lumo-space-xl);
      }

      .right-panel-info {
        margin-top: var(--lumo-space-s);
      }

      .right-panel-info > div > :not(span) {
        margin-left: var(--lumo-space-s);
      }

      .right-panel-info > div {
        display: flex;
      }

      .right-panel-info > div > a {
        color: var(--lumo-primary-color);
      }

      .right-panel-info span {
        color: var(--lumo-secondary-text-color);
      }

      a[one-level] {
        display: block;
        padding-left: var(--lumo-space-xl);
        margin-bottom: 0;
        margin-top: 0;
        padding-top: var(--lumo-space-s);
        padding-bottom: var(--lumo-space-s);
      }

      vaadin-accordion-panel a[cxl-sidebar-link] {
        display: block;
      }

      #dashboard-sidebar-menu [is-category][checked] {
        color: var(--lumo-primary-color);
        font-weight: 600;
      }

      #selected-tags vaadin-button {
        margin-right: var(--lumo-space-s);
        margin-bottom: var(--lumo-space-m);
        color: var(--lumo-body-text-color);
      }

      #selected-tags vaadin-button[selected] {
        border: 1px solid var(--lumo-primary-color);
        color: var(--lumo-primary-color);
      }

      span[cxl-sidebar-playbooks-count] {
        color: var(--lumo-contrast-50pct);
        margin-left: var(--lumo-space-s);
      }

      .show-time {
        margin-bottom: var(--lumo-space-xs);
      }

      .entry-byline .show-time iron-icon {
        margin-right: var(--lumo-space-xs);
      }
    </style>

    <cxl-app-layout
      id="container"
      layout="2c-r"
      scroll="${hasPanelsScroll ? 'panels' : 'document'}"
    >
      ${CXLMarketingNav()}

      <section
        id="sensei_course_progress-2"
        class="widget-odd widget-last widget-first widget-1 widget widget_sensei_course_progress ${hasWidgetBackground
          ? 'has-background'
          : ''}"
        slot="sidebar"
      >
        ${RenderSidebar(defaultCategorySelected)}
      </section>

      <article class="entry">
        <header class="cxl-hub-header">
          <div class="left middle">
            <h3 class="cxl-hub-title">Most Recent</h3>
            <div class="header-category-time">36h</div>
            <a class="add-new" href="#">Add New</a>
            <a class="edit" href="#">Edit</a>
          </div>
        </header>
        <div id="selected-tags"></div>
        <cxl-vaadin-accordion
          id="cxl-dashboard-playbooks"
          class="archive archive-certificate plural"
          theme="cxl-dashboard-cards"
        ></cxl-vaadin-accordion>
      </article>

      ${CXLFooterNav()}
    </cxl-app-layout>
  `;
};

CXLDashboard.storyName = '[layout=2c-r]';
