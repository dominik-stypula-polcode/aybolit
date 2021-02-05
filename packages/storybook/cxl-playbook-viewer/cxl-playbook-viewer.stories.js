import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import '@conversionxl/cxl-ui/src/components/cxl-app-layout.js';
import '@conversionxl/cxl-ui/src/components/cxl-marketing-nav.js';
import '@cwmr/iron-star-rating';
import '@polymer/paper-tooltip/paper-tooltip';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import moment from 'moment';
import playbookViewerCSS from '@conversionxl/cxl-ui/src/styles/playbook-viewer-css.js';
import { registerGlobalStyles } from '@conversionxl/cxl-lumo-styles/src/utils';
import jsonData from './cxl-playbook.data.json';
import DataAdapter from './DataAdapter';

/**
 * Partials/Modules that render specific sections of the Storybook page demo
 */
import RenderAvatarPersonInfo from './render-partials/avatarPersonInfo';
import RenderAvatarPersonBio from './render-partials/avatarPersonBio';
import RenderRelatedBlogs from './sections/sidebar/relatedBlogs';
import RenderRelatedLessons from './sections/sidebar/relatedLessons';
import RenderTools from './sections/sidebar/tools';
import RenderMainTitle from './render-partials/mainTitle';

export default {
  decorators: [withKnobs],
  title: 'CXL Playbook Viewer'
};

