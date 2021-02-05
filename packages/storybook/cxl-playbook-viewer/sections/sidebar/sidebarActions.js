import { html } from 'lit-html';

const RenderSidebarActions = userLoggedIn => {
  return html`
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
  `;
};

export default RenderSidebarActions;
