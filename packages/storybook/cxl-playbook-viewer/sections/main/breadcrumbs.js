import { html } from 'lit-html';

const RenderBreadcrumbs = breadcrumbs => {
  return html`
    <div class="breadcrumbs">
      ${breadcrumbs.anchors.map(value => {
        const className = value.active ? 'active' : 'inactive';
        return html`
          <a class="${className}" href="${value.href}">${value.content}</a>
        `;
      })}
    </div>
  `;
};

export default RenderBreadcrumbs;
