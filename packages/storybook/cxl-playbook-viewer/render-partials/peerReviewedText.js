import { html } from 'lit-html';

const RenderPeerReviewedText = text => {
  return html`
    <div class="adeft-peer-reviewed adeft-peer-revieved--text">
      <strong>Peer reviewed by:</strong> ${text}
    </div>
  `;
};

export default RenderPeerReviewedText;
