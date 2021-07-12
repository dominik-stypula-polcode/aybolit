import { customElement, LitElement, html, property } from 'lit-element';
import '@conversionxl/cxl-lumo-styles';
import cxlLikeOrDislikeStyles from '../styles/cxl-like-or-dislike-css.js';

@customElement('cxl-like-or-dislike')
export class CXLLikeOrDislikeElement extends LitElement {
  @property({ type: Number, reflect: true })
  upVotes = 0;

  @property({ type: Number })
  value = 0;

  @property({ type: Number })
  postId;

  @property({ type: Number })
  userId;

  @property({ type: String })
  postType;

  /**
   * API Url to which we make a POST request
   *
   * @type {string}
   */
  @property({ type: String })
  apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  static get styles() {
    return [cxlLikeOrDislikeStyles];
  }

  _clearChecked() {
    this.shadowRoot.querySelectorAll('iron-icon').forEach((el) => el.classList.remove('checked'));
  }

  async _upVote(event) {
    const target = event.currentTarget;
    this.value = 1;

    await this._sendToApi();
    this._saveState();
    this._clearChecked();

    target.classList.add('checked');
  }

  async _downVote(event) {
    const target = event.currentTarget;
    this.value = -1;

    await this._sendToApi();
    this._saveState();
    this._clearChecked();

    target.classList.add('checked');
  }

  _getUniqueId() {
    return `cxl-like-or-dislike-${this.userId}-${this.postType}-${this.postId}`;
  }

  _saveState() {
    localStorage.setItem(this._getUniqueId(), Number(this.value));
  }

  async _sendToApi() {
    return this._postData(this.apiUrl, {
      post_id: this.postId,
      user_id: this.userId,
      value: this.value,
      post_type: this.postType,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async _postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });

    return response.status;
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
      <div>
        <iron-icon @click="${this._downVote}" icon="vaadin:thumbs-down-o"></iron-icon>
      </div>
    </div>`;
  }
}
