import { html } from 'lit-html';
import '@conversionxl/cxl-ui/src/components/cxl-app-layout.js';
import '@conversionxl/cxl-ui/src/components/cxl-marketing-nav.js';
import { CxlMarketingNav } from '../cxl-marketing-nav.stories';
import { CXLFooterNav } from '../footer-nav.stories';
import { CxlVaadinAccordionThemeArchive } from '../cxl-vaadin-accordion/cxl-accordion-card.stories';

export default {
  title: 'CXL UI | cxl-app-layout'
};

export const CxlAppLayout1cw = () => {
  return html`
    <cxl-app-layout id="container" layout="1c-w">
      ${CxlMarketingNav()}

      <article class="entry">
        <header class="entry-header">
          <label>Page</label>
          <h1 class="entry-title">Join the top 1% of digital marketing.</h1>
        </header>
        <div class="entry-content">
          <h2>
            We find the absolute best practitioners in the world, and get them to teach their craft.
            Learn from the top performers to become one.
          </h2>
          <p>
            Self-paced online digital marketing courses on all things conversion optimization,
            digital analytics and digital marketing.
          </p>
          <p><strong>All in a single subscription.</strong></p>

          ${CxlVaadinAccordionThemeArchive()}
        </div>
      </article>

      ${CXLFooterNav()}
    </cxl-app-layout>
  `;
};

CxlAppLayout1cw.story = {
  name: '[layout=1c-w]'
};
