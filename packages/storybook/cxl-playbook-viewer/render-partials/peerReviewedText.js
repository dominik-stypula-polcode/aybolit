import { html } from 'lit-html';

const RenderPeerReviewedText = text => {
  return html`
    <div class="adeft-peer-reviewed adeft-peer-reviewed--text">
      Peer reviewed by: ${text}
    </div>
  `;
};

export default RenderPeerReviewedText;
