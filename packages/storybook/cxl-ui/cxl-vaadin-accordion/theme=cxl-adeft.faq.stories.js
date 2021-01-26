import { html } from 'lit-html';
import '@conversionxl/cxl-ui/src/components/cxl-institute-layout.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import faqData from './theme=cxl-faq.data.json';

export default {
  title: 'CXL UI|cxl-adeft-accordion'
};

const Template = () => {
  return html`
    <style>
      .plural .entry-title {
        margin: 0;
      }
      cxl-adeft-accordion {
        padding: 10px;
      }
    </style>

    <cxl-institute-layout theme="2c-l" id="container">
      <cxl-adeft-accordion
        id="cxl-vaadin-accordion-26107"
        theme="reverse"
        class="cxl-adeft-accordion-class"
      >
        ${faqData.map(
          el => html`
            <vaadin-accordion-panel
              id="${el.cxl_hybrid_attr_post['@attributes'].id}"
              class="${el.cxl_hybrid_attr_post['@attributes'].class}"
              theme="reverse"
            >
              <div slot="summary">
                <div class="left">
                  <vaadin-checkbox value="Option" theme="custom"></vaadin-checkbox>
                </div>
                <div class="right">
                  <div class="summary-top">
                    ${unsafeHTML(el.title.rendered)}
                  </div>
                </div>
              </div>
              <vaadin-vertical-layout>
                <div class="item-content">
                  <div>
                    ${unsafeHTML(el.content.rendered)}
                  </div>
                </div>
              </vaadin-vertical-layout>
            </vaadin-accordion-panel>
          `
        )}
      </cxl-adeft-accordion>
    </cxl-institute-layout>
  `;
};

export const CxlAdeftVaadinAccordionThemeFaq = Template.bind({});

CxlAdeftVaadinAccordionThemeFaq.story = {
  name: '[theme=2c-l]'
};
