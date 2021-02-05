import { html } from 'lit-html';

const RenderRatingWithTooltip = (tooltipTrigger, userLoggedIn) => {
  return html`
    <div id=${tooltipTrigger} class="adeft-rating-with-tooltip">
      <iron-star-rating id="iron-star-rating" icon="icons:star"></iron-star-rating>
      ${!userLoggedIn
        ? html`
            <paper-tooltip animationDelay="0" offset="5" position="top" htmlFor=${tooltipTrigger}>
              Log in to vote
            </paper-tooltip>
          `
        : ``}
    </div>
  `;
};

export default RenderRatingWithTooltip;
