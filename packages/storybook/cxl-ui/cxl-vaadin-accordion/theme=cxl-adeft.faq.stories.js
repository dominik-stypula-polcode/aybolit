import { html } from 'lit-html';
import '@conversionxl/cxl-ui/src/components/cxl-institute-layout.js';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import faqData from './theme=cxl-faq.data.json';

export default {
  title: 'CXL UI|cxl-vaadin-accordion',
  decorators: [withKnobs]
};

const saveInlineCommentHandler = evt => {
  // eslint-disable-next-line no-console
  console.log(evt);
  setTimeout(() => document.body.click(), 1000);
};

const Template = () => {
  const isDisabled = boolean('Disabled', false);
  return html`
    <style>
      .plural .entry-title {
        margin: 0;
      }
    </style>
    <h3>Frequently Asked Questions</h3>

    <cxl-vaadin-accordion
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
                <cxl-inline-comment-context-menu
                  disabled="${isDisabled}"
                  id="${el.cxl_hybrid_attr_post['@attributes'].id}_title"
                  @cxl-save-inline-comment=${saveInlineCommentHandler}
                >
                  <a>${unsafeHTML(el.title.rendered)}</a>
                </cxl-inline-comment-context-menu>
              </h5>
            </header>
            <div class="entry-summary" itemprop="description">
              <cxl-inline-comment-context-menu
                disabled="${isDisabled}"
                id="${el.cxl_hybrid_attr_post['@attributes'].id}_content"
                @cxl-save-inline-comment=${saveInlineCommentHandler}
              >
                <span>${unsafeHTML(el.content.rendered)}</span>
              </cxl-inline-comment-context-menu>
            </div>
          </vaadin-accordion-panel>
        `
      )}
    </cxl-vaadin-accordion>
  `;
};

export const CxlAdeftVaadinAccordionThemeFaq = Template.bind({});

CxlAdeftVaadinAccordionThemeFaq.story = {
  name: '[theme=cxl-adeft.faq.stories]'
};