export const CxlPlaybookViewerLayout = () => {
  const hasPanelsScroll = boolean('Has panels scroll?', true);
  const hasWidgetBackground = boolean('Has widget background?', false);

  const dataAdapter = new DataAdapter(jsonData.data);
  const authorObj = dataAdapter.getAuthor();
  const userLoggedIn = dataAdapter.getUserId() > 0;
  const userHasVoted = false;

  registerGlobalStyles(playbookViewerCSS, {
    moduleId: 'cxl-playbook-viewer-layout-global'
  });

  if (userHasVoted) {
    window.addEventListener('DOMContentLoaded', () => {
      document.querySelector('iron-star-rating').setAttribute('readonly', 'readonly');
    });
  }

  return html`
    <cxl-app-layout
      id="container"
      layout="2c-l"
      scroll="${hasPanelsScroll ? 'panels' : 'document'}"
    >
      <cxl-marketing-nav slot="header">
        <vaadin-tabs
          id="menu-primary-items"
          class="menu-items"
          orientation="vertical"
          selected="-1"
          theme="cxl-marketing-nav"
        >
          <vaadin-tab class="menu-item menu-item-logo menu-item-wide" theme="cxl-marketing-nav">
            <a href="https://conversionxl.com">
              <iron-icon icon="cxl:logo" style="width: var(--lumo-icon-size-xl, 48px);"></iron-icon>
            </a>
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
          </vaadin-tab>
        </vaadin-tabs>
      </cxl-marketing-nav>

      <div class="breadcrumbs">
        ${dataAdapter.getBreadcrumbsData().anchors.map(value => {
          const className = value.active ? 'active' : 'inactive';
          return html`
            <a class="${className}" href="${value.href}">${value.content}</a>
          `;
        })}
      </div>

      ${RenderMainTitle(dataAdapter.getPlaybookTitle())}

      <div class="main-author-info">
        ${RenderAvatarPersonInfo(authorObj)} ${RenderAvatarPersonBio(authorObj.bio)}
      </div>

      <section
        class="widget ${hasWidgetBackground ? 'has-background' : ''} only-desktop"
        slot="sidebar"
      >
        <div class="inner-sidebar-wrapper">
          <div class="sidebar-published">
            <div>Last updated:</div>
            <div>
              <strong>${moment(dataAdapter.getPlaybookTimestamp()).format('DD. MMMM YYYY')}</strong>
            </div>
          </div>
          <!-- sidebar-published -->

          <div class="actions-sb">
            <div class="info">
              <span>Rate this playbook:</span>
              <!-- greg 2021-02-04 : CHANGED as per request -->
              <!-- <span>Actions:</span> -->
            </div>
            <div class="icons-vertical">
              <div class="icons">
                <div class="rating">
                  <div id="with-tooltip-div" class="with-tooltip">
                    <iron-star-rating id="iron-star-rating" icon="icons:star"></iron-star-rating>
                    ${!userLoggedIn
                      ? html`
                          <paper-tooltip
                            animationDelay="0"
                            offset="5"
                            position="top"
                            htmlFor="with-tooltip-div"
                          >
                            Log in to vote
                          </paper-tooltip>
                        `
                      : ``}
                  </div>
                  <!-- with-tooltip-div -->
                </div>
                <!-- rating -->

                <!-- greg 2021-02-04 : DISABLED as per request -->
                <!-- <a href="#" id="share"><i><iron-icon icon="cxl:share"></iron-icon></i><span>Share</span></a> -->
                <!-- <a href="#" id="report"><i><iron-icon icon="cxl:report"></iron-icon></i><span>Report</span></a> -->
              </div>
              <!-- icons -->
            </div>
            <!-- icons-vertical -->
          </div>
          <!-- actions-sb -->

          <!--Begin: Author Info SideBar-->
          <div class="author-info-sb">
            <div class="about">
              <span>About the author:</span>
            </div>
            ${RenderAvatarPersonInfo(authorObj)} ${RenderAvatarPersonBio(authorObj.bio)}
          </div>
          <!--End: Author Info SideBar-->

          <!--Begin: Validated By SideBar-->
          <div class="validated-by-sb">
            <div class="about">
              <span>Peer reviewed by:</span>
            </div>
            ${dataAdapter.getExperts().map(reviewer => RenderAvatarPersonInfo(reviewer))}
          </div>
          <!--End: Validated By SideBar-->

          ${RenderRelatedBlogs(dataAdapter.getRelatedBlogs())}
          ${RenderRelatedLessons(dataAdapter.getLessons())} ${RenderTools(dataAdapter.getTools())}

          <div class="sync-with-sb">
            <div class="sync-with-sb-content">
              <div class="first">
                <span>Sync with:</span>
                <i class="question">
                  <iron-icon id="question-mark1" icon="vaadin:question-circle"></iron-icon>
                  <paper-tooltip
                    animationDelay="0"
                    offset="5"
                    position="top"
                    htmlFor="question-mark1"
                  >
                    coming soon
                  </paper-tooltip>
                </i>
              </div>
              <!-- first -->
              <div class="icons">
                <a href="#"
                  ><i><iron-icon icon="cxl:trello"></iron-icon></i><span>Trello</span></a
                >
                <a href="#"
                  ><i><iron-icon icon="cxl:asana"></iron-icon></i><span>Asana</span></a
                >
                <a href="#"
                  ><i><iron-icon icon="cxl:basecamp"></iron-icon></i><span>Basecamp</span></a
                >
              </div>
              <!-- icons -->
            </div>
            <!-- sync-with-sb-content -->
          </div>
          <!-- sync-with-sb -->
        </div>
        <!--inner-sidebar-wrapper-->
      </section>
      <!--slot sidebar-->

      <div id="container">
        <cxl-adeft-accordion
          id="cxl-vaadin-accordion-26107"
          theme="reverse"
          class="cxl-adeft-accordion-class"
        >
          ${dataAdapter.getAccordionData().items.map(
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
                    ${unsafeHTML(el.content)}
                  </div>
                </vaadin-vertical-layout>
              </vaadin-accordion-panel>
            `
          )}
        </cxl-adeft-accordion>
      </div>
      <!-- container -->

      <footer slot="footer">
        <div class="links">
          <div class="footer-el logo">
            <div>
              <iron-icon icon="cxl:adeft-logo"></iron-icon>
            </div>
          </div>
          <div class="footer-el year">&copy; 2020 Adeft</div>
          <a href="#" class="footer-el contact">Contact us</a>
        </div>
        <!-- links -->
      </footer>
    </cxl-app-layout>
  `;
};

CxlPlaybookViewerLayout.story = {
  name: 'cxl-playbook-viewer'
};
