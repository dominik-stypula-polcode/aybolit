import { html } from 'lit-html';

const _renderSingleItem = item => {
  return html`
    <li class="items-list--item">
      <a class="item-link" href="#" target="_blank" rel="noopener noreferrer">
        <span class="item-text">${item.Name}</span>
      </a>
    </li>
  `;
};

const RenderTools = tools => {
  if (!tools || !tools.length) return '';

  return html`
    <div class="related-infos related-infos-tools">
      <div class="heading">
        Tools:
      </div>
      <ul class="items-list">
        ${tools.map(_renderSingleItem)}
      </ul>
    </div>
  `;
};

export default RenderTools;
