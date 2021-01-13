import { html } from 'lit-html';
import '@conversionxl/cxl-ui/src/components/cxl-institute-layout.js';

export default {
  title: 'CXL UI | Czoko Layout'
};

export const CxlCzokoLayout = () => {
  return html`
    <cxl-institute-layout id="container">
      <div class="czoko-header" slot="header">
        Moje czoko jest spoko
      </div>
      <div class="czoko-sidebar" slot="sidebar">
        TO jest czoko w sidebarze
      </div>
      <img
        src="https://fabrykamemow.pl/uimages/services/fabrykamemow/i18n/pl_PL/201205/1338482100_by_wojti47_500.jpg"
      />
    </cxl-institute-layout>
  `;
};

CxlCzokoLayout.story = {
  name: 'cxl-czoko-layout'
};
