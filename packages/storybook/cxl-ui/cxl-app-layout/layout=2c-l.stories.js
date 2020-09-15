import { html } from 'lit-html';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import '@conversionxl/cxl-ui/src/components/cxl-app-layout.js';
import '@conversionxl/cxl-ui/src/components/cxl-marketing-nav.js';
import { CxlMarketingNav } from '../cxl-marketing-nav.stories';

export default {
  decorators: [withKnobs],
  title: 'CXL UI | cxl-app-layout'
};

export const CxlAppLayout2cl = () => {
  const hasPanelsScroll = boolean('Has panels scroll?', true);

  return html`
    <cxl-app-layout
      id="container"
      layout="2c-l"
      scroll="${hasPanelsScroll ? 'panels' : 'document'}"
    >
      ${CxlMarketingNav()}

      <div slot="sidebar">
        <h3>Menu</h3>
        <ul>
          <li>Menu item 1</li>
          <li>Menu item 2</li>
          <li>Menu item 3</li>
        </ul>
      </div>
      <article class="entry">
        <header class="entry-header">
          <label>Page</label>
          <h1 class="entry-title">Title: 2-column, content left</h1>
          <p>Lorem ipsum....</p>
        </header>
        <div class="entry-content">
          <h2>Headline</h2>
          <p>Lorem ipsum....</p>
        </div>
      </article>
    </cxl-app-layout>
  `;
};

CxlAppLayout2cl.story = {
  name: '[layout=2c-l]'
};
