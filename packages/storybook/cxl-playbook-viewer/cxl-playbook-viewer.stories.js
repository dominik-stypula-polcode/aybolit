import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import '@conversionxl/cxl-ui/src/components/cxl-institute-layout.js';
import '@conversionxl/cxl-ui/src/components/cxl-marketing-nav.js';
import jsonData from './cxl-playbook.data.json';

export default {
  title: 'CXL Playbook Viewer'
};

export const CxlPlaybookViewerLayout = () => {
  /**
   * @TODO: import icons like this: https://github.com/conversionxl/aybolit/blob/master/packages/cxl-lumo-styles/src/icons.js
   *
   */

  return html`
    <cxl-institute-layout id="container" theme="2c-l">
      <cxl-marketing-nav slot="header">
        <vaadin-tabs
          id="menu-primary-items"
          class="menu-items"
          orientation="vertical"
          selected="-1"
          theme="cxl-marketing-nav"
        >
          <vaadin-tab class="menu-item menu-item-logo menu-item-wide" theme="cxl-marketing-nav">
            <a href="https://conversionxl.com"
              ><iron-icon icon="cxl:logo" style="width: var(--lumo-icon-size-xl, 48px);"></iron-icon
            ></a>
          </vaadin-tab>
          <vaadin-tab
            theme="cxl-marketing-nav"
            id="menu-item-1820277"
            class="menu-item-split-nav menu-item-wide menu-item-search menu-item menu-item-type-custom menu-item-object-custom menu-item-1820277 menu-item-depth-0"
            aria-selected="false"
            role="tab"
            orientation="horizontal"
            tabindex="0"
          >
            <a>Search <iron-icon icon="lumo:search"></iron-icon></a>
          </vaadin-tab> </vaadin-tabs
      ></cxl-marketing-nav>

      BREADCRUMBS...

      <section class="widget-odd widget-last widget-first widget-1 widget" slot="sidebar">
        <div class="ActionsSB">
          <div class="info">
            <span>Actions:</span>
          </div>
          <div class="iconsVertical">
            <div class="icons">
              RATING HERE...
              <a href="#" id="share"
                ><i><img src="" alt="Share"/></i><span>Share</span></a
              >
              <a href="#" id="report"
                ><i><img src="" alt="Report"/></i><span>Report</span></a
              >
            </div>
          </div>
        </div>
      </section>

      <div id="container">
        <cxl-adeft-accordion
          id="cxl-vaadin-accordion-26107"
          theme="reverse"
          class="cxl-adeft-accordion-class"
        >
          ${jsonData.data.steps.map(
            el => html`
              <vaadin-accordion-panel id="step_${el.idx}" theme="reverse">
                <div slot="summary">
                  <div class="left">
                    <vaadin-checkbox value="Option" theme="custom"></vaadin-checkbox>
                  </div>
                  <div class="right">
                    <div class="summary-top">
                      ${unsafeHTML(el.title)}
                    </div>
                  </div>
                </div>
                <vaadin-vertical-layout>
                  <div class="item-content">
                    <div>
                      ${unsafeHTML(el.content)}
                    </div>
                  </div>
                </vaadin-vertical-layout>
              </vaadin-accordion-panel>
            `
          )}
        </cxl-adeft-accordion>
      </div>

      <footer slot="footer">
        FOOTER
      </footer>
    </cxl-institute-layout>
  `;
};

CxlPlaybookViewerLayout.story = {
  name: 'cxl-playbook-viewer'
};
