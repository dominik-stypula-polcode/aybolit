import { customElement, LitElement, html, property } from 'lit-element';
import '@conversionxl/cxl-lumo-styles';
import cxlLikeOrDislikeStyles from '../styles/cxl-like-or-dislike-css.js';

@customElement('cxl-like-or-dislike')
export class CXLLikeOrDislikeElement extends LitElement {
  @property({ type: Number, reflect: true })
  upVotes = 0;

  @property({ type: Number })
  value = 0;

  @property({ type: String })
  id = '123';

  static get styles() {
    return [cxlLikeOrDislikeStyles];
  }

  _clearChecked() {
    this.shadowRoot.querySelectorAll('iron-icon').forEach((el) => el.classList.remove('checked'));
  }

  _upVote(event) {
    this.value = 1;

    this._saveState();
    this._clearChecked();

    event.target.classList.add('checked');
  }

  _downVote(event) {
    this.value = -1;

    this._saveState();
    this._clearChecked();

    event.target.classList.add('checked');
  }

  _getUniqueId() {
    return `cxl-like-or-dislike-${this.id}`;
  }

  _saveState() {
    localStorage.setItem(this._getUniqueId(), Number(this.value));
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);

    const previousVal = Number(localStorage.getItem(this._getUniqueId()));

    if (previousVal) {
      this.value = previousVal;

      if (this.value === 1) {
        this.shadowRoot.querySelector('[icon*="thumbs-up"]').classList.add('checked');
      }

      if (this.value === -1) {
        this.shadowRoot.querySelector('[icon*="thumbs-down"]').classList.add('checked');
      }
    }
  }

  render() {
    return html`<div>
      <div counter>${this.upVotes + this.value}</div>
      <div><iron-icon @click="${this._upVote}" icon="vaadin:thumbs-up-o"></iron-icon></div>
      <div><iron-icon @click="${
        this._downVote
      }" icon="vaadin:thumbs-down-o"></iron-icon></divthumbs-up>
    </div>`;
  }
}
