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

export default {
  decorators: [withKnobs],
  title: 'CXL Dashboard',
};

const getDataByCategory = (category) => {
  let data = {};
  switch (category) {
    case 'Feed':
      data = { black: minidegreesData, white: playbooksData.concat(coursesData) };
      break;
    case 'Roadmap':
      data = { black: [], white: playbooksData };
      break;
    case 'Courses':
      data = { black: [], white: coursesData };
      break;
    case 'Minidegrees':
    case 'Advanced stuff':
    case 'Average stuff':
      data = { black: minidegreesData, white: [] };
      break;
    case 'Playbooks':
      data = { black: [], white: playbooksData };
      break;
    default:
      data = { black: [], white: [] };
      break;
  }
  return data;
};

export const CXLDashboard = () => {
  const hasPanelsScroll = boolean('Has panels scroll?', false);
  const hasWidgetBackground = boolean('Has widget background?', false);
  const defaultCategorySelected = text('Default category selected?', 'Feed');

  document.addEventListener('cxl-dashboard-tags-changed', () => {
    render(
      RenderDashboardItems(minidegreesData, playbooksData.concat(coursesData)),
      document.getElementById('cxl-dashboard-playbooks')
    );
  });

  document.addEventListener('cxl-dashboard-category-changed', (event) => {
    const data = getDataByCategory(event.detail.category);
    render(
      RenderDashboardItems(data.black, data.white),
      document.getElementById('cxl-dashboard-playbooks')
    );
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
        margin-bottom: var(--lumo-space-xl);
      }
      .cxl-title {
        margin-top: var(--lumo-space-xl);
        margin-bottom: var(--lumo-space-xl);
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
        margin-bottom: var(--lumo-space-s);
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
        <h2 class="cxl-sidebar-header">Navigation</h2>
        ${RenderSidebar(defaultCategorySelected)}
      </section>

      <article class="entry">
        <header class="cxl-hub-header">
          <h2 class="cxl-hub-title">Dashboard</h2>
        </header>
        <div id="selected-tags"></div>
        <cxl-vaadin-accordion
          id="cxl-dashboard-playbooks"
          class="archive archive-certificate plural"
          theme="cxl-dashboard-cards"
          >${RenderDashboardItems([], playbooksData)}</cxl-vaadin-accordion
        >
      </article>

      ${CXLFooterNav()}
    </cxl-app-layout>
  `;
};

CXLDashboard.storyName = '[layout=2c-r]';
