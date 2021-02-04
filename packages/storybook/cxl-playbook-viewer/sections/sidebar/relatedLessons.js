import { html } from 'lit-html';

const _renderSingleItem = item => {
  return html`
    <li class="items-list--item">
      <a class="item-link" href="#" target="_blank" rel="noopener noreferrer">
        <i><iron-icon icon="lumo:angle-right"></iron-icon></i
        ><span class="item-text">${item.lesson_title}</span></a
      >
    </li>
  `;
};

const RenderRelatedLessons = lessons => {
  if (!lessons || !lessons.length) return '';

  return html`
    <div class="related-infos related-infos-lessons">
      <div class="heading">
        Related Courses & Lessons
      </div>
      <ul class="items-list">
        ${lessons.map(_renderSingleItem)}
      </ul>
    </div>
  `;
};

export default RenderRelatedLessons;
