import { html } from 'lit-html';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import '@conversionxl/cxl-ui/src/components/cxl-app-layout.js';
import '@conversionxl/cxl-ui/src/components/cxl-marketing-nav.js';
import '@conversionxl/cxl-ui/src/components/cxl-vaadin-accordion.js';
import '@conversionxl/cxl-ui/src/components/cxl-playbook-breadcrumbs.js';
import { CXLMarketingNav } from '../cxl-ui/cxl-marketing-nav.stories';
import { CXLFooterNav } from '../cxl-ui/footer-nav.stories';
import RenderSidebar from './partials/render-sidebar';

import RenderPlaybooks from '../cxl-hubpage/partials/cxl-hubpage-render-playbooks';

export default {
  decorators: [withKnobs],
  title: 'CXL Dashboard',
};

export const CXLDashboard = () => {
  const hasPanelsScroll = boolean('Has panels scroll?', false);
  const hasWidgetBackground = boolean('Has widget background?', false);

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
      }
      #selected-tags vaadin-button[selected] {
        border: 1px solid var(--lumo-primary-color);
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
        ${RenderSidebar()}
      </section>

      <article class="entry">
        <header class="cxl-hub-header">
          <h2 class="cxl-hub-title">Dashboard</h2>
        </header>
        <div id="selected-tags"></div>
        <cxl-vaadin-accordion
          id="cxl-hubpage-hubs-and-playbooks"
          class="archive archive-certificate plural"
          theme="cxl-hub-cards"
          >${RenderPlaybooks()}</cxl-vaadin-accordion
        >
      </article>

      ${CXLFooterNav()}
    </cxl-app-layout>
  `;
};

CXLDashboard.storyName = '[layout=2c-r]';
