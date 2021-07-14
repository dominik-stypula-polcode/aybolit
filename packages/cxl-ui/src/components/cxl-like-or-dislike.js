import { customElement, LitElement, html, property, query, queryAll } from 'lit-element';
import '@conversionxl/cxl-lumo-styles';
import cxlLikeOrDislikeStyles from '../styles/cxl-like-or-dislike-css.js';

@customElement('cxl-like-or-dislike')
export class CXLLikeOrDislikeElement extends LitElement {
  @property({ type: Number })
  upVotes = 0;

  @property({ type: Number })
  value = 0;

  @property({ type: Number })
  postId;

  @property({ type: Number })
  userId;

  @property({ type: String })
  postType;

  @query('[counter]')
  counter;

  @query('.vote[up]')
  voteUp;

  @query('.vote[down]')
  voteDown;

  @queryAll('.vote')
  voteAll;

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

  async _upVote(event) {
    this.value = 1;
    await this._vote(event.currentTarget);
  }

  async _downVote(event) {
    this.value = -1;
    await this._vote(event.currentTarget);
  }

  async _vote(target) {
    await this._sendToApi();
    await this._saveState();
    await this._clearChecked();
    await this._checkItem(target);
  }

  _getUniqueId() {
    return `cxl-like-or-dislike-${this.userId}-${this.postType}-${this.postId}`;
  }

  async _saveState() {
    localStorage.setItem(this._getUniqueId(), String(this.value));
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

  async _clearChecked() {
    this.voteAll.forEach((el) => el.classList.remove('checked'));
    this.counter.classList.remove('checked');
  }

  // eslint-disable-next-line class-methods-use-this
  async _checkItem(target) {
    target.classList.add('checked');
    this.counter.classList.add('checked');
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);

    const previousVal = Number(localStorage.getItem(this._getUniqueId()));

    if (previousVal) {
      this.value = previousVal;

      if (this.value === 1) {
        this.voteUp.classList.add('checked');
        this.counter.classList.add('checked');
      } else if (this.value === -1) {
        this.voteDown.classList.add('checked');
        this.counter.classList.add('checked');
      }
    }
  }

  render() {
    return html`<div>
      <div counter>${this.upVotes + this.value} Votes</div>
      <div class="vote" @click="${this._upVote}" up>
        <iron-icon icon="vaadin:thumbs-up-o"></iron-icon><span>Upvote</span>
      </div>
      <div class="vote" @click="${this._downVote}" down>
        <iron-icon icon="vaadin:thumbs-down-o"></iron-icon><span>Downvote</span>
      </div>
    </div>`;
  }
}
