import { html } from 'lit-html';

const RenderAvatarPersonBio = bio => {
  if (!bio) return '';

  return html`
    <div class="bio">
      ${bio}
    </div>
  `;
};

export default RenderAvatarPersonBio;
