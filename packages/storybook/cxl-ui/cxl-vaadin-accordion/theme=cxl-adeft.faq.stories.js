import { html } from 'lit-html';
import '@conversionxl/cxl-ui/src/components/cxl-institute-layout.js';
import { withKnobs, number } from '@storybook/addon-knobs';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import faqData from './theme=cxl-faq.data.json';

export default {
  title: 'CXL UI|cxl-vaadin-accordion',
  decorators: [withKnobs]
};

const Template = () => {
  const width = number('Comments Width', 200);
  const height = number('Comments Height', 60);
  return html`
    <style>
      .plural .entry-title {
        margin: 0;
      }
      textarea {
        width: ${width}px;
        height: ${height}px;
      }
    </style>
    <h3>Frequently Asked Questions</h3>

    <cxl-adeft-accordion
      id="cxl-vaadin-accordion-26107"
      class="archive archive-faq plural"
      theme="cxl-faq"
    >
      ${faqData.map(
        el => html`
          <vaadin-accordion-panel
            id="${el.cxl_hybrid_attr_post['@attributes'].id}"
            class="${el.cxl_hybrid_attr_post['@attributes'].class}"
            theme="cxl-faq"
          >
            <header class="entry-header" slot="summary">
              <h5 class="entry-title" itemprop="headline">
                <a>${unsafeHTML(el.title.rendered)}</a>
              </h5>
            </header>
            <div class="entry-summary" itemprop="description">
              <span>${unsafeHTML(el.content.rendered)}</span>
            </div>
          </vaadin-accordion-panel>
        `
      )}
    </cxl-adeft-accordion>
  `;
};

export const CxlAdeftVaadinAccordionThemeFaq = Template.bind({});

CxlAdeftVaadinAccordionThemeFaq.story = {
  name: '[theme=cxl-adeft.faq.stories]'
};
