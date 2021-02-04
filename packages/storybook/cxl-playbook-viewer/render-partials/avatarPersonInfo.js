import { html } from 'lit-html';

const RenderAvatarPersonInfo = item => {
  return html`
    <div class="sb-author-flex">
      <a class="avatar">
        <img class="avatar" src="${item.avatarUrl}" alt="avatar" />
      </a>
      <div class="right">
        <div class="name">
          <a href="${item.profileUrl}">${item.username}</a>
        </div>
      </div>
    </div>
  `;
};

export default RenderAvatarPersonInfo;
