import { html } from 'lit-html';

const _renderSingleItem = item => {
  return html`
    <li class="items-list--item">
      <a class="item-link" href=${item.URL} target="_blank" rel="noopener noreferrer">
        <i><iron-icon icon="lumo:angle-right"></iron-icon></i
        ><span class="item-text">${item.Name}</span>
      </a>
    </li>
  `;
};

const RenderRelatedBlogs = blogs => {
  if (!blogs || !blogs.length) return '';

  return html`
    <div class="related-infos related-infos-related-blogs">
      <div class="heading">
        Related Blog posts:
      </div>
      <ul class="items-list">
        ${blogs.map(_renderSingleItem)}
      </ul>
    </div>
  `;
};

export default RenderRelatedBlogs;
