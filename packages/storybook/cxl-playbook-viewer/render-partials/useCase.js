import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

const RenderUseCase = useCase => {
  if (!useCase || !useCase.description) {
    return '';
  }
  return html`
    <div class="adeft-use-case">
      <h3 class="use-case-title">Use case</h3>
      <div class="use-case-content">
        ${unsafeHTML(useCase.description)}
      </div>
    </div>
  `;
};

export default RenderUseCase;
