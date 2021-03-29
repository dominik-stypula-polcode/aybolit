import { html } from 'lit-html';
import '@conversionxl/cxl-ui/src/components/cxl-app-layout.js';
import '@conversionxl/cxl-ui/src/components/cxl-marketing-nav.js';
import { CXLMarketingNav } from '../cxl-ui/cxl-marketing-nav.stories';
import { CXLFooterNav } from '../cxl-ui/footer-nav.stories';
import { displaySearchFilters } from './displaySearchFilters';

export default {
  title: 'CXL Search',
};

export const CXLSearch = () => html`
  <style>
    .card {
      padding: var(--lumo-space-m);
      margin-top: var(--lumo-space-m);
      margin-bottom: var(--lumo-space-m);
      overflow: hidden;
      background-color: var(--lumo-tint);
      border: 1px solid var(--lumo-shade-10pct);
      border-radius: var(--lumo-border-radius-s);
      box-shadow: var(--lumo-box-shadow-xs);
      break-inside: avoid;
      transform: translateZ(0);
    }
    .filters {
      display: flex;
    }
    #sort-combo {
      margin-left: auto;
    }
    #topic-combo {
      margin-left: var(--lumo-space-l);
    }
  </style>
  <cxl-app-layout id="container" layout="1c-w">
    ${CXLMarketingNav()}

    <article class="entry">
      <header class="entry-header">
        <label>Page</label>
        <h1 class="entry-title">Join the top 1% of digital marketing.</h1>
      </header>
      <div class="entry-content">
        <div class="card filters">${displaySearchFilters()}</div>
      </div>
    </article>

    ${CXLFooterNav()}
  </cxl-app-layout>
`;

CXLSearch.storyName = '[layout=1c-w]';
