import { html } from 'lit-html';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import '@conversionxl/cxl-ui/src/components/cxl-app-layout.js';
import '@conversionxl/cxl-ui/src/components/cxl-marketing-nav.js';
import { CXLMarketingNav } from '../cxl-ui/cxl-marketing-nav.stories';
import RenderSidebar from './partials/render-sidebar';

export default {
  decorators: [withKnobs],
  title: 'CXL UI/cxl-dashboard',
};

export const CXLDashboard = () => {
  const hasPanelsScroll = boolean('Has panels scroll?', true);
  const hasWidgetBackground = boolean('Has widget background?', false);

  return html`
    <style></style>
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
      a[theme~='cxl-dashboard-sidebar'] {
        display: block;
        padding-left: var(--lumo-space-xl);
        margin-bottom: 0;
        margin-top: 0;
        padding-top: var(--lumo-space-s);
        padding-bottom: var(--lumo-space-s);
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

      <article
        class="entry author-sensei-teacher post-3923 course type-course status-publish has-post-thumbnail category-general category-video-courses-30-min-or-less tag-marketing tag-optimization post membership-content access-granted user-status-active"
        itemscope="itemscope"
        itemtype="https://schema.org/CreativeWork"
        id="post-3923"
      >
        <header class="entry-header">
          <label>Lesson</label>
          <h1 class="entry-title">The Persuasion Slide</h1>
        </header>
      </article>
    </cxl-app-layout>
  `;
};

CXLDashboard.storyName = '[layout=2c-r]';
