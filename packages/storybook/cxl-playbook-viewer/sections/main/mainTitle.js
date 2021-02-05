import { html } from 'lit-html';

const RenderMainTitle = title => {
  return html`
    <h1 class="adeft-playbook-title">${title}</h1>
  `;
};

export default RenderMainTitle;
