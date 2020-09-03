import { html } from 'lit-html';
import '@conversionxl/cxl-ui/src/components/cxl-app-layout.js';
import '@conversionxl/cxl-ui/src/components/cxl-marketing-nav.js';
import { CxlMarketingNav } from '../cxl-marketing-nav.stories';

export default {
  title: 'CXL UI | cxl-app-layout'
};

export const CxlAppLayout = () => {
  return html`
    <cxl-app-layout id="container">
      ${CxlMarketingNav()}

      <div slot="sidebar">
        <h3>Menu</h3>
        <ul>
          <li>Menu item 1</li>
          <li>Menu item 2</li>
          <li>Menu item 3</li>
        </ul>
      </div>
      <div>
        <h2>Content</h2>
        <p>Lorem ipsum....</p>
      </div>
    </cxl-app-layout>
  `;
};

CxlAppLayout.story = {
  name: '[layout=1c] (default)'
};
