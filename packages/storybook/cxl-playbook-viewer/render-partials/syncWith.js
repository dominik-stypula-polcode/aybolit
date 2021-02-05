import { html } from 'lit-html';

const RenderSyncWith = () => {
  return html`
    <div class="sync-with-sb">
      <div class="sync-with-sb-content">
        <div class="first">
          <span>Sync with:</span>
          <i class="question">
            <iron-icon id="question-mark1" icon="vaadin:question-circle"></iron-icon>
            <paper-tooltip animationDelay="0" offset="5" position="top" htmlFor="question-mark1">
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
  `;
};

export default RenderSyncWith;
