import { LitElement, html, customElement } from 'lit-element';
import cxlIconWithTextStyles from '../styles/cxl-icon-with-text-css.js';

@customElement('cxl-icon-with-text')
export class CXLIconWithText extends LitElement {
  // constructor() {
  //   super();
  // }

  static get styles() {
    return [cxlIconWithTextStyles];
  }

  static get properties() {
    return {
      url: { type: String },
      icon: { type: String },
      target: { type: String },
      theme: { type: String }
    };
  }

  render() {
    const imgHtml = this.icon
      ? html`
          <span class="the-icon"><img src="${this.icon}"/></span>
        `
      : '';
    const commonContents = html`
      ${imgHtml}<span class="the-text"><slot></slot></span>
    `;
    const theme = this.theme ? this.theme : 'primary';
    const target = this.target ? this.target : '_self';

    if (this.url) {
      return html`
        <p class="cxl-icon-with-text theme-${theme}">
          <a href="${this.url}" target=${target}>${commonContents}</a>
        </p>
      `;
    }
    return html`
      <p class="cxl-icon-with-text theme-${theme}">${commonContents}</p>
    `;
  }
}
